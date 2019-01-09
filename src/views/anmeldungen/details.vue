<template>
  <ec-wrapper
    title="Anmeldung Details"
    :label="`${data.anmeldung.person.vorname} ${data.anmeldung.person.nachname} - ${data.anmeldung.veranstaltung.bezeichnung} (${data.anmeldung.veranstaltung.begin.year}) - ${['Teilnehmer','Mitarbeiter','Küchenmitarbeiter','Küchenleitung','Leiter','Hauptleiter'][data.anmeldung.position-1]}`"
    type="Anmeldung"
    @share="share"
  >
    <template slot="label">
      <ec-headline>
        {{data.anmeldung.veranstaltung.bezeichnung}}: {{data.anmeldung.person.vorname}} {{data.anmeldung.person.nachname}} (
        <ec-rolle :value="data.anmeldung.position"/>)
        <!-- <ec-button-icon @click="soon"/> -->
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
        <v-tab href="#tab-6" v-secondary>
          <v-icon v-accent>arrow_drop_down_circle</v-icon>
          <v-spacer/>
          <span>Zusatz</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </template>
    <template>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tab-2">
          <v-card>
            <ec-list
              :items="[
                {subTitle: 'AnmeldeID', title: data.anmeldung.anmeldeID},
                {click: 'v', subTitle: 'Veranstaltung', title: `${data.anmeldung.veranstaltung.bezeichnung} (${data.anmeldung.veranstaltung.begin.german} - ${data.anmeldung.veranstaltung.ende.german})`},
                {click: 'p', subTitle: 'Person', title: `${data.anmeldung.person.vorname} ${data.anmeldung.person.nachname} (${data.anmeldung.person.gebDat.german})`},
                {subTitle: 'Rolle', title: ['Teilnehmer','Mitarbeiter','Küchenmitarbeiter', 'Küchenleitung','Leiter','Hauptleiter'][data.anmeldung.position-1]},
                {subTitle: 'Wartelistenplatz', title: data.anmeldung.wartelistenPlatz===0?'In Veranstaltung':(data.anmeldung.wartelistenPlatz<0?'Abgemeldet':data.anmeldung.wartelistenPlatz)}
              ]"
              :mapper="item=>item"
              icon="info"
              @click="cref"
            />
            <v-divider/>
            <ec-list
              :items="[
                {subTitle: 'Anmeldezeitpunkt', title: (data.anmeldung.anmeldeZeitpunkt || {}).german},
                {subTitle: 'Datenschutz Zustimmung', title: (data.anmeldung.DSGVO_einverstaendnis||{}).german },
                ...(!data.anmeldung.abmeldeZeitpunkt?[]:[{subTitle: 'Abmeldezeitpunkt', title: data.anmeldung.abmeldeZeitpunkt.german}]),
                {subTitle: 'Bestätigungsbrief', title: data.anmeldung.bestaetigungsBrief ? data.anmeldung.bestaetigungsBrief.german : 'Nicht versendet'},
                {subTitle: 'Infobrief', title: data.anmeldung.infoBrief ? data.anmeldung.infoBrief.german : 'Nicht versendet'}
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
                {subTitle: 'E-Mail', title: (data.anmeldung.email||{}).eMail},
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
                {title: 'Cooming Soon...'},
                {subTitle: 'Kosten (nach Anmeldezeitpunkt)', title: 'N/A'},
                {subTitle: 'Anzahlung (nach Anmeldezeitpunkt)'  , title: 'N/A'},
                {subTitle: 'Bezahlt', title: data.anmeldung.bisherBezahl},
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
                  {subTitle: 'Zurückbezahlt', title: data.anmeldung.rueckbezahlt},
                  {subTitle: 'Noch offen [Bilanz insgesamt]', title: 'N/A'}
                ]"
                :mapper="item=>item"
                icon="attach_money"
                @edit="soon"
              />
            </template>Einige Felder müssen in der API noch hinzugefügt werden
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
              @edit="bemerkungen_edit"
            />
            <v-divider/>
            <ec-list
              :items="[
                {subTitle: 'Radfahren', title: data.anmeldung.radfahren?'Ja':'Nein'},
                {subTitle: 'Klettern', title: data.anmeldung.klettern?'Ja':'Nein'},
                {subTitle: 'Sich Entfenen (in 3er Gruppen)', title: data.anmeldung.sichEntfernen?'Ja':'Nein'},
                {subTitle: 'Boot-Fahren', title: data.anmeldung.bootFahren?'Ja':'Nein'},
                {subTitle: 'Schwimmen', title: ['Nicht erlaubt', 'Nichtschwimmer', 'Mittelmäßig', 'Gut'][data.anmeldung.schwimen]},
                {subTitle: 'Adresse in TN-Liste', title: data.anmeldung.fahrgemeinschaften?'Ja':'Nein'}
              ]"
              :mapper="item=>item"
              icon="check_circle"
              @edit="soon"
            />
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-6">
          <v-card>Comming Soon
            <!-- <v-treeview item-key="name" :open="[]"  open-on-click v-model="tree" activatable :items="test_2(data.anmeldung.extra_json)">
              <template slot="prepend" slot-scope="props">
                <v-icon v-if="props.item.children">
                  {{ props.open ? 'folder_open' : 'folder' }}
                </v-icon>
              </template>
            </v-treeview>-->
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
      <!-- <v-btn @click="soon" v-if="data.anmeldung.wartelistenPlatz == 0 && !data.anmeldung.abmeldeZeitpunkt">Abmelden</v-btn> -->
      <!-- <v-btn @click="soon">Verschieben</v-btn> -->
      <!-- <v-btn @click="soon">Aus Warteliste entfernen</v-btn> -->
      <v-btn @click="nachruecken" v-if="data.anmeldung.wartelistenPlatz > 0">Nachrücken</v-btn>
      <!-- <v-btn @click="soon">Zahlung</v-btn> -->
      <v-btn @click="createLetter">(Workaround) Brief generieren</v-btn>
      <v-btn v-if="!data.anmeldung.bestaetigungsBrief" @click="bestaetigungsbrief">(Workaround) Bestätigungsbrief gesendet</v-btn>
      <v-btn v-if="!data.anmeldung.infoBrief" @click="infobrief">(Workaround) Infobrief gesendet</v-btn>
    </template>

    <template slot="forms">
      <ec-form title="Abmelden" :fieldConfig="[]" :show="false"/>
      <ec-form title="Kontaktdaten editieren" :fieldConfig="[]" :show="false"/>
      <ec-form
        title="Bemerkungen editieren"
        :fieldConfig="bemerkungen_config"
        v-model="bemerkungen_show"
        :value="bemerkungen_value"
        @save="bemerkungen_save"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import gql from 'graphql-tag'
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import {} from '@/realPlugins/formConfig'


import event from '@/plugins/eventbus'

import { jsZip, Docxtemplater } from '@/plugins/docx'

const loadGQL = gql`
  query($authToken: String!, $anmeldeID: String!) {
    anmeldung(
      authToken: $authToken
      anmeldeID: $anmeldeID
    ) {
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
      veranstaltung {
        veranstaltungsID
        bezeichnung
        begin {
          input
          german
          year
        }
        ende {
          input
          german
        }
      }
      position
      adresse {
        adressID
        strasse
        plz
        ort
      }
      email {
        eMailID
        eMail
      }
      telefon {
        telefonID
        telefon
      }
      wartelistenPlatz
      bisherBezahlt
      anmeldeZeitpunkt {
        german
      }
      abmeldeZeitpunkt {
        german
      }
      abmeldeGebuehr
      wegDerAbmeldung
      rueckbezahlt
      kommentarAbmeldung
      vegetarisch
      lebensmittelAllergien
      gesundheitsinformationen
      bemerkungen
      radfahren
      fahrgemeinschaften
      klettern
      sichEntfernen
      bootFahren
      schwimmen
      DSGVO_einverstaendnis {
        german
      }
      bestaetigungsBrief {
        german
      }
      infoBrief {
        german
      }
      extra_json
    }
  }
`
import {getClient} from '@/realPlugins/apollo'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
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
        query: loadGQL,
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
  bemerkungen_value: any = {}
  bemerkungen_edit() {
    this.bemerkungen_value = {}
    this.bemerkungen_value = {
      vegetarisch: this.data.anmeldung.vegetarisch,
      lebensmittelAllergien: this.data.anmeldung
        .lebensmittelAllergien,
      gesundheitsinformationen: this.data.anmeldung
        .gesundheitsinformationen,
      bemerkungen: this.data.anmeldung.bemerkungen
    }
    this.bemerkungen_show = true
  }
  bemerkungen_config = [
    {
      name: 'vegetarisch',
      label: 'Verpflegung',
      componentName: 'v-select',
      items: [
        { text: 'Vegetarisch', value: true },
        { text: 'Normal', value: false }
      ]
    },
    {
      name: 'lebensmittelAllergien',
      label: 'Lebensmittelallergien',
      componentName: 'v-textarea'
    },
    {
      name: 'gesundheitsinformationen',
      label: 'Gesundheitsinformationen',
      componentName: 'v-textarea'
    },
    {
      name: 'bemerkungen',
      label: 'Bemerkungen',
      componentName: 'v-textarea'
    }
  ]
  bemerkungen_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $anmeldeID: String!
            $vegetarisch: Boolean!
            $gesundheitsinformationen: String!
            $bemerkungen: String!
            $lebensmittelAllergien: String!
          ) {
            anmeldungBesonderheiten(
              authToken: $authToken
              anmeldeID: $anmeldeID
              vegetarisch: $vegetarisch
              gesundheitsinformationen: $gesundheitsinformationen
              bemerkungen: $bemerkungen
              lebensmittelAllergien: $lebensmittelAllergien
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          anmeldeID: this.$route.params.id,
          ...value
        }
      })
      .then(this.refetch)
  }
  bemerkungen_show = false
  tree = []
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
    this.query = loadGQL
    super.created()
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }

  soon() {
    alert('Comming Soon...')
  }

  nachruecken() {
    if (
      confirm(
        'Sicher, dass die Person Nachrücken soll?\n\n Die Person hat also bestätigt, dass sie Nachrücken kann.'
      )
    ) {
      this.$apollo.mutate({
        mutation: gql`
          mutation(
            $anmeldeID: String!
            $authToken: String!
          ) {
            nachruecken(
              anmeldeID: $anmeldeID
              authToken: $authToken
            )
          }
        `,
        variables: {
          anmeldeID: this.data.anmeldung.anmeldeID,
          authToken: auth.authToken
        }
      })
    }
  }

  test(json: any): Array<any> {
    return Object.keys(json).map(key => {
      if (typeof json[key] === 'object') {
        return { name: key, children: this.test(json[key]) }
      } else {
        return { name: `${key}: ${json[key]}` }
      }
    })
  }
  test_2(json: string = '{}') {
    return this.test(JSON.parse(json))
  }
  cref(item: any) {
    if (item.click == 'v') {
      this.$router.push(
        '/app/veranstaltungen/' +
          this.data.anmeldung.veranstaltung.veranstaltungsID
      )
    }
    if (item.click == 'p') {
      this.$router.push(
        '/app/personen/' +
          this.data.anmeldung.person.personID
      )
    }
  }

  createLetter() {
    const filenames = this.$require.electron.remote.dialog.showOpenDialog(
      {
        title: 'Word Datei des Briefes auswählen',
        filters: [{ name: 'Word', extensions: ['docx'] }],
        properties: ['openFile']
      }
    )
    if (filenames) {
      const fs = this.$require.fs
      const file = filenames[0]
      const fileContent = fs.readFileSync(file, 'binary')
      const zipData = new jsZip(fileContent)
      const briefTemplate = new Docxtemplater()
      briefTemplate.loadZip(zipData)
      briefTemplate.setData(
        this.manageData(this.data.anmeldung)
      )
      briefTemplate.render()
      const fertigerBrief = briefTemplate
        .getZip()
        .generate({ type: 'nodebuffer' })

      const tmpPath = this.$require.electron.remote.app
        .getPath('temp')
        .split('\\')
        .join('/')
      const tmpFile =
        tmpPath +
        '/' +
        Math.random()
          .toString(36)
          .substring(7) +
        '.docx'
      fs.writeFileSync(tmpFile, fertigerBrief)
      eval(
        `require('child_process').exec('start ${tmpFile}')`
      )
    } else {
      alert('Kein Brief ausgewählt.')
    }
  }

  manageData(data: any) {
    const nData: any = {}
    Object.keys(data).forEach(key => {
      if (data[key] && typeof data[key] === 'object') {
        const rec = this.manageData(data[key])
        Object.keys(rec).forEach(nKey => {
          nData[key + '.' + nKey] = rec[nKey]
        })
      } else {
        nData[key] = data[key]
      }
    })
    return nData
  }

  bestaetigungsbrief(){
    this.$apollo.mutate({
      mutation: gql`
        mutation($anmeldeID: String!, $authToken: String!) {
          anmeldungBestaetigungsbrief(anmeldeID: $anmeldeID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: auth.authToken,
        anmeldeID: this.$route.params.id
      }
    })
  }
  infobrief(){
    this.$apollo.mutate({
      mutation: gql`
        mutation($anmeldeID: String!, $authToken: String!) {
          anmeldunginfobrief(anmeldeID: $anmeldeID, authToken: $authToken)
        }
      `,
      variables: {
        authToken: auth.authToken,
        anmeldeID: this.$route.params.id
      }
    })
  }
}
</script>
