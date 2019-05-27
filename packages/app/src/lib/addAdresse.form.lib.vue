<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="valid")
            formular(v-model="value" :schema=`[
              {
                name: 'adresse',
                type: 'adresse'
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="visible=false") Abbrechen
          v-btn(color="primary" :disabled="!valid" @click="addAKSave") Speichern
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

  private valid = false;
  private visible = false;
  private value: {adresse: {strasse: string, plz: string, ort: string}} = {adresse: {strasse: '', plz: '', ort: ''}};

  public show() {
    this.visible = true;
  }

  private addAKSave() {
    this.visible = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $personID: Int!, $strasse: String!, $plz: String!, $ort: String!) {
          addAdresse(personID: $personID, strasse: $strasse, plz: $plz, ort: $ort, authToken: $authToken)
        }
      `,
      variables: {
        ...this.value.adresse,
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
    this.value = {adresse: {}};
  }
}
</script>
