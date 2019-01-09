<template>
  <ec-table title="Veranstaltungen" itemName="Veranstaltungen" :items="data.veranstaltungen" :config="tableConfig" suche @open="open" @sucheChanged="suchStringUpdate" :sucheVal="suchstring">
    <ec-button-add @click="vAdd_show = true"/>
    <ec-form
      title="Veranstaltung hinzufügen"
      v-model="vAdd_show"
      :fieldConfig="vAdd_config"
      @save="vAdd_save"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'
import {getClient} from '@/realPlugins/apollo'
import auth from '@/plugins/auth'

import {
  bezeichnungConfig,
  beginConfig,
  endeConfig,
  vOrtConfig,
  minTNConfig,
  maxTNConfig
} from '@/realPlugins/formConfig'

import xButtonLogik from '@/realPlugins/xButton/logic'
import event from '@/plugins/eventbus'


const loadGQL = gql`
  query($authToken: String!) {
    veranstaltungen(authToken: $authToken) {
      veranstaltungsID
      bezeichnung
      begin {
        german
        input
      }
      ende {
        german
        input
      }
      veranstaltungsort {
        bezeichnung
      }
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
          ;(<VeranstaltungsListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class VeranstaltungsListe extends reloaderBase {
  xButtonLogik = xButtonLogik
  suchstring: string = ''

  vAdd_show = false
  vAdd_config = [
    bezeichnungConfig,
    beginConfig,
    endeConfig,
    vOrtConfig,
    minTNConfig,
    maxTNConfig
  ]

  vAdd_save(value: any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation(
          $bezeichnung: String!
          $authToken: String!
          $minTNAlter: Int!
          $maxTNAlter: Int!
          $vOrtID: Int!
          $begin: String!
          $ende: String!
        ) {
          veranstaltungAdd(
            bezeichnung: $bezeichnung
            authToken: $authToken
            minTNAlter: $minTNAlter
            maxTNAlter: $maxTNAlter
            veranstaltungsortID: $vOrtID
            begin: $begin
            ende: $ende
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        ...value
      }
    }).then(this.refetch)
  }

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  data: { veranstaltungen: Array<any> } = {
    veranstaltungen: []
  }
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' },
    {
      name: 'begin.german',
      label: 'Beginn',
      width: '175px'
    },
    { name: 'ende.german', label: 'Ende', width: '175px' },
    {
      name: 'veranstaltungsort.bezeichnung',
      label: 'Unterkunft'
    }
  ]
  created() {
    this.query = loadGQL
    this.variabels = {
      authToken: auth.authToken
    }
    this.suchstring = (typeof this.$route.query.suche === 'string') ? this.$route.query.suche : ''
    super.created()
  }

  open(item: any) {
    this.$router.push(
      `/app/veranstaltungen/${item.veranstaltungsID}`
    )
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
  }
}
</script>
