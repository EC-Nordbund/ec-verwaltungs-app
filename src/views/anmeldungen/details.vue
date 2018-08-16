<template>
  <ec-wrapper title="Anmeldung Details" :label="`${data.anmeldung.person.vorname} ${data.anmeldung.person.nachname} - ${data.anmeldung.veranstaltung.bezeichnung} (${data.anmeldung.veranstaltung.begin.year}) - ${['Teilnehmer','Mitarbeiter','Küche','Leiter','Hauptleiter'][data.anmeldung.position]}`" type="Anmeldung" @share="share">
    <template slot="label">
      <ec-headline>
        {{data.anmeldung.veranstaltung.bezeichnung}}: {{data.anmeldung.person.vorname}} {{data.anmeldung.person.nachname}} ({{['Teilnehmer','Mitarbeiter','Küche','Leiter','Hauptleiter'][data.anmeldung.position]}})
        <ec-button-icon @click="soon"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>info</v-icon>
          <v-spacer/>
          <span>Allgemein</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>account_circle</v-icon>
          <v-spacer/>
          <span>Person</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          <v-icon v-accent>monetization_on</v-icon>
          <v-spacer/>
          <span>Finanzen</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-5" v-secondary>
          <v-icon v-accent>arrow_drop_down_circle</v-icon>
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
             <ec-list
              :items="[
                {subTitle: 'Veranstaltung', title: `${data.anmeldung.veranstaltung.bezeichnung} (${data.anmeldung.veranstaltung.begin.german} - ${data.anmeldung.veranstaltung.ende.german})`},
                {subTitle: 'Person', title: `${data.anmeldung.person.vorname} ${data.anmeldung.person.nachname} (${data.anmeldung.person.gebDat.german})`},
                {subTitle: 'Rolle', title: ['Teilnehmer','Mitarbeiter','Küche','Leiter','Hauptleiter'][data.anmeldung.position]},
                {subTitle: 'Wartelistenplatz', title: data.anmeldung.wartelistenPlatz===0?'In Veranstaltung oder Abgemeldet':Math.abs(data.anmeldung.wartelistenPlatz)}
              ]"
              :mapper="item=>item"
              icon="info"
            />
            <v-divider/>
            <ec-list
              :items="[
                {subTitle: 'Anmeldezeitpunkt', title: (data.anmeldung.anmeldeZeitpunkt || {}).german},
                {subTitle: 'Datenschutz Zustimmung', title: (data.anmeldung.DSGVO_einverstaendnis||{}).german },
                 ...(!data.anmeldung.abmeldeZeitpunkt?[]:[{subTitle: 'Abmeldezeitpunkt', title: data.anmeldung.abmeldeZeitpunkt.german}])
              ]"
              :mapper="item=>item"
              icon="alarm"
            />
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-3">
          <v-card>
            <ec-list
              :items="[
                {subTitle: `${(data.anmeldung.adresse||{}).plz} ${(data.anmeldung.adresse||{}).ort}`, title: (data.anmeldung.adresse||{}).strasse},
                {subTitle: 'E-Mail', title: (data.anmeldung.email||{}).email},
                {subTitle: 'Telefon', title: (data.anmeldung.telefon||{}).telefon}
              ]"
              :mapper="item=>item"
              icon="chat"
              edit
              @edit="soon"
            />
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-4">
          <v-card>
            <ec-list
              :items="[
                {subTitle: 'Kosten (nach Anmeldezeitpunkt)', title: 'N/A'},
                {subTitle: 'Anzahlung (nach Anmeldezeitpunkt)', title: 'N/A'},
                {subTitle: 'Bezahlt', title: data.anmeldung.bisherBezahlt, edit: true},
                ...(!data.anmeldung.abmeldeZeitpunkt?[{subTitle: 'Noch offen [insgesamt]', title: 'N/A'}]:[])
              ]"
              :mapper="item=>item"
              icon="attach_money"
              @edit="soon"
            />
            <template v-if="data.anmeldung.abmeldeZeitpunkt">
              <v-divider/>
              <ec-list
                :items="[
                  {subTitle: 'Abmeldegebuehr (nach Abmeldezeitpunkt)', title: 'N/A'},
                  {subTitle: 'Zurückzuzahlen', title: 'N/A'},
                  {subTitle: 'Zurückbezahlt', title: data.anmeldung.rueckbezahlt, edit: true},
                  {subTitle: 'Noch offen [Bilanz insgesamt]', title: 'N/A'}
                ]"
                :mapper="item=>item"
                icon="attach_money"
                @edit="soon"
              />
            </template>
            Einige Felder müssen in der API noch hinzugefügt werden
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-5">
          <v-card>
            <ec-list
              :items="[
                {subTitle: 'Vegetarisch', title: data.anmeldung.vegetarisch?'Ja':'Nein'},
                {subTitle: 'Lebensmittel Allergien', title: data.anmeldung.lebensmittelAllergien||'N/A'},
                {subTitle: 'Gesundheitsinformationen', title: data.anmeldung.gesundheitsinformationen||'N/A'},
                {subTitle: 'Bemerkungen', title: data.anmeldung.bemerkungen||'N/A'}
              ]"
              :mapper="item=>item"
              icon="notes"
              edit
              @edit="soon"
            />
            <v-divider/>
            <ec-list
              :items="[
                {subTitle: 'Radfahren', title: data.anmeldung.radfahren?'Ja':'Nein'},
                {subTitle: 'Klettern', title: data.anmeldung.klettern?'Ja':'Nein'},
                {subTitle: 'Sich Entfenen (in 3er Gruppen)', title: data.anmeldung.sichEntfernen?'Ja':'Nein'},
                {subTitle: 'Boot-Fahren', title: data.anmeldung.bootFahren?'Ja':'Nein'},
                {subTitle: 'Schwimmen', title: 'N/A'},
                {subTitle: 'Adresse in TN-Liste', title: data.anmeldung.fahrgemeinschaften?'Ja':'Nein'}
              ]"
              :mapper="item=>item"
              icon="check_circle"
              @edit="soon"
            />
          </v-card> 
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
    </template>

    <template slot="forms">
      <ec-form
        title="Stammdaten editieren"
        :fieldConfig="[]"
        :show="false"
      />
      <ec-form
        title="Adresse editieren"
        :fieldConfig="[]"
        :show="false"
      />
      <ec-form
        title="E-Mail editieren"
        :fieldConfig="[]"
        :show="false"
      />
      <ec-form
        title="Telefon editieren"
        :fieldConfig="[]"
        :show="false"
      />
      <ec-form
        title="Kontobewegung editieren"
        :fieldConfig="[]"
        :show="false"
      />
      <ec-form
        title="Bemerkungen editieren"
        :fieldConfig="[]"
        :show="false"
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

  soon() {
    alert('Comming Soon...')
  }
}
</script>
