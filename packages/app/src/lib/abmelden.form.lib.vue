<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Person abmelden
      v-card-text
        v-form(v-model="valid")
          formular(v-model="value" :schema=`[
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
        v-btn(flat @click="visible=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: []})
  private data!: any;

  private visible = false;
  private valid = false;
  private value = {
    gebuehr: 0,
    weg: '',
    kommentar: ''
  };

  public show() {
    this.visible = true;
  }
  private abmeldenSave() {
    this.visible = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($anmeldeID: String!, $weg: String!, $gebuehr: Int!, $kommentar: String!, $authToken: String!) {
          abmelden(anmeldeID: $anmeldeID, weg: $weg, gebuehr: $gebuehr, kommentar: $kommentar, authToken: $authToken)
        }
      `,
      variables: {
        anmeldeID: this.$route.params.id,
        authToken: this.$authToken(),
        ...this.value
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

    this.value = {
      gebuehr: 0,
      weg: '',
      kommentar: ''
    };
  }
}
</script>