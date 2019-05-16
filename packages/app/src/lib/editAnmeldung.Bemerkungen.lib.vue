<template lang="pug">  
  v-dialog(v-model="addPersonShow" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) Bemerkungen editieren
      v-card-text
        v-form(v-model="addPersonValid" @submit.prevent)
          formular(v-model="addPersonValue" :schema=`[
            {
              name: 'vegetarisch',
              type: 'switch',
              label: 'Vegetarisch'
            },
            {
              name: 'gesundheitsinformationen',
              type: 'textarea',
              label: 'Gesundheitsinformationen'
            },
            {
              name: 'bemerkungen',
              type: 'textarea',
              label: 'Bemerkungen'
            },
            {
              name: 'lebensmittelAllergien',
              type: 'textarea',
              label: 'Lebensmittelallergien'
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="addPersonShow=false") Abbrechen
        v-btn(color="primary" :disabled="!addPersonValid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report'

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any 

  private addPersonShow = false;
  private addPersonValid = false;
  private addPersonValue: any = {};

  private addPersonSave() {
    this.addPersonShow = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation(
          $authToken: String!
          $anmeldeID: String!
          $vegetarisch: Boolean!
          $gesundheitsinformationen: String!
          $bemerkungen: String!
          $lebensmittelAllergien: String!
        ) {
          anmeldungBesonderheiten(
            authToken: $authToken
            anmeldeID: $anmeldeID
            vegetarisch: $vegetarisch
            gesundheitsinformationen: $gesundheitsinformationen
            bemerkungen: $bemerkungen
            lebensmittelAllergien: $lebensmittelAllergien
          )
        }
      `,
      variables: {...this.addPersonValue,  anmeldeID: this.$route.params.id, authToken: this.$authToken}
    }).then(()=>{
      this.$notifikation('Neuer Eintrag im AK', `Du hast erfolgreich einen neuen Eintrag im AK angelegt`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });

  }

  public show() {
    this.addPersonValue = {
      vegetarisch: this.data.vegetarisch,
      gesundheitsinformationen: this.data.gesundheitsinformationen,
      bemerkungen: this.data.bemerkungen,
      lebensmittelAllergien: this.data.lebensmittelAllergien
    }

    this.addPersonShow = true;
  }
}
</script>
