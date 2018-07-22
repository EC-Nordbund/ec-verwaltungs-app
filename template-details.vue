<template>
  <ec-wrapper title="*" :label="*" type="*" @share="share">

    <template slot="label">
      <ec-headline>
        *Titel (Label)*
        <ec-button-icon @click="edit*Stamm_open"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>*</v-icon>
          <v-spacer/>
          <span>*</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs" class="white">
        <v-tab-item id="tab-2">
          <v-card>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
    </template>

    <template slot="forms">
    </template>

  </ec-wrapper>
</template>
<script lang="ts">
import electron, { isElectron } from '@/plugins/electron'
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import {} from '@/plugins/formConfig/index'

import { query } from '@/graphql/index'

import { getClient } from '@/plugins/apollo'
import event from '@/plugins/eventbus'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.personen.details.load,
        variables: {
          authToken: auth.authToken,
          personID: to.params.id
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<any>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  },
  beforeRouteUpdate(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.personen.details.load,
        variables: {
          authToken: auth.authToken,
          personID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data(<any>this).variabels = {
          authToken: auth.authToken,
          personID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class * extends reloaderBase {
  data: any = { *: {} }
  tabs = null
  created() {
    this.variabels = {
      authToken: auth.authToken,
      personID: this.$route.params.id
    }
    this.query = query.*.details.load
    super.created()
  }
  share(share: (url:string)=>void) {
    share(this.$route.fullPath)
  }
}
</script>
