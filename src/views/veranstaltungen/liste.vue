<template>
  <ec-table title="Veranstaltungen" itemName="Veranstaltungen" :items="data.veranstaltungen" :config="tableConfig" suche @open="open">
    <ec-button-add/>
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class VeranstaltungsListe extends reloaderBase {
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
    { name: 'unterkunft.bezeichnung', label: 'Unterkunft' }
  ]
  created() {
    this.query = gql`
      query($authToken: String!) {
        veranstaltungen(authToken: $authToken) {
          veranstaltungsID
          bezeichnung
          begin {
            german
          }
          ende {
            german
          }
          unterkunft {
            bezeichnung
          }
        }
      }
    `
    this.variabels = {
      authToken: auth.authToken
    }
    super.created()
  }

  open(item: any) {
    this.$router.push(
      `/app/veranstaltungen/${item.veranstaltungsID}`
    )
  }
}
</script>
