<template>
  <ec-table
    title="*"
    itemName="*"
    :items="data.*"
    :config="tableConfig"
    suche
    @open="open"
    @sucheChanged="suchStringUpdate" 
    :sucheVal="suchstring">
    <ec-button-add @click="add*_show = true" v-if="auth.isMutationAllowed('*')"/>
    <ec-form
      title="* hinzufügen"
      v-model="add*_show"
      :fieldConfig="add*_config"
      @save="add*_save"
    />
  </ec-table>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import { } from '@/plugins/formConfig/index'

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
        query: query.*.liste.load,
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
  data: { verteilerList: Array<any> } = {
    verteilerList: []
  }
  tableConfig = [
    { name: 'bezeichnung', label: 'Bezeichnung', width: '...', handleOutside: true }
  ]
  add*_show = false
  add*_config = []

  xButtonLogik = xButtonLogik

  open(item: any) {
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/*/${item.*}`)
  }

  add*_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.*.liste.*,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(val => val.data.addVerteiler)
      .then(id => {
        this.$router.push(`/app/*/${id}`)
      })
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
