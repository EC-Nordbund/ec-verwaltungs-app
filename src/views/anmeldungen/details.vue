<template>
  <ec-wrapper title="Anmeldung Details" :label="`${data.anmeldung.person.vorname} ${data.anmeldung.person.nachname} (${data.anmeldung.person.gebDat.german}) - ${data.anmeldung.veranstaltung.bezeichnung} (${data.anmeldung.veranstaltung.begin.year}) - ${['Teilnehmer','Mitarbeiter','Küche','Leiter','Hauptleiter'][data.anmeldung.position]}`" type="Anmeldung" @share="share">

    <template slot="label">
      <ec-headline>
        {{data.anmeldung.veranstaltung.bezeichnung}} - {{data.anmeldung.person.vorname}} {{data.anmeldung.person.nachname}} - {{['Teilnehmer','Mitarbeiter','Küche','Leiter','Hauptleiter'][data.anmeldung.position]}}
        <ec-button-icon @click=""/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>assignment_ind</v-icon>
          <v-spacer/>
          <span>Allgemein</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>Kontaktdaten</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          <v-icon v-accent>attach_money</v-icon>
          <v-spacer/>
          <span>Geld</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-5" v-secondary>
          <v-icon v-accent>extension</v-icon>
          <v-spacer/>
          <span>Sonstiges</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs" class="white">
        <v-tab-item id="tab-2">
          <v-card>
            {{data}}
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-3">
          <v-card>
            {{data}}
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-4">
          <v-card>
            {{data}}
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-5">
          <v-card>
            {{data}}
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
        query: query.anmeldungen.details.load,
        variables: {
          authToken: auth.authToken,
          anmeldeID: to.params.id
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
        query: query.anmeldungen.details.load,
        variables: {
          authToken: auth.authToken,
          anmeldeID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
          authToken: auth.authToken,
          anmeldeID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class anmeldungsDetails extends reloaderBase {
  data: any = {
    anmeldung: {
      person: { gebDat: {} },
      veranstaltung: { begin: {}, ende: {} }
    }
  }
  tabs = null
  created() {
    this.variabels = {
      authToken: auth.authToken,
      anmeldeID: this.$route.params.id
    }
    this.query = query.anmeldungen.details.load
    super.created()
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
}
</script>
