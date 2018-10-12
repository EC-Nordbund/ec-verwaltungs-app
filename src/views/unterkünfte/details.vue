<template>
  <ec-wrapper title="Personen Details" :label="'test'" type="Veranstaltungsort">

    <template slot="label">
      <ec-headline>
        Veranstaltungsort Details
        <ec-button-icon @click=""/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          Allgemeines
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          Kontakt
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          Veranstaltungen
        </v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs" class="white">
        <v-tab-item id="tab-2">
          <ec-list :mapper="v=>v" icon="map" :items="[
            {
              title: "EC-Ferienlager Karlsminde",
              subTitle: "Bezeichnung"
            }  
          ]"/>
        </v-tab-item>
        <v-tab-item id="tab-4">
          <v-card>
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-3">
          <v-card>
            Hier folgt eine Liste der Veranstaltungen die hier Stattfunden,.
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

import { query } from '@/graphql/index'

import { getClient } from '@/plugins/apollo'
import event from '@/plugins/eventbus'

import gql from 'graphql-tag'

const loadGQL = gql`
  
`

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
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
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
export default class PersonenDetails extends reloaderBase {
  tabs = null
}
</script>
