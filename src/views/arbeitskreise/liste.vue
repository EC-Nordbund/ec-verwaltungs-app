<template>
  <ec-table
    title="Arbeitskreise"
    itemName="Arbeitskreise"
    :items="data.aks"
    :config="tableConfig"
    suche
    @open="open"
    :sucheVal="suchstring"
  >
    <ec-button-add @click="showAddAk = true" v-if="auth.isMutationAllowed('addAK')"/>
    <ec-form
      v-model="showAddAk"
      title="Arbeitskreis hinzufügen"
      :fieldConfig="fieldConfig"
      @save="save"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {getClient} from '@/realPlugins/apollo'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import { bezeichnungConfig } from '@/realPlugins/formConfig'
import xButtonLogik from '@/realPlugins/xButton/logic'
import event from '@/plugins/eventbus'

import auth from '@/plugins/auth'

const loadGQL = gql`
  query($authToken: String!) {
    aks(authToken: $authToken) {
      akID
      bezeichnung
    }
  }
`

const addAKGQL = gql`
  mutation($authToken: String!, $bezeichnung: String!) {
    addAK(bezeichnung: $bezeichnung, authToken: $authToken)
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
          ;(<AKListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class AKListe extends reloaderBase {
  data = {
    aks: []
  }
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' }
  ]
  showAddAk = false
  fieldConfig = [bezeichnungConfig]
  save(value: any) {
    this.$apollo
      .mutate({
        mutation: addAKGQL,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(v => v.data.addAK)
      .then((akID: number) => {
        this.$router.push(`/app/arbeitskreise/${akID}`)
      })
  }
  open($event: any) {
    xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/arbeitskreise/${$event.akID}`)
  }

  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.suchstring =
      typeof this.$route.query.suche === 'string'
        ? this.$route.query.suche
        : ''
    this.query = loadGQL
    super.created()
  }
}
</script>