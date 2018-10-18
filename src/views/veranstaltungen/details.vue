<template>
  <ec-wrapper title="Veranstaltungs Details" :label="`${data.veranstaltung.bezeichnung} (${data.veranstaltung.begin?data.veranstaltung.begin.german:''} - ${data.veranstaltung.ende?data.veranstaltung.ende.german:''})`" type="Veranstaltung" @share="share">

    <template slot="label">
      <ec-headline>
        {{data.veranstaltung.bezeichnung}}
        ({{data.veranstaltung.begin?data.veranstaltung.begin.german:''}} - {{data.veranstaltung.ende?data.veranstaltung.ende.german:''}})
        <ec-button-icon @click="editVeranstaltungsStamm_open"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-1" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>Allgemein</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>Kosten</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>Anmeldungen</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs" class="white">
        <v-tab-item id="tab-1">
          <ec-list
            icon="."
            :items="[
              {
                title: `${(data.veranstaltung.veranstaltungsort || {}).bezeichnung}`, 
                subTitle: `${(data.veranstaltung.veranstaltungsort || {}).plz} ${(data.veranstaltung.veranstaltungsort || {}).ort} (${(data.veranstaltung.veranstaltungsort || {}).land})`, 
                icon: 'home'
              },
              {
                title: `min: ${data.veranstaltung.minTNAlter} max: ${data.veranstaltung.maxTNAlter}`,
                subTitle: 'Alter',
                icon: 'group'
              },
              {
                title: data.veranstaltung.anzahlPlaetze ? data.veranstaltung.anzahlPlaetze : 'N/A',
                subTitle: 'Anzahl Plätze',
                icon: 'group',
                edit: true
              },
              {
                title: data.veranstaltung.anzahlPlaetzeM ? data.veranstaltung.anzahlPlaetzeM : 'N/A',
                subTitle: 'Anzahl Plätze männlich',
                icon: 'group',
                edit: true
              },
              {
                title: data.veranstaltung.anzahlPlaetzeW ? data.veranstaltung.anzahlPlaetzeW : 'N/A',
                subTitle: 'Anzahl Plätze weiblich',
                icon: 'group',
                edit: true
              }
            ]"
            :mapper="v=>v"
            @edit="editAllgemeines"
          />
        </v-tab-item>
        <v-tab-item id="tab-2">
          <ec-list
            edit 
            @edit="editKosten"
            icon="."
            :items="[
              {
                title: `${data.veranstaltung.preisFruehbucher}€`,
                subTitle: 'Preis Frühbucher',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.preisNormal}€`,
                subTitle: 'Preis Normal',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.preisLastMinute}€`,
                subTitle: 'Preis Last Minute',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.preisAnzahlungFruehbucher}€`,
                subTitle: 'Anzahlung Frühbucher',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.preisAnzahlungNormal}€`,
                subTitle: 'Anzahlung Normal',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.preisAnzahlungLastMinute}€`,
                subTitle: 'Anzahlung Last Minute',
                icon: 'attach_money'
              },
              {
                title: data.veranstaltung.fruehbucherBis?data.veranstaltung.fruehbucherBis.german:'N/A',
                subTitle: 'Frühbucher gilt bis',
                icon: 'attach_money'
              },
              {
                title: data.veranstaltung.lastMinuteAb?data.veranstaltung.lastMinuteAb.german:'N/A',
                subTitle: 'Last Minute gilt ab',
                icon: 'attach_money'
              },
              {
                title: data.veranstaltung.kannVorortBezahltWerden?'Ja':'Nein',
                subTitle: 'Vorort bezahlen möglich?',
                icon: 'money_off'
              }
            ]"
            :mapper="v=>v"
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
    </template>

    <template slot="actions">
      <v-dialog max-width="290px">
        <v-btn slot="activator">TN-Liste generieren</v-btn>
        <v-card>
          <v-card-title>
            <h1>TN-Liste generieren</h1>
          </v-card-title>
          <v-card-text>
            <v-btn @click="soon">Leiter + Zuschüsse</v-btn>
            <v-btn @click="soon">Küchenmitarbeiter</v-btn>
            <v-btn @click="soon">Mitarbeiter</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog max-width="290px">
        <v-btn slot="activator">TN-Listen-Template Hochladen</v-btn>
        <v-card>
          <v-card-title>
            <h1>TN-Listen-Template Hochladen</h1>
          </v-card-title>
          <v-card-text>
            <v-btn @click="soon">Leiter + Zuschüsse</v-btn>
            <v-btn @click="soon">Küchenmitarbeiter</v-btn>
            <v-btn @click="soon">Mitarbeiter</v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog max-width="440px">
        <v-btn slot="activator">Briefe bearbeiten</v-btn>
        <v-card>
          <v-card-title>
            <h1>Briefe bearbeiten</h1>
          </v-card-title>
          <v-tabs centered icons-and-text>
            <v-tabs-slider/>
            <v-tab href="#tab-1">
              Bestätigungsbrief
              <v-icon>phone</v-icon>
            </v-tab>

            <v-tab href="#tab-2">
              Infobrief
              <v-icon>favorite</v-icon>
            </v-tab>

            <v-tab-item
              v-for="i in 2"
              :id="'tab-' + i"
              :key="i"
            >
              <v-card flat>
                <v-card-text>
                  <v-form>
                    <!-- Has no file -->
                    <template v-if="Math.random()>0.5">
                      <v-btn @click="soon">
                        Datei auswählen 
                      </v-btn>
                    </template>
                    <template v-else>
                      <v-btn @click="soon">
                        Neue Datei wählen
                      </v-btn>
                      <v-btn @click="soon">
                        Akltuelle Datei öffnen
                      </v-btn>
                    </template>
                  </v-form>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-dialog>
    </template>

    <template slot="forms">
      <ec-form
        title="Stammdaten editieren"
        v-model="editStamm_show"
        @save="editStamm_save"
        :fieldConfig="editStamm_config"
        :value="editStamm_value"
      />

      <ec-form
        title="Allgemeines editieren"
        v-model="editAlg_show"
        @save="editAlg_save"
        :fieldConfig="editAlg_config"
        :value="editAlg_value"
      />

      <ec-form
        title="Preise editieren"
        v-model="editKosten_show"
        @save="editKosten_save"
        :fieldConfig="editKosten_config"
        :value="editKosten_value"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import electron, { isElectron } from '@/plugins/electron'
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import {} from '@/plugins/formConfig/index'

import { getClient } from '@/plugins/apollo'
import event from '@/plugins/eventbus'

import gql from 'graphql-tag'

const loadGQL = gql`
  query($authToken: String!, $veranstaltungsID: Int!) {
    veranstaltung(
      authToken: $authToken
      veranstaltungsID: $veranstaltungsID
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
      minTNAlter
      maxTNAlter
      anzahlPlaetze
      anzahlPlaetzeW
      anzahlPlaetzeM
      preisNormal
      preisLastMinute
      preisFruehbucher
      fruehbucherBis {
        german
        input
      }
      lastMinuteAb {
        german
        input
      }
      preisAnzahlungNormal
      preisAnzahlungLastMinute
      preisAnzahlungFruehbucher
      kannVorortBezahltWerden
      hatGWarteliste
      veranstaltungsort {
        vOrtID
        bezeichnung
        plz
        ort
        land
      }
      anmeldungen {
        anmeldeID
        position
        person {
          vorname
          nachname
          gebDat {
            german
          }
        }
      }
    }
  }
`

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken,
          veranstaltungsID: to.params.id
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
        query: loadGQL,
        variables: {
          authToken: auth.authToken,
          veranstaltungsID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
          authToken: auth.authToken,
          veranstaltungsID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class veranstaltungsDetails extends reloaderBase {
  editKosten_show = false
  editKosten_value: any = {}
  editKosten_save(value: any) {
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  editStamm_show = false
  editStamm_value = {}
  editStamm_save(value: any) {
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  editAlg_show = false
  editAlg_save(value: any) {
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  // TODO: Rules
  editStamm_config = [
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
    },
    {
      name: 'vOrtID',
      label: 'Veranstaltungsort (TODO)'
    },
    {
      name: 'minTNAlter',
      label: 'Minimales TN Alter',
      componentName: 'v-slider',
      min: 0,
      max: 300,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'maxTNAlter',
      label: 'Maximale TN Alter',
      componentName: 'v-slider',
      min: 0,
      max: 300,
      step: 1,
      'thumb-label': true
    }
  ]
  // TODO: Rules
  editKosten_config = [
    {
      name: 'preisFruehbucher',
      label: 'Frühbucher',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisNormal',
      label: 'Normal',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisLastMinute',
      label: 'Last Minute',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisAnzahlungFruehbucher',
      label: 'Anzahlung Frühbucher',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisAnzahlungNormal',
      label: 'Anzahlung Normal',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisAnzahlungLastMinute',
      label: 'Anzahlung Last Minute',
      componentName: 'v-slider',
      min: 0,
      max: 700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'preisFruehbucherBis',
      label: 'Frühbucher bis',
      componentName: 'ec-form-datePicker'
    },
    {
      name: 'preisLastMinuteAb',
      label: 'Last Minute ab',
      componentName: 'ec-form-datePicker'
    },
    {
      name: 'kannVorortBezahltWerden',
      label: 'Vorortzahlung möglich?',
      componentName: 'v-switch'
    }
  ]
  editAlg_config = [
    {
      name: 'tnAnzahl',
      label: 'Anzahl Teilnehmer',
      componentName: 'v-slider',
      min: 0,
      max: 300,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'tnAnzahlM',
      label: 'Max. Anzahl TN männlich',
      componentName: 'v-slider',
      min: 0,
      max: 300,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'tnAnzahlW',
      label: 'Max. Anzahl TN weiblich',
      componentName: 'v-slider',
      min: 0,
      max: 300,
      step: 1,
      'thumb-label': true
    }
  ]
  editAlg_value: any = {
    alter: [0, 0]
  }
  data: any = { veranstaltung: {} }
  tabs = null
  created() {
    this.variabels = {
      authToken: auth.authToken,
      veranstaltungsID: this.$route.params.id
    }
    this.query = loadGQL
    super.created()
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
  editVeranstaltungsStamm_open() {
    this.editStamm_show = true
    this.editStamm_value = {}
    this.editStamm_value = {
      ...this.data.veranstaltung,
      begin: this.data.veranstaltung.begin.input,
      ende: this.data.veranstaltung.ende.input,
      vOrtID: this.data.veranstaltung.veranstaltungsort
        .vOrtID
    }
  }
  editAllgemeines(val: any) {
    this.editAlg_show = true
    this.editAlg_value = {}
    this.editAlg_value = {
      ...this.data.veranstaltung
    }
  }
  editKosten() {
    this.editKosten_show = true
    this.editKosten_value = {}
    this.editKosten_value = {
      ...this.data.veranstaltung,
      preisFruehbucherBis: this.data.veranstaltung
        .fruehbucherBis.input,
      preisLastMinuteAb: this.data.veranstaltung
        .lastMinuteAb.input,
      kannVorortBezahltWerden: this.data.veranstaltung
        .kannVorortBezahltWerden
    }
  }
  soon() {
    alert('comming soon')
  }
}
</script>
