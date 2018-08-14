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
            edit 
            icon="."
            :items="[
              {
                title: `${(data.veranstaltung.unterkunft || {}).bezeichnung}`, 
                subTitle: `${(data.veranstaltung.unterkunft || {}).plz} ${(data.veranstaltung.unterkunft || {}).ort} (${(data.veranstaltung.unterkunft || {}).land})`, 
                icon: 'home'
              },
              {
                title: `min: ${data.veranstaltung.minTNAlter} max: ${data.veranstaltung.maxTNAlter}`,
                subTitle: 'Alter',
                icon: 'group'
              },
              {
                title: data.veranstaltung.maxTNAnzahl,
                subTitle: 'Anzahl Plätze',
                icon: 'group'
              },
              {
                title: data.veranstaltung.maxMaennlichTNAnzahl,
                subTitle: 'Anzahl Plätze männlich',
                icon: 'group'
              },
              {
                title: data.veranstaltung.maxWeiblichTNAnzahl,
                subTitle: 'Anzahl Plätze weiblich',
                icon: 'group'
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
                title: `${data.veranstaltung.anzahlungFruehbucher}€`,
                subTitle: 'Anzahlung Frühbucher',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.anzahlungNormal}€`,
                subTitle: 'Anzahlung Normal',
                icon: 'attach_money'
              },
              {
                title: `${data.veranstaltung.anzahlungLastMinute}€`,
                subTitle: 'Anzahlung Last Minute',
                icon: 'attach_money'
              },
              {
                title: data.veranstaltung.preisFruehbucherBis?data.veranstaltung.preisFruehbucherBis.german:'',
                subTitle: 'Frühbucher gilt bis',
                icon: 'attach_money'
              },
              {
                title: data.veranstaltung.preisLastMinuteAb?data.veranstaltung.preisLastMinuteAb.german:'',
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

import { query } from '@/graphql/index'

import { getClient } from '@/plugins/apollo'
import event from '@/plugins/eventbus'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.veranstaltungen.details.load,
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
        query: query.personen.details.load,
        variables: {
          authToken: auth.authToken,
          veranstaltungsID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data;
        (<any>this).variabels = {
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
  editKosten_show=false
  editKosten_value={}
  editKosten_save(value:any){
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  editStamm_show=false
  editStamm_value={}
  editStamm_save(value:any){
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  editAlg_show=false
  editAlg_save(value:any){
    console.log(JSON.parse(JSON.stringify(value)))
    alert('comming Soon')
  }
  // TODO: Rules
  editStamm_config=[
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
  // TODO: Rules
  editKosten_config=[
    {
      name: 'fruehbucher',
      label: 'Frühbucher',
      componentName: 'v-range-slider',
      min:0,
      max:700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'normal',
      label: 'Normal',
      componentName: 'v-range-slider',
      min:0,
      max:700,
      step: 1,
      'thumb-label': true
    },
    {
      name: 'lastMinute',
      label: 'Last Minute',
      componentName: 'v-range-slider',
      min:0,
      max:700,
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
  editAlg_config=[
    //TODO: Veranstaltungsort, Rules
    {
      name: 'vOrt',
      label: 'Veranstaltungsort (TODO)'
    },
    {
      name: 'alter',
      label: 'Alter',
      componentName: 'v-range-slider',
      min:0,
      max:100,
      step: 1,
      'thumb-label': true
    },
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
  editAlg_value={}
  data: any = { veranstaltung: {} }
  tabs = null
  created() {
    this.variabels = {
      authToken: auth.authToken,
      veranstaltungsID: this.$route.params.id
    }
    this.query = query.veranstaltungen.details.load
    super.created()
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
  editVeranstaltungsStamm_open(){
    this.editStamm_show=true
    this.editStamm_value={}
    this.editStamm_value={
      bezeichnung: this.data.veranstaltung.bezeichnung,
      begin: this.data.veranstaltung.begin.input,
      ende: this.data.veranstaltung.ende.input
    }
  }
  editAllgemeines(val:any){
    this.editAlg_show=true
    this.editAlg_value={}
    this.editAlg_value={
      vOrt: this.data.veranstaltung.unterkunft.unterkunftID,
      alter: [
        this.data.veranstaltung.minTNAlter,
        this.data.veranstaltung.maxTNAlter
      ],
      tnAnzahl: this.data.veranstaltung.maxTNAnzahl,
      tnAnzahlm: this.data.veranstaltung.maxMaennlichTNAnzahl,
      tnAnzahlw: this.data.veranstaltung.maxWeiblichTNAnzahl,
    }
  }
  editKosten(){
    this.editKosten_show=true
    this.editKosten_value={}
    this.editKosten_value={
      fruehbucher: [
        this.data.veranstaltung.anzahlungFruehbucher,
        this.data.veranstaltung.preisFruehbucher
      ],
      lastMinute: [
        this.data.veranstaltung.anzahlungLastMinute,
        this.data.veranstaltung.preisLastMinute
      ],
      normal: [
        this.data.veranstaltung.anzahlungNormal,
        this.data.veranstaltung.preisNormal
      ],
      preisFruehbucherBis: this.data.veranstaltung.preisFruehbucherBis.input,
      preisLastMinuteAb: this.data.veranstaltung.preisLastMinuteAb.input,
      kannVorortBezahltWerden: this.data.veranstaltung.kannVorortBezahltWerden
    }
  }
}
</script>
