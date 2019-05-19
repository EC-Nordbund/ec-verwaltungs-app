<template lang="pug">
  v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Adresse hinzufügen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'email',
                type: 'input',
                rule: 'required|max:50',
                label: 'E-Mail',
                counter: 50
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
  private addAKValue: {email: string} = {email: ''};

  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $personID: Int!, $email: String!) {
          addEmail(personID: $personID, email: $email, authToken: $authToken)
        }
      `,
      variables: {
        ...this.addAKValue,
        authToken: this.$authToken(),
        personID: this.data.personID
      }
    }).then((res: any) => {
      this.$notifikation('Neue Email', `Email erfolgreich hinzugefügt`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.addAKValue = {email: ''};
  }
}
</script>
