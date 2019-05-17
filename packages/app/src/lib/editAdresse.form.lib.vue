<template lang="pug">
  v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="editAdresseValue" :schema=`[
              {
                name: 'adresse',
                type: 'adresse'
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="addAKShow=false") Abbrechen
          v-btn(color="primary" @click="old") Veraltet
          v-btn(color="primary" :disabled="!addAKValid" @click="addAKSave") Speichern
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  public static meta = {};

  a:any = {}

  public show(adresse: any) {
    this.a = adresse
    this.editAdresseValue = {adresse}
    this.addAKShow = true;
  }

  public old() {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $adressID: Int!) {
          markAdressAsOld(authToken: $authToken, adressID: $adressID)
        }
      `,
      variables: {
        ...this.a,
        authToken: this.$authToken
      }
    }).then((res: any) => {
      this.$notifikation('Adresse veraltet', `Adresse erfolgreich als Veraltet makiert.`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }

  private addAKValid = false;
  private addAKShow = false;
  private editAdresseValue: {adresse: {strasse: string, plz: string, ort: string}} = {adresse: {strasse: '', plz: '', ort: ''}};

  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $adressID: Int!, $strasse: String!, $plz: String!, $ort: String!) {
          editAdresse(strasse: $strasse, plz: $plz, ort: $ort, authToken: $authToken, adressID: $adressID)
        }
      `,
      variables: {
        ...this.a,
        ...this.editAdresseValue.adresse,
        authToken: this.$authToken
      }
    }).then((res: any) => {
      this.$notifikation('Adresse editiert', `Adresse erfolgreich geändert.`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.editAdresseValue = {adresse: {}};
  }
}
</script>
