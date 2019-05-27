<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="valid")
            formular(v-model="value" :schema=`[
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
  private value: {telefon: string} = {telefon: ''};

  public show() {
    this.visible = true;
  }

  private addAKSave() {
    this.visible = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $personID: Int!, $telefon: String!) {
          addTelefon(personID: $personID, telefon: $telefon, authToken: $authToken)
        }
      `,
      variables: {
        ...this.value,
        authToken: this.$authToken(),
        personID: this.data.personID
      }
    }).then((res: any) => {
      this.$notifikation('Neue Telefonnummer', `Telefonnummer erfolgreich hinzugefügt`);
      this.$emit('reload');
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.value = {telefon: ''};
  }
}
</script>
