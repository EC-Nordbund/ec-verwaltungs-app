<template>
  <div>
    <v-toolbar ripple tabs>
      <ec-router-back/>
      <v-spacer/>
      <ec-headline>
        {{data.veranstaltung.bezeichnung}}
        ({{data.veranstaltung.begin?data.veranstaltung.begin.german:''}} - {{data.veranstaltung.ende?data.veranstaltung.ende.german:''}})
      </ec-headline>
      <v-spacer/>
      <ec-edit @click="editAKStamm_show = true"/>
      <v-tabs v-model="tabs" fixed-tabs slot="extension">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>Allgemein</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>Anmeldungen</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="tab-2">
        <ec-list 
          :items="[
            {
              title: `${(data.veranstaltung.unterkunft || {}).bezeichnung}`, 
              subTitle: `${(data.veranstaltung.unterkunft || {}).plz} ${(data.veranstaltung.unterkunft || {}).ort} (${(data.veranstaltung.unterkunft || {}).land})`, 
              icon: 'home'
            },
            {title: 'Es muss erst geklärt werden welche Daten gespeichert werden!', icon: 'info'}
          ]"
          :mapper="v=>v"
          icon="map"
        />
      </v-tab-item>
      <v-tab-item id="tab-3">
        <ec-list
          :items="data.veranstaltung.anmeldungen || []"
          :mapper="item=>({
            title: `${item.person.vorname} ${item.person.nachname} (${item.person.gebDat.german})`,
            subTitle: `${item.position === 1 ? 'Teilnehmer' : ''}${item.position === 2 ? 'Mitarbeiter' : ''}${item.position === 3 ? 'Küchenmitarbeiter' : ''}${item.position === 5 ? 'Küchenleiter' : ''}${item.position === 6 ? 'Leiter' : ''}`
          })"
          icon="home"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class VeranstaltungDetails extends reloaderBase {
  data: {veranstaltung: any} = {veranstaltung: {}}
  tabs = null
  created() {
    this.query = gql`
      query($authToken: String!, $veranstaltungsID: Int!){
        veranstaltung(veranstaltungsID:$veranstaltungsID, authToken:$authToken) {
          veranstaltungsID
          bezeichnung
          begin {
            german
            input
          }
          ende {
            german
            input
          }
          unterkunft {
            unterkunftID
            bezeichnung
            strasse
            plz
            ort
            land
          }
          anmeldungen {
            anmeldeID
            person {
              personID
              vorname
              nachname
              gebDat {
                german
              }
              geschlecht
            }
            position
          }
        }
      }
    `
    this.variabels = {
      authToken: auth.authToken,
      veranstaltungsID: this.$route.params.id
    }
    super.created()
  }
}
</script>
