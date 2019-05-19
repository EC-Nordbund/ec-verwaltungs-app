<template lang="pug">  
  v-dialog(v-model="addPersonShow" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) FZ Eintragen
      v-card-text
        v-form(v-model="addPersonValid" @submit.prevent)
          formular(v-model="addPersonValue" :schema=`[
            {
              name: 'gesehenVon',
              type: 'autocomplete',
              rule: 'required',
              'prepend-icon': 'person',
              items: allPersonen.map(pers=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
              label: 'Gesehen von',
              required: true
            },
            {
              name: 'fzVon',
              rule: 'required',
              type: 'date',
              label: 'FZ vom',
              required: true
            },
            {
              name: 'gesehenAm',
              rule: 'required',
              type: 'date',
              label: 'Gesehen am',
              required: true
            },
            {
              name: 'kommentar',
              type: 'textarea',
              label: 'Kommentar',
              rule: 'required',
              required: true
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

  public show() {
    this.addPersonShow = true;
  }

  created() {
    this.getPersonen()
  }

  private addPersonSave() {
    this.addPersonShow = false;

    this.$apolloClient.mutate({
      mutation:  gql`
        mutation(
          $personID: Int!
          $authToken: String!
          $gesehenAm: String!
          $gesehenVon: Int!
          $kommentar: String!
          $fzVon: String!
        ) {
          addFZ(
            personID: $personID
            authToken: $authToken
            gesehenAm: $gesehenAm
            gesehenVon: $gesehenVon
            kommentar: $kommentar
            fzVon: $fzVon
          )
        }
      `,
      variables: {...this.addPersonValue,  personID: this.$route.params.id, authToken: this.$authToken()}
    }).then(() => {
      this.$notifikation('Neues FZ eingetragen', `Du hast erfolgreich ein neues FZ eingetragen.`);
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
