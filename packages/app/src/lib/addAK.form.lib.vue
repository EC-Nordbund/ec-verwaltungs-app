<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Neuen AK anlegen
        v-card-text
          v-form(v-model="valid")
            formular(v-model="value" :schema=`[
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

  private valid = false;
  private visible = false;
  private value: {bezeichnung: string} = {bezeichnung: ''};

  public show() {
    this.visible = true;
  }

  private addAKSave() {
    this.visible = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $bezeichnung: String!) {
          addAK(bezeichnung: $bezeichnung, authToken: $authToken)
        }
      `,
      variables: {
        ...this.value,
        authToken: this.$authToken()
      }
    }).then((res: any) => {
      this.$notifikation('Neuer AK', `Du hast erfolgreich einen AK mit dem Namen "${this.value.bezeichnung}" angelegt`);
      this.$router.push({path: `/ak/${res.data.addAK}`, query: {prev: this.$route.fullPath}});
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.value = {bezeichnung: ''};
  }
}
</script>
