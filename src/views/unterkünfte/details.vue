<template>
  <div>
    <v-toolbar ripple extension-height="72px">
      <v-spacer/>
      <ec-headline>{{data.unterkunft.bezeichnung}}{{data.unterkunft.land !== 'Deutschland' ? ` (${data.unterkunft.land})`:''}}</ec-headline>
      <v-spacer/>
      <ec-button-icon/>
    </v-toolbar>
    <ec-list :items="[{title: 'Es muss erst geklärt werden welche Daten gespeichert werden!'}]" :mapper="item=>item" icon="info"/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class unterkunftDetails extends reloaderBase {
  data: { unterkunft: any } = { unterkunft: {} }
  created() {
    this.query = gql`
      query($authToken: String!, $unterkunftID: Int!) {
        unterkunft(
          unterkunftID: $unterkunftID
          authToken: $authToken
        ) {
          unterkunftID
          bezeichnung
          strasse
          plz
          ort
          land
        }
      }
    `
    this.variabels = {
      authToken: auth.authToken,
      unterkunftID: this.$route.params.id
    }
    super.created()
  }
}
</script>
