<template lang="pug">
  v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'telefon',
                type: 'input',
                rule: 'required|max:50',
                label: 'Telefon',
                mask: '####################',
                counter: 20
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

  public show() {
    this.addAKShow = true;
  }

  private addAKValid = false;
  private addAKShow = false;
  private addAKValue: {telefon: string} = {telefon: ''};

  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $personID: Int!, $telefon: String!) {
          addTelefon(personID: $personID, telefon: $telefon, authToken: $authToken)
        }
      `,
      variables: {
        ...this.addAKValue,
        authToken: this.$authToken,
        personID: this.data.personID
      }
    }).then((res: any) => {
      this.$notifikation('Neue Telefonnummer', `Telefonnummer erfolgreich hinzugefügt`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.addAKValue = {telefon: ''};
  }
}
</script>
