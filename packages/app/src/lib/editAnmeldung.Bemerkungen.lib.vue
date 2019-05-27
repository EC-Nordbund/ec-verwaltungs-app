<template lang="pug">  
  v-dialog(v-model="visible" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) Bemerkungen editieren
      v-card-text
        v-form(v-model="valid" @submit.prevent)
          formular(v-model="value" :schema=`[
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
        v-btn(flat @click="visible=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class EcRootIndex extends Vue {
  @Prop({default: {}})
  private data!: any;

  private visible = false;
  private valid = false;
  private value: any = {};

  public show() {
    this.value = {
      vegetarisch: this.data.vegetarisch,
      gesundheitsinformationen: this.data.gesundheitsinformationen,
      bemerkungen: this.data.bemerkungen,
      lebensmittelAllergien: this.data.lebensmittelAllergien
    };

    this.visible = true;
  }

  private addPersonSave() {
    this.visible = false;

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
      variables: {...this.value,  anmeldeID: this.$route.params.id, authToken: this.$authToken()}
    }).then(() => {
      this.$notifikation('Neuer Eintrag im AK', `Du hast erfolgreich einen neuen Eintrag im AK angelegt`);
      this.$emit('reload');
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });

  }
}
</script>
