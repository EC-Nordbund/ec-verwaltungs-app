<template lang="pug">
  v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'adresse',
                type: 'adresse'
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="addAKShow=false") Abbrechen
          v-btn(color="primary" :disabled="!addAKValid" @click="addAKSave") Speichern
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  public static meta = {};

  @Prop()
  private data!: any;

  private addAKValid = false;
  private addAKShow = false;
  private addAKValue: {adresse: {strasse: string, plz: string, ort: string}} = {adresse: {strasse: '', plz: '', ort: ''}};

  public show() {
    this.addAKShow = true;
  }

  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $personID: Int!, $strasse: String!, $plz: String!, $ort: String!) {
          addAdresse(personID: $personID, strasse: $strasse, plz: $plz, ort: $ort, authToken: $authToken)
        }
      `,
      variables: {
        ...this.addAKValue.adresse,
        authToken: this.$authToken(),
        personID: this.data.personID
      }
    }).then((res: any) => {
      this.$notifikation('Neue Adresse', `Adresse erfolgreich hinzugefügt`);
      this.$emit('reload');
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.addAKValue = {adresse: {}};
  }
}
</script>
