<template lang="pug">
  v-dialog(v-model="abmeldenShow" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Person abmelden
      v-card-text
        v-form(v-model="abmeldenValid")
          formular(v-model="abmeldenValue" :schema=`[
            {
              name: 'weg',
              type: 'input',
              label: 'Weg der Abmeldung',
              rule: "required|max:100",
              required: true,
              counter: 100
            },
            {
              name: 'kommentar',
              type: 'input',
              label: 'Kommentar',
              rule: "required|max:200",
              required: true,
              counter: 200
            },
            {
              name: 'gebuehr',
              type: 'input',
              label: 'Abmeldegebühr (Ganze Euros)',
              mask: '###',
              rule: "required|max:3",
              required: true,
              counter: 3
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="abmeldenShow=false") Abbrechen
        v-btn(color="primary" :disabled="!abmeldenValid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: []})
  private data!: any;

  private abmeldenShow = false;
  private abmeldenValid = false;
  private abmeldenValue = {
    gebuehr: 0,
    weg: '',
    kommentar: ''
  };

  public show() {
    this.abmeldenShow = true;
  }
  private abmeldenSave() {
    this.abmeldenShow = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($anmeldeID: String!, $weg: String!, $gebuehr: Int!, $kommentar: String!, $authToken: String!) {
          abmelden(anmeldeID: $anmeldeID, weg: $weg, gebuehr: $gebuehr, kommentar: $kommentar, authToken: $authToken)
        }
      `,
      variables: {
        anmeldeID: this.$route.params.id,
        authToken: this.$authToken(),
        ...this.abmeldenValue
      }
    }).then(() => {
      this.$notifikation('Erfolgreich Abgemeldet', `Du hast erfolgreich die Person abgemeldet.`);
      this.$emit('reload');
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });

    this.abmeldenValue = {
      gebuehr: 0,
      weg: '',
      kommentar: ''
    };
  }
}
</script>