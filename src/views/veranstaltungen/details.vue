<template>
  <div>
    <v-toolbar ripple tabs>
      <ec-button-router-back/>
      <v-spacer/>
      <ec-headline>
        {{data.veranstaltung.bezeichnung}}
        ({{data.veranstaltung.begin?data.veranstaltung.begin.german:''}} - {{data.veranstaltung.ende?data.veranstaltung.ende.german:''}})
      </ec-headline>
      <v-spacer/>
      <ec-button-icon @click="editAKStamm_show = true"/>
      <v-tabs v-model="tabs" fixed-tabs slot="extension" color="transparent">
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
          edit 
          icon="."
          :items="[
            {
              title: `${(data.veranstaltung.unterkunft || {}).bezeichnung}`, 
              subTitle: `${(data.veranstaltung.unterkunft || {}).plz} ${(data.veranstaltung.unterkunft || {}).ort} (${(data.veranstaltung.unterkunft || {}).land})`, 
              icon: 'home'
            },
            {
              title: '100€',
              subTitle: 'Preis Frühbucher',
              icon: 'attach_money'
            },
            {
              title: '100€',
              subTitle: 'Preis Normal',
              icon: 'attach_money'
            },
            {
              title: '100€',
              subTitle: 'Preis Last Minute',
              icon: 'attach_money'
            },
            {
              title: '100€',
              subTitle: 'Anzahlung Frühbucher',
              icon: 'attach_money'
            },
            {
              title: '100€',
              subTitle: 'Anzahlung Normal',
              icon: 'attach_money'
            },
            {
              title: '100€',
              subTitle: 'Anzahlung Last Minute',
              icon: 'attach_money'
            },
            {
              title: '01.01.2000',
              subTitle: 'Frühbucher gilt bis',
              icon: 'attach_money'
            },
            {
              title: '01.01.2000',
              subTitle: 'Last Minute gilt ab',
              icon: 'attach_money'
            },
            {
              title: 'Nein',
              subTitle: 'Vorort bezahlen möglich?',
              icon: 'money_off'
            },
            {
              title: 'Aktiviert',
              subTitle: 'Warteliste Geschlechterspezifisch',
              icon: 'group'
            },
            {
              title: '50',
              subTitle: 'Anzahl Plätze',
              icon: 'group'
            },
            {
              title: '25',
              subTitle: 'Anzahl Plätze männlich',
              icon: 'group'
            },
            {
              title: '25',
              subTitle: 'Anzahl Plätze weiblich',
              icon: 'group'
            }
          ]"
          :mapper="v=>v"
        />
        <v-card>
          <v-card-text>
            <v-btn>Edit Infobrief</v-btn>
            <v-btn>Edit Bestätigungsbrief</v-btn>
          </v-card-text>
        </v-card>
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
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
@Component({})
export default class VeranstaltungDetails extends reloaderBase {
  data: { veranstaltung: any } = { veranstaltung: {} }
  tabs = null
  created() {
    this.query = gql`
      query($authToken: String!, $veranstaltungsID: Int!) {
        veranstaltung(
          veranstaltungsID: $veranstaltungsID
          authToken: $authToken
        ) {
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
