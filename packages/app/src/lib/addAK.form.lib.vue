<template lang="pug">
  v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Neuen AK anlegen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'bezeichnung',
                type: 'input',
                label: 'Bezeichnung',
                rule: "required|max:50",
                required: true,
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

  public show() {
    this.addAKShow = true;
  }

  private addAKValid = false;
  private addAKShow = false;
  private addAKValue: {bezeichnung: string} = {bezeichnung: ''};

  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $bezeichnung: String!) {
          addAK(bezeichnung: $bezeichnung, authToken: $authToken)
        }
      `,
      variables: {
        ...this.addAKValue,
        authToken: this.$authToken()
      }
    }).then((res: any) => {
      this.$notifikation('Neuer AK', `Du hast erfolgreich einen AK mit dem Namen "${this.addAKValue.bezeichnung}" angelegt`);
      this.$router.push({path: `/ak/${res.data.addAK}`, query: {prev: this.$route.fullPath}});
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.addAKValue = {bezeichnung: ''};
  }
}
</script>
