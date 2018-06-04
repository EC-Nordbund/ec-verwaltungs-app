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
export default class akSelect extends select_base {
  created() {
    this.query = gql`
      query ($authToken: String!) {
        aks (authToken: $authToken) {
          akID
          bezeichnung
        }
      }
    `

    this.queryName = 'aks'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {akID: number, bezeichnung: string}) => {
      return {
        id: item.akID,
        beschreibung: item.bezeichnung
      }
    }
    
    super.created()
  }
}
</script>
