<template>
  <ec-table title="Arbeitskreise" itemName="Arbeitskreise" :items="data.aks" :config="tableConfig" suche @open="open">
    <ec-button-add @click="showAddAk = true"/>
    <ec-form v-model="showAddAk" title="Arbeitskreis hinzufügen" :fieldConfig="fieldConfig" @save="save"/>
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class AKListe extends reloaderBase {
  data = {
    aks: []
  }
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' },
  ]
  showAddAk = false
  fieldConfig = [
    {
      label: 'Bezeichnung',
      name: 'bezeichnung',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst eine Bezeichnung angeben!' : true),
        (v:string) => (v && v.length > 50 ? 'Die Bezeichnung darf nicht länger als 50 Zeichen sein!' : true),
      ],
      counter: 50,
    },
  ]
  save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($bezeichnung: String!,$authToken: String!) {
          addAK(
            authToken: $authToken,
            bezeichnung: $bezeichnung
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        bezeichnung: value.bezeichnung,
      },
    }).then(v => v.data.addAK).then((akID:number) => {
      this.$router.push(`/app/arbeitskreise/${akID}`);
    });
  }
  open($event:any) {
    this.$router.push(`/app/arbeitskreise/${$event.akID}`);
  }
  created(){
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = gql`
      query($authToken: String!){
        aks(authToken:$authToken){
          akID,
          bezeichnung
        }
      }
    `
    super.created()
  }
}
</script>