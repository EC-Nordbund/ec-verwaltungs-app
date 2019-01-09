<template>
  <ec-table title="Veranstaltungsorte" itemName="Veranstaltungsort" :items="data.vorte" :config="tableConfig" suche @open="open" @sucheChanged="suchStringUpdate" >
    <ec-button-add @click="addVort_show = true"/>
    <ec-form
      title="Veranstaltungsort hinzufügen"
      v-model="addVort_show"
      @save="addVort_save"
      :fieldConfig="addVort_config"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'
import auth from '@/plugins/auth'
import {getClient} from '@/realPlugins/apollo'
import {
  bezeichnungConfig,
  orgaConfig,
  strasseConfig,
  plzConfig,
  ortConfig,
  landConfig
} from '@/realPlugins/formConfig'

import event from '@/plugins/eventbus'


import { required, maxLength } from '@/config/rules'
import xButtonLogik from '@/realPlugins/xButton/logic'

const loadGQL = gql`
  query($authToken: String!) {
    vorte(authToken: $authToken) {
      vOrtID
      bezeichnung
      organisation {
        bezeichnung
      }
      plz
      ort
      land
    }
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
          ;(<vOrtListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class vOrtListe extends reloaderBase {
  data: { vorte: Array<any> } = {
    vorte: []
  }

  addVort_show = false
  addVort_config = [
    bezeichnungConfig,
    orgaConfig,
    strasseConfig,
    {
      ...plzConfig,
      rules: [
        required('eine PostLeitZahl'),
        maxLength('eine PostLeitZahl', 'die', 10)
      ],
      counter: 10
    },
    ortConfig,
    landConfig
  ]

  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' },
    {
      name: 'organisation.bezeichnung',
      label: 'Organisation'
    },
    { name: 'plz', label: 'PLZ' },
    { name: 'ort', label: 'Ort' },
    { name: 'land', label: 'Land' }
  ]
  xButtonLogik = xButtonLogik
  open(item: any) {
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/vOrte/${item.vOrtID}`)
  }

  
  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  addVort_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation ($authToken: String!, $bezeichnung: String!, $strasse: String!, $plz: String!, $ort: String!, $land: String!, $organisationsID: Int!) {
            addVeranstaltungsort(authToken: $authToken, bezeichnung: $bezeichnung, strasse: $strasse, plz: $plz, ort: $ort, land: $land, organisationsID: $organisationsID)
          }
        `,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }

  created() {
    this.query = loadGQL
    this.variabels = {
      authToken: auth.authToken
    }
    super.created()
  }
}
</script>
