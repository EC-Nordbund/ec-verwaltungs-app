<template lang="pug">  
  v-dialog(v-model="show" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) Person hinzufügen
      v-card-text
        v-form(v-model="valid" @submit.prevent)
          formular(v-model="value" :schema=`[
            {
              name: 'vorname',
              type: 'input',
              label: 'Vorname',
              rule: "required|max:50",
              required: true,
              counter: 50
            },
            {
              name: 'nachname',
              type: 'input',
              label: 'Nachname',
              rule: "required|max:50",
              required: true,
              counter: 50
            },
            {
              name: 'gebDat',
              type: 'date',
              label: 'Geburtsdatum',
              rule: "required",
              required: true
            },
            {
              name: 'geschlecht',
              type: 'radio',
              required: true,
              rule: "required",
              radios: [
                {
                  value: 'm',
                  label: 'Männlich'
                },
                {
                  value: 'w',
                  label: 'Weiblich'
                }
              ]
            }
          ]`)
      v-card-actions
        v-spacer
        v-btn(flat @click="show=false") Abbrechen
        v-btn(color="primary" :disabled="!valid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';
import { genReport } from '@/report';

@Component({})
export default class ecAddPerson extends Vue {
  @Prop({default: {}})
  private data!: any;

  private show = false;
  private valid = false;
  private value: any = {};

  public show() {
    this.show = true;
    this.value = {
      ...this.data,
      gebDat: this.data.gebDat.input
    };
  }

  private addPersonSave() {
    this.show = false;

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($vorname: String!, $nachname: String!, $gebDat: String!, $geschlecht: String!, $authToken: String!, $personID: Int!) {
          editPersonStamm(vorname: $vorname, nachname: $nachname, gebDat: $gebDat, geschlecht: $geschlecht, authToken: $authToken, personID: $personID)
        }
      `,
      variables: {...this.value, personID: this.$route.params.id, authToken: this.$authToken()}
    }).then((res: any) => {
      this.$notifikation('Stammdaten editiert', `Du hast erfolgreich die Person editiert.`);
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
