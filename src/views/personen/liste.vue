<template>
  <ec-table title="Personen" itemName="Personen" :items="data.personen" :config="tableConfig" suche @open="open">
    <template slot="handleOutside" slot-scope="slotProps">
      <!-- Handle Geschlecht Col -->
       <v-avatar :style="{ background: (slotProps.item.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }" :size="32">
        <span class="white--text headline" style="font-size: 12pt !important">
          {{slotProps.item.vorname[0]}}{{slotProps.item.nachname[0]}}
        </span>
      </v-avatar>
    </template>
    <ec-button-add @click="addPerson_show = true"/>
    <ec-form v-model="addPerson_show" title="Person hinzufügen" :fieldConfig="addPerson_config" @save="save" v-if="auth.isMutationAllowed('addPerson')"/>
  </ec-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import {vornameConfig, nachnameConfig, gebDatConfig, geschlechtConfig} from '@/plugins/formConfig/index'

import auth from '@/plugins/auth'

import {query} from '@/graphql/index';

@Component({})
export default class PersonenListe extends reloaderBase {
  data = {
    personen: []
  }
  tableConfig = [
    {
      name: 'geschlecht',
      label: 'Geschl.',
      handleOutside: true,
      width: '30px'
    },
    { name: 'vorname', label: 'Vorname' },
    { name: 'nachname', label: 'Nachname' },
    {
      name: 'gebDat.german',
      label: 'Geburtsdatum',
      width: '175px'
    }
  ]
  addPerson_show = false
  addPerson_config = [
    vornameConfig,
    nachnameConfig,
    gebDatConfig,
    geschlechtConfig
  ];

  save(value: any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation(
          $vorname: String!
          $nachname: String!
          $gebDat: String!
          $geschlecht: String!
          $authToken: String!
        ) {
          addPerson(
            authToken: $authToken
            vorname: $vorname
            nachname: $nachname
            gebDat: $gebDat
            geschlecht: $geschlecht
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        ...value
      }
    }).then(()=>{
      this.refetch()
    })
  }
  open(item: any) {
    this.$router.push(`/app/personen/${item.personID}`)
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    };
    this.query = query.personen.liste.load;
    super.created();
  }
}
</script>
