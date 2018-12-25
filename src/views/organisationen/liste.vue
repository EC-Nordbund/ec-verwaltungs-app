<template>
  <ec-table title="Organisationen" itemName="Organisation" :items="data.orgas" :config="tableConfig" suche @open="open" @sucheChanged="suchStringUpdate" >
    <ec-button-add @click="addOrga_show = true"/>
    <ec-form
      title="Organisation hinzufügen"
      v-model="addOrga_show"
      @save="addOrga_save"
      :fieldConfig="addOrga_config"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'
import auth from '@/plugins/auth'

import { bezeichnungConfig } from '@/realPlugins/formConfig'
import xButtonLogik from '@/realPlugins/xButton/logic'

import event from '@/plugins/eventbus'


const loadGQL = gql`
  query($authToken: String!) {
    orgas(authToken: $authToken) {
      organisationsID
      bezeichnung
      plz
      ort
      land
    }
  }
`

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    this.$getApolloClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<orgaListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class orgaListe extends reloaderBase {
  data: { orgas: Array<any> } = {
    orgas: []
  }
  xButtonLogik = xButtonLogik

  addOrga_show = false
  addOrga_config = [bezeichnungConfig]

  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' },
    { name: 'plz', label: 'PLZ' },
    { name: 'ort', label: 'Ort' },
    { name: 'land', label: 'Land' }
  ]
  open(item: any) {
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(
      `/app/organisationen/${item.organisationsID}`
    )
  }

  
  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  addOrga_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $bezeichnung: String!
          ) {
            addOrganisation(
              bezeichnung: $bezeichnung
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          bezeichnung: value.bezeichnung
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
