<template>
  <ec-table title="Unterkünfte" itemName="Unterkünfte" :items="data.unterkuenfte" :config="tableConfig" suche @open="open">
    <ec-button-add/>
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class UnterkunftListe extends reloaderBase {
  data: {unterkuenfte: Array<any>} = {
    unterkuenfte: []
  }
  tableConfig = [
      { name: 'bezeichnung', label: 'Bezeichnung' },
      { name: 'plz', label: 'PLZ' },
      { name: 'ort', label: 'Ort' },
      { name: 'land', label: 'Land' }
    ]
  open(item:any) {
    this.$router.push(`/app/unterkünfte/${item.unterkunftID}`);
  }

  created () {
    this.query = gql`
      query($authToken: String!){
        unterkuenfte(authToken: $authToken) {
          unterkunftID
          bezeichnung
          plz
          ort
          land
        }
      }
    `
    this.variabels = {
      authToken: auth.authToken
    }
    super.created()
  }
}
</script>
