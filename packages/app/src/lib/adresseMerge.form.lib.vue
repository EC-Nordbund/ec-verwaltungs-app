<template lang="pug">
  v-dialog(v-model="abmeldenShow" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Adresse Mergen
      v-card-text
        v-form(v-model="abmeldenValid")
          formular(v-model="abmeldenValue" :schema=`[
            {
              name: 'richtig',
              type: 'autocomplete',
              label: 'Richtige Adresse',
              rule: "required",
              required: true,
              items: data.adressen.filter(v=>!v.isOld).map((a) => {
                return {
                  text: a.strasse + " | " + a.plz + " " + a.ort,
                  value: a.adressID
                }
              })
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="abmeldenShow=false") Abbrechen
        v-btn(color="primary" :disabled="!abmeldenValid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any;

  private falsch = 0

  show(falsch: number) {
    this.abmeldenValue = {}
    this.abmeldenShow = true;
    this.falsch = falsch
  }

  private abmeldenShow = false;
  private abmeldenValid = false;
  private abmeldenValue = {};

  private abmeldenSave() {
    this.abmeldenShow = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $richtig: Int!, $falsch: Int!) {
          mergeAdresse(authToken: $authToken, adressID_richtig: $richtig, adressID_falsch: $falsch) 
        } 
      `,
      variables: {
        authToken: this.$authToken(),
        ...this.abmeldenValue,
        falsch: this.falsch
      }
    }).then(() => {
      this.$notifikation('Erfolgreich Gemergt', `Du hast erfolgreich die Kontaktdaten erfolgreich zusammengeführt.`);
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });1
  }
}
</script>