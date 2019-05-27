<template lang="pug">  
  v-dialog(v-model="visible" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) Person hinzufügen
      v-card-text
        v-form(v-model="valid" @submit.prevent)
          formular(v-model="value" :schema=`[
            {
              name: 'vorname',
              type: 'input',
              label: 'Vorname',
              rule: "required|max:50",
              required: true,
              counter: 50
            },
            {
              name: 'nachname',
              type: 'input',
              label: 'Nachname',
              rule: "required|max:50",
              required: true,
              counter: 50
            },
            {
              name: 'gebDat',
              type: 'date',
              label: 'Geburtsdatum',
              rule: "required",
              required: true
            },
            {
              name: 'geschlecht',
              type: 'radio',
              required: true,
              rule: "required",
              radios: [
                {
                  value: 'm',
                  label: 'Männlich'
                },
                {
                  value: 'w',
                  label: 'Weiblich'
                }
              ]
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="visible=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class ecAddPerson extends Vue {
  private visible = false;
  private valid = false;
  private value: any = {};

  public show() {
    this.visible = true;
  }

  private addPersonSave() {
    this.visible = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($vorname: String!, $nachname: String!, $gebDat: String!, $geschlecht: String!, $authToken: String!) {
          addPerson(vorname: $vorname, nachname: $nachname, gebDat: $gebDat, geschlecht: $geschlecht, authToken: $authToken)
        }
      `,
      variables: {...this.value,  anmeldeID: this.$route.params.id, authToken: this.$authToken()}
    }).then((res: any) => {
      this.$notifikation('Neue Person', `Du hast erfolgreich eine neue Person angelegt`);
      this.$router.push({path: `/personen/${res.data.addPerson}/home`, query: {prev: this.$route.fullPath}});
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });

  }
}
</script>
