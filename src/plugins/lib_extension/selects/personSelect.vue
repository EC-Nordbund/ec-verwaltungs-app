<template>
  <v-select
    :items="items"
    v-model="select"
    single-line
    item-text="beschreibung" 
    item-value="id"
    v-bind="$attrs"
    autocomplete
  />
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator';
import select_base from '@/plugins/lib/formElements/selects/select'
import auth from '@/plugins/auth';

import gql from 'graphql-tag'

@Component({})
export default class personSelect extends select_base {
  created() {
    this.query = gql`
      query($authToken: String!){
        personen(authToken:$authToken){
          personID
          vorname
          nachname
          gebDat {
            german
          }
        }
      }
    `

    this.queryName = 'personen'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {personID: number, vorname: string, nachname: string, gebDat: {german: string}}) => {
      return {
        id: item.personID,
        beschreibung: `${item.vorname} ${item.nachname} (${item.gebDat.german})`
      }
    }
    
    super.created()
  }
}
</script>
