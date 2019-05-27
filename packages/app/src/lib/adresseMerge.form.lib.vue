<template lang="pug">
  v-dialog(v-model="visible" max-width="400px")
    v-card
      v-card-title
        h1(v-font v-primary) Adresse Mergen
      v-card-text
        v-form(v-model="valid")
          formular(v-model="value" :schema=`[
            {
              name: 'richtig',
              type: 'autocomplete',
              label: 'Richtige Adresse',
              rule: "required",
              required: true,
              items: data.adressen.filter(v=>!v.isOld).filter(v=>v.adressID!==falsch).map((a) => {
                return {
                  text: a.strasse + " | " + a.plz + " " + a.ort,
                  value: a.adressID
                }
              })
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="visible=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any;

  private falsch = 0;

  private visible = false;
  private valid = false;
  private value = {};

  public show(falsch: number) {
    this.value = {};
    this.visible = true;
    this.falsch = falsch;
  }

  private abmeldenSave() {
    this.visible = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $richtig: Int!, $falsch: Int!) {
          mergeAdresse(authToken: $authToken, adressID_richtig: $richtig, adressID_falsch: $falsch)
        }
      `,
      variables: {
        authToken: this.$authToken(),
        ...this.value,
        falsch: this.falsch
      }
    }).then(() => {
      this.$notifikation('Erfolgreich Gemergt', `Du hast erfolgreich die Kontaktdaten erfolgreich zusammengeführt.`);
      this.$emit('reload');
    }).catch((err) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
  }
}
</script> 