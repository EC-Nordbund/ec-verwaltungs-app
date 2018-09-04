<template>
  <ec-table title="Veranstaltungen" itemName="Veranstaltungen" :items="data.veranstaltungen" :config="tableConfig" suche @open="open" @sucheChanged="suchStringUpdate" :sucheVal="suchstring">
    <ec-button-add @click="addVeranstaltung_show = true" v-if="auth.isMutationAllowed('addVeranstaltung')"/>
    <ec-form
      title="Veranstatung hinzufügen"
      v-model="addVeranstaltung_show"
      :fieldConfig="addVeranstaltung_config"
      @save="addVeranstaltung_save"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

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
        query: query.veranstaltungen.liste.load,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<VeranstaltungsListe>vm).data = v.data
           setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class VeranstaltungsListe extends reloaderBase {
  xButtonLogik = xButtonLogik
  suchstring: string = ''
  addVeranstaltung_show: boolean = false
  //TODO: Rules
  addVeranstaltung_config = [
    {
      name: 'bezeichnung',
      label: 'Bezeichnung',
      counter: 50
    },
    {
      name: 'begin',
      label: 'Begin',
      componentName: 'ec-form-datePicker'
    },
    {
      name: 'ende',
      label: 'Ende',
      componentName: 'ec-form-datePicker'
    }
  ]
  addVeranstaltung_save(value:any) {
    alert('Comming Soon...')
  }

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

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
    this.query = query.veranstaltungen.liste.load
    this.variabels = {
      authToken: auth.authToken
    }
    this.suchstring = this.$route.query.suche || ''
    super.created()
  }

  open(item: any) {
    this.$router.push(
      `/app/veranstaltungen/${item.veranstaltungsID}`
    )
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
  }
}
</script>
