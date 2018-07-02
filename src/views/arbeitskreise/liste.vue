<template>
  <ec-table title="Arbeitskreise" itemName="Arbeitskreise" :items="data.aks" :config="tableConfig" suche @open="open">
    <ec-button-add @click="showAddAk = true" v-if="auth.isMutationAllowed('addAK')"/>
    <ec-form v-model="showAddAk" title="Arbeitskreis hinzufügen" :fieldConfig="fieldConfig" @save="save"/>
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader';
import gql from 'graphql-tag';

import {bezeichnungConfig} from '@/plugins/formConfig/index'

import {query} from '@/graphql/index';

import auth from '@/plugins/auth';
@Component({})
export default class AKListe extends reloaderBase {
  data = {
    aks: []
  };
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung' }
  ];
  showAddAk = false;
  fieldConfig = [
    bezeichnungConfig
  ];
  save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.ak.liste.addAK,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(v => v.data.addAK)
      .then((akID: number) => {
        this.$router.push(`/app/arbeitskreise/${akID}`);
      });
  }
  open($event: any) {
    this.$router.push(`/app/arbeitskreise/${$event.akID}`);
  }
  created() {
    this.variabels = {
      authToken: auth.authToken
    };
    this.query = query.ak.liste.load;
    super.created();
  }
}
</script>