<template>
  <div>
    <!-- Header -->
    <v-toolbar ripple tabs>
      <ec-button-router-back/>
      <v-spacer/>
      <ec-headline>{{data.ak.bezeichnung}}</ec-headline>
      <v-spacer/>
      <ec-button-icon @click="editAKStamm_open" v-if="auth.isMutationAllowed('editAKStamm')"/>
    </v-toolbar>
    <!-- Content -->
    <v-card>
      <!-- Liste -->
      <ec-list v-if="data.ak.personen" :items="data.ak.personen" :mapper="mapper" :edit="auth.isMutationAllowed('editAKPerson')" @edit="edit" icon="person_pin_circle"/>
      <!-- ADD-Button -->
      <v-card-actions>
        <ec-button-add v-if="auth.isMutationAllowed('addAKPerson')" @click="addAKPerson_show = true"/>
      </v-card-actions>
    </v-card>

    <!-- Edit AK-Stamm -->
    <ec-form
      title="Arbeitskreis editieren"
      v-model="editAKStamm_show"
      :fieldConfig="editAKStamm_config"
      :value="editAKStamm_value"
      @save="editAKStamm_save"
    />

    <!-- Edit AK-Person -->
    <ec-form
      title="Editiere Personenzuordnung"
      v-model="editAKPerson_show"
      :fieldConfig="editAKPerson_config"
      :value="editAKPerson_value"
      @save="editAKPerson_save"
    />

    <!-- ADD AK-Person -->
    <ec-form
      title="Person hinzufügen"
      v-model="addAKPerson_show"
      :fieldConfig="addAKPerson_config"
      @save="addPersonAK_save"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class AKDetails extends reloaderBase {
  data:{ak:any} = {
    ak: {}
  }
  mapper = (item:any) => ({
    title: `${item.person.vorname} ${item.person.nachname} (${item.person.gebDat.german})`,
    subTitle: `${item.eintritt.german}${item.austritt ? ` ${item.austritt.german}` : ''}${item.leiter ? ' (Leiter)' : ''}`,
  })
  editAKStamm_show = false
  editAKStamm_config = [
    {
      label: 'Bezeichnung',
      name: 'bezeichnung',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst eine Bezeichnung angeben!' : true),
        (v:string) => (v && v.length > 50 ? 'Die Bezeichnung darf nicht länger als 50 Zeichen sein!' : true),
      ],
      counter: 50,
    },
  ]
  editAKStamm_value = {}
  editAKPerson_show = false
  editAKPerson_config = [
    {
      label: 'Person wählen',
      name: 'personID',
      disabled: true,
      required: true,
      componentName: 'ec-select-person'
    },
    {
      label: 'Eintritt',
      name: 'eintritt',
      required: true,
      rules: [(v:string) => (!v ? 'Du musst ein Eintrittsdatum angeben!' : true)],
      componentName: 'ec-form-datePicker',
    },
    {
      label: 'Austritt',
      name: 'austritt',
      required: false,
      rules: [],
      componentName: 'ec-form-datePicker',
    },
    {
      label: 'Leiter',
      name: 'leiter',
      type: 'checkbox',
      componentName: 'ec-form-checkbox',
    },
  ]
  editAKPerson_value = {}
  addAKPerson_show = false
  addAKPerson_config = [
    {
      label: 'Person',
      name: 'personID',
      required: true,
      rules: [(v:string) => (!v ? 'Du musst eine Person angeben!' : true)],
      componentName: 'ec-select-person',
      type: 'select',
    },
    {
      label: 'Eintritt',
      name: 'eintritt',
      required: true,
      rules: [(v:string) => (!v ? 'Du musst ein Eintrittsdatum angeben!' : true)],
      componentName: 'ec-form-datePicker',
    },
    {
      label: 'Leiter',
      name: 'leiter',
      type: 'checkbox',
      componentName: 'ec-form-checkbox',
    },
  ]
  edit(item:any) {
    this.editAKPerson_value = {
      personAKID: item.personAKID,
      personID: item.person.personID,
      eintritt: item.eintritt.input,
      austritt: (item.austritt || {}).input,
      leiter: item.leiter,
    };
    this.editAKPerson_show = true;
  }
  editAKStamm_open() {
    this.editAKStamm_value = {};
    this.editAKStamm_value = {
      bezeichnung: this.data.ak.bezeichnung,
    };
    this.editAKStamm_show = true;
  }
  editAKStamm_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($akID: Int!,$bezeichnung: String!,$authToken: String!) {
          editAKStamm(
            authToken: $authToken,
            akID: $akID,
            bezeichnung: $bezeichnung
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        akID: this.$route.params.id,
        bezeichnung: value.bezeichnung,
      },
    });
  }
  editAKPerson_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($akID: Int!,$personAKID: Int!,$personID: Int!,$eintritt: String!,$austritt: String,$leiter:Boolean!,$authToken: String!) {
          editAKPerson(
            authToken: $authToken,
            akID: $akID,
            personAKID: $personAKID,
            personID: $personID,
            eintritt: $eintritt,
            austritt: $austritt,
            leiter: $leiter,
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        akID: this.$route.params.id,
        personID: value.personID,
        personAKID: value.personAKID,
        eintritt: value.eintritt,
        austritt: value.austritt,
        leiter: value.leiter,
      },
    }).then(this.refetch);
  }
  addPersonAK_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($akID: Int!,$personID: Int!,$eintritt: String!,$leiter:Boolean!,$authToken: String!) {
          addAKPerson(
            authToken: $authToken,
            akID: $akID,
            personID: $personID,
            eintritt: $eintritt,
            leiter: $leiter
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        akID: this.$route.params.id,
        personID: value.personID,
        eintritt: value.eintritt,
        leiter: value.leiter,
      },
    }).then(this.refetch);
  }

  created () {
    this.variabels = {
      authToken: auth.authToken,
      akID: this.$route.params.id
    }
    this.query = gql`
      query($authToken: String!, $akID: Int!){
        ak(akID:$akID authToken:$authToken){
          akID
          bezeichnung
          personen{
            personAKID
            eintritt {
              german
              input
            }
            austritt {
              german
              input
            }
            leiter
            person {
              personID
              vorname
              nachname
              gebDat {
                german
              }
            }
          }
        }
      }
    `
    super.created()
  }
}
</script>