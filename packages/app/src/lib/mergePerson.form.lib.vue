<template lang="pug">  
  v-dialog(v-model="addPersonShow" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) Person mergen
      v-card-text
        v-form(v-model="addPersonValid" @submit.prevent)
          formular(v-model="addPersonValue" :schema=`[
            {
              name: 'falsch',
              type: 'autocomplete',
              rule: 'required',
              'prepend-icon': 'person',
              items: allPersonen.filter(v=>v.personID!==richtig).map(pers=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
              label: 'Falsche Person'
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="addPersonShow=false") Abbrechen
        v-btn(color="primary" :disabled="!addPersonValid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  private personenData = [];

  private addPersonShow = false;
  private addPersonValid = false;
  private addPersonValue: any = {};

  private allPersonen: any = [];

  private richtig = 0;

  public show(richtig: number) {
    this.addPersonValue = {};
    this.addPersonShow = true;
    this.richtig = richtig;
  }
  public created() {
    this.getPersonen();
  }

  private addPersonSave() {
    this.addPersonShow = false;

    this.$apolloClient.mutate({
      mutation:  gql`
        mutation($authToken: String!, $richtig: Int!, $falsch: Int!) {
          mergePersons(authToken: $authToken, personID_richtig: $richtig, personID_falsch: $falsch)
        }
      `,
      variables: {...this.addPersonValue, authToken: this.$authToken(), richtig: this.richtig}
    }).then(() => {
      this.$notifikation('Personen gemergt', `Du hast erfolgreich die Personen zusammengeführt.`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });

  }

  private getPersonen() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          personen(authToken: $authToken) {
            personID,
            vorname,
            nachname,
            gebDat {
              german
              input
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    })
    .then((res) => {
      this.allPersonen = res.data.personen;
    })
    .catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }
}
</script>
