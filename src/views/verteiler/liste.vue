<template>
  <!-- Tabelle der Verteiler -->
  <ec-table
    title="Verteiler"
    itemName="Verteiler"
    :items="data.verteilerList"
    :config="tableConfig"
    suche
    @open="open">
    <!-- ADD-Button -->
    <ec-button-add @click="addVerteiler_show = true"/>
    <!-- ADD-Verteiler-Form -->
    <ec-form
      title="Verteiler hinzufügen"
      v-model="addVerteiler_show"
      :fieldConfig="addVerteiler_config"
      @save="addVerteiler_save"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'

@Component({})
export default class verteilerList extends reloaderBase {
  data:{verteilerList:Array<any>} = {verteilerList: []}
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' },
  ]
  addVerteiler_show = false
  addVerteiler_config = [
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
  open(item:any) {
      this.$router.push(`/app/verteiler/${item.verteilerID}`);
    }
  addVerteiler_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($authToken:String!, $bezeichnung:String!) {
          addVerteiler(
            authToken: $authToken,
            autoSql: "",
            bezeichnung: $bezeichnung
          )
        }
      `,
      variables: {
        bezeichnung: value.bezeichnung,
        authToken: auth.authToken,
      },
    }).then(val => val.data.addVerteiler).then((id) => {
      this.$router.push(`/app/verteiler/${id}`);
    });
  }
  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = gql`
      query($authToken: String!){
        verteilerList(authToken: $authToken) {
          verteilerID
          bezeichnung
        }
      }
    `
    super.created()
  }
}
</script>
