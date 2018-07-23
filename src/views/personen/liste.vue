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
      <v-avatar :style="{ background: (slotProps.item.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }" :size="32">
        <span class="white--text headline" style="font-size: 12pt !important">
          {{slotProps.item.vorname[0].toUpperCase()}}{{slotProps.item.nachname[0].toUpperCase()}}
        </span>
      </v-avatar>
    </template>

    <ec-button-add @click="addPerson_show = true"/>
    <ec-form v-model="addPerson_show" title="Person hinzufügen" :fieldConfig="addPerson_config" @save="saveNewPerson" v-if="auth.isMutationAllowed('addPerson')"/>
    
  </ec-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import {
  vornameConfig,
  nachnameConfig,
  gebDatConfig,
  geschlechtConfig
} from '@/plugins/formConfig/index'

import auth from '@/plugins/auth'

import xButtonLogik from '@/plugins/xButton/logic'
import event from '@/plugins/eventbus'
import { query } from '@/graphql/index'
import { getClient } from '@/plugins/apollo'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.personen.liste.load,
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
        mutation: query.personen.liste.addPerson,
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
    this.query = query.personen.liste.load
    this.suchstring = this.$route.query.suche || ''
    super.created()
  }
}
</script>
