<template lang="pug">  
  v-dialog(v-model="visible" max-width="400px" persistend)
    v-card
      v-card-title
        h1(v-font v-primary) {{type==='add' ? 'Neues Mitglied hinzufügen' : 'Mitglied bearbeiten'}}
      v-card-text
        v-form(v-model="valid" @submit.prevent)
          formular(v-model="value" :schema=`[
            {
              name: 'personID',
              type: 'autocomplete',
              rule: 'required',
              'prepend-icon': 'person',
              items: (type==='add'?allPersonen:((data.personen||[]).filter(v=>(v.currentStatus>0)).map(v=>v.person))).map(pers=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
              label: 'Person'
            },
            {
              name: 'status',
              rule: 'required',
              type: 'select',
              items: stadien.map((besch, id)=>({value: id, text: besch})),
              label: 'Neuer Status'
            },
            {
              name: 'date',
              type: 'date',
              label: 'Datum des Updates',
              rule: 'required',
              required: true
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
  @Prop({default: []})
  private data!: any;

  private personenData = [];

  private visible = false;
  private valid = false;
  private value: any = {};
  private type: 'add'|'edit'|'delete'|'' = '';

  private allPersonen: any = [];

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ];

  public edit(type: 'add'|'edit'|'delete') {
    this.type = type;
    this.value = {};

    if (type === 'delete') {
      this.value = {
        status: 0
      };
    }

    if (type === 'add' && this.allPersonen) {
      this.getPersonen();
    }

    this.visible = true;
  }

  private addPersonSave() {
    this.visible = false;

    this.$apolloClient.mutate({
      mutation:  gql`
        mutation(
          $personID: Int!,
          $akID: Int!,
          $date: String!,
          $status: Int!,
          $authToken: String!
        ) {
          updateAKStatus(
            personID:  $personID,
            akID: $akID,
            date: $date,
            status: $status,
            authToken: $authToken
          )
        }
      `,
      variables: {...this.value,  akID: this.$route.params.id, authToken: this.$authToken()}
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

  private getPersonen() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          personen(authToken: $authToken) {
            personID,
            vorname,
            nachname,
            gebDat {
              german
              input
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    })
    .then((res) => {
      this.allPersonen = res.data.personen;
    })
    .catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }
}
</script>
