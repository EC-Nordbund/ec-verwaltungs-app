<template>
  <!-- Tabelle der Verteiler -->
  <ec-table
    title="Verteiler"
    itemName="Verteiler"
    :items="data.verteilerList"
    :config="tableConfig"
    suche
    @open="open"
    @sucheChanged="suchStringUpdate" 
    :sucheVal="suchstring">
    <!-- ADD-Button -->
    <ec-button-add @click="addVerteiler_show = true" v-if="auth.isMutationAllowed('verteilerList')"/>
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
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import {
  vornameConfig,
  nachnameConfig,
  gebDatConfig,
  geschlechtConfig
} from '@/plugins/formConfig/index'

import auth from '@/plugins/auth'

import xButtonLogik from '@/plugins/xButton/logic'
import event from '@/plugins/eventbus'
import { query } from '@/graphql/index'
import { getClient } from '@/plugins/apollo'


@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.verteiler.liste.load,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<verteilerList>vm).data = v.data
           setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
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

  xButtonLogik = xButtonLogik

  open(item:any) {
     this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/verteiler/${item.verteilerID}`);
  }


  addVerteiler_save(value:any) {
    this.$apollo
      .mutate({
        mutation: query.verteiler.liste.addVerteiler,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(val => val.data.addVerteiler)
      .then((id) => {
      this.$router.push(`/app/verteiler/${id}`);
    });
  }
  
  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = query.verteiler.liste.load
    this.suchstring = this.$route.query.suche || ''
    super.created()
  }
}
</script>
