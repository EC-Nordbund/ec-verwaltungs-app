<template>
  <ec-table 
    title="Personen" 
    itemName="Personen" 
    :items="data.personen" 
    :config="tableConfig" 
    suche 
    @open="open" 
    @sucheChanged="suchStringUpdate" 
    :sucheVal="suchstring">

    <template slot="handleOutside" slot-scope="slotProps">
      <!-- Handle Geschlecht Col -->
      <v-avatar 
        :style="{ background: (slotProps.item.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }" 
        :size="32">

        <span class="white--text headline" style="font-size: 12pt !important">
          {{
            slotProps.item.vorname[0].toUpperCase()
            +
            slotProps.item.nachname[0].toUpperCase()
          }}
        </span>

      </v-avatar>
    </template>

    <!-- floating Button -->
    <ec-button-add 
      @click="addPerson_show = true"
    />

    <!-- Add Person Form -->
    <ec-form 
      title="Person hinzufügen"
      v-model="addPerson_show"  
      :fieldConfig="addPerson_config" 
      @save="saveNewPerson" 
      v-if="auth.isMutationAllowed('addPerson')"
    />
  </ec-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import {getClient} from '@/realPlugins/apollo'
import gql from 'graphql-tag'

import {
  vornameConfig,
  nachnameConfig,
  gebDatConfig,
  geschlechtConfig
} from '@/realPlugins/formConfig'

import auth from '@/plugins/auth'

import xButtonLogik from '@/realPlugins/xButton/logic'
import event from '@/plugins/eventbus'


const loadGQL = gql`
  query($authToken: String!) {
    personen(authToken: $authToken) {
      personID
      vorname
      nachname
      gebDat {
        input
        german
      }
      geschlecht
    }
  }
`

const addPersonGQL = gql`
  mutation(
    $authToken: String!
    $vorname: String!
    $nachname: String!
    $gebDat: String!
    $geschlecht: String!
  ) {
    addPerson(
      authToken: $authToken
      vorname: $vorname
      nachname: $nachname
      gebDat: $gebDat
      geschlecht: $geschlecht
    )
  }
`

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<PersonenListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class PersonenListe extends reloaderBase {
  data = { personen: [] }
  xButtonLogik = xButtonLogik
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
  ]

  saveNewPerson(value: any) {
    this.$apollo
      .mutate({
        mutation: addPersonGQL,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(() => {
        this.refetch()
      })
  }

  open(item: any) {
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/personen/${item.personID}`)
  }

  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = loadGQL
    this.suchstring = (typeof this.$route.query.suche === 'string') ? this.$route.query.suche : ''
    super.created()
  }
}
</script>
