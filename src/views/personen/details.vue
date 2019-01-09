<template>
  <ec-wrapper
    title="Personen Details"
    :label="data.person.vorname ? `${data.person.vorname} ${data.person.nachname} (${data.person.gebDat.german})` : ''"
    type="Person"
    @share="share"
  >
    <template slot="label">
      <ec-headline>
        <v-avatar
          :style="{ background: (data.person.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }"
        >
          <span
            class="headline"
            v-white
          >{{(data.person.vorname || ' ')[0].toUpperCase()}}{{(data.person.nachname || ' ')[0].toUpperCase()}}</span>
        </v-avatar>
        {{data.person.vorname || ''}} {{data.person.nachname || ''}} ({{data.person.gebDat ? data.person.gebDat.german : ''}})
        <ec-button-icon @click="editPersonStamm_open"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>Kontaktdaten</v-tab>
        <v-tab href="#tab-3" v-secondary>Veranstaltungen</v-tab>
        <v-tab href="#tab-4" v-secondary>Sonstiges</v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs" class="white">
        <v-tab-item id="tab-2">
          <v-card>
            <!-- Adressen -->
            <ec-list
              :items="data.person.adressen || []"
              :mapper="item=>({title: item.strasse, subTitle: item.plz + ' ' + item.ort, marked:item.isOld, isDeprecated: item.isOld, toolTip: `Letzte Nutzung: ${item.lastUsed.german}`})"
              icon="location_on"
              @edit="editAdresse_open"
              @click="showMap"
              :edit="auth.isMutationAllowed('editKontakt')"
              markedClass="isOld"
            />
            <v-divider v-if="(data.person.adressen || []).length > 0"/>
            <!-- Email -->
            <ec-list
              :items="data.person.emails || []"
              :mapper="item=>({title: item.eMail, marked:item.isOld, isDeprecated: item.isOld, toolTip: `Letzte Nutzung: ${item.lastUsed.german}`})"
              icon="mail"
              :edit="auth.isMutationAllowed('editKontakt')"
              @edit="editEmail_open"
              @click="mailto"
              markedClass="isOld"
            />
            <v-divider v-if="(data.person.emails || []).length > 0"/>
            <!-- Telefone -->
            <ec-list
              :items="data.person.telefone || []"
              :mapper="item=>({title: item.telefon, marked:item.isOld, isDeprecated: item.isOld, toolTip: `Letzte Nutzung: ${item.lastUsed.german}`})"
              icon="local_phone"
              :edit="auth.isMutationAllowed('editKontakt')"
              @edit="editTelefon_open"
              markedClass="isOld"
            />
            <!-- Add Adresse, Email, Telefon -->
            <v-card-actions>
              <v-spacer/>
              <v-btn
                flat
                @click="addAdresse_show = true"
                v-if="auth.isMutationAllowed('addKontakt')"
              >
                <v-icon>add</v-icon>Adresse
              </v-btn>
              <v-btn flat @click="addEmail_show = true" v-if="auth.isMutationAllowed('addKontakt')">
                <v-icon>add</v-icon>Email
              </v-btn>
              <v-btn
                flat
                @click="addTelefon_show = true"
                v-if="auth.isMutationAllowed('addKontakt')"
              >
                <v-icon>add</v-icon>Telefon
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
        <v-tab-item id="tab-3">
          <!-- Anmeldungen -->
          <ec-list
            :items="data.person.anmeldungen || []"
            :mapper="item=>({
              title: `${item.veranstaltung.bezeichnung} (${item.veranstaltung.begin.german} - ${item.veranstaltung.ende.german})`,
              subTitle: `${item.position === 1 ? 'Teilnehmer' : ''}${item.position === 2 ? 'Mitarbeiter' : ''}${item.position === 3 ? 'Küchenmitarbeiter' : ''}${item.position === 4 ? 'Leiter' : ''}${item.position === 5 ? 'Hauptleiter' : ''}`
            })"
            @click="item=>$router.push('/app/anmeldungen/'+item.anmeldeID)"
            icon="local_phone"
          />
        </v-tab-item>
        <v-tab-item id="tab-4">
          <v-card>
            <v-expansion-panel>
              <v-expansion-panel-content
                ripple
                lazy
                v-if="(data.person.ak || []).filter(item=>(item.currentStatus > 0)).length > 0"
              >
                <div slot="header">Aktuelle Arbeitskreise</div>
                <ec-list
                  :items="(data.person.ak || []).filter(item=>(item.currentStatus > 0))"
                  :mapper="item=>({
                    title: `${item.ak.bezeichnung}`,
                    subTitle: `${['Ausgetreten', 'Mitglied', 'GV-Vertreter', 'Leiter'][item.currentStatus]}`
                  })"
                  icon="map"
                  @edit="editAK_open"
                  :edit="auth.isMutationAllowed('updateAKStatus')"
                  @click="item=>$router.push('/app/arbeitskreise/' + item.ak.akID)"
                />
              </v-expansion-panel-content>
              <v-expansion-panel-content ripple lazy v-if="(data.person.ak||[]).length > 0">
                <div slot="header">Alle Arbeitskreise</div>
                <v-expansion-panel>
                  <v-expansion-panel-content
                    ripple
                    lazy
                    v-for="ak in (data.person.ak||[])"
                    :key="ak.ak.akID"
                  >
                    <div slot="header">{{ak.ak.bezeichnung}}</div>
                    <ec-list
                      :items="ak.allUpdates"
                      :mapper="item=>({
                      title: `${['Ausgetreten', 'Mitglied', 'GV-Vertreter', 'Leiter'][item.neuerStatus]}`, 
                      subTitle: `${item.date.german}`
                      })"
                      icon="map"
                      @click="$router.push('/app/arbeitskreise/' + ak.ak.akID)"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panel-content>
              <v-expansion-panel-content
                ripple
                lazy
                v-if="(data.person.fzAntraege || []).length > 0"
              >
                <div slot="header">Führungszeungniss Anträge</div>
                <ec-list
                  :items="data.person.fzAntraege || []"
                  :mapper="item=>({
                    title: `Erstellt am ${item.erzeugt.german}`
                  })"
                  icon="map"
                />
              </v-expansion-panel-content>
              <v-expansion-panel-content ripple lazy v-if="(data.person.fzs || []).length > 0">
                <div slot="header">Führungszeungnisse</div>
                <ec-list
                  :items="data.person.fzs || []"
                  :mapper="(item)=>({
                    title: item.kommentar,
                    subTitle: `FZ vom ${item.fzVon.german} gesehen am ${item.gesehenAm.german} von ${item.gesehenVon.vorname} ${item.gesehenVon.nachname}`
                  })"
                  icon="extension"
                />
              </v-expansion-panel-content>
              <v-expansion-panel-content ripple lazy>
                <div slot="header">Sonstiges</div>
                <ec-list
                  @edit="editSonstiges_open"
                  :items="data.person !== {} ? [
                    {title: data.person.juLeiCaNr || 'N/A', subTitle: 'JuLeiCa', edit: auth.isMutationAllowed('editPersonSonstiges')},
                    ...(data.person.ecMitglied>=0?[{
                      title: ['Kein EC-Mitglied', 'EC-Mitglied', 'EC-Förderer'][data.person.ecMitglied],
                      edit: auth.isMutationAllowed('editPersonSonstiges')
                    }]:[]),
                    ...(data.person.ecKreis?[{
                      title: data.person.ecKreis.bezeichnung,
                      subTitle: 'EC-Kreis',
                      edit: auth.isMutationAllowed('editPersonSonstiges')
                    }]:[]),
                    ...(data.person.datumDesLetztenFZ?[{
                      title: data.person.datumDesLetztenFZ.german,
                      subTitle: 'Letztes FZ',
                      edit: false
                    }]:[]),
                    ...(data.person.Führerschein?[{title: 'Besitzt einen Führerschein'}]:[]),
                    ...(data.person.Rettungsschwimmer?[{title: 'Besitzt einen Rettungsschwimmer'}]:[]),
                    ...(data.person.ErsteHilfe?[{title: 'Kennt sich in Erster Hilfe aus.'}]:[]),
                    {
                      title: data.person.Notizen,
                      subTitle: 'Notizen'
                    }
                  ] : []"
                  :mapper="item=>item"
                  icon="extension"
                />
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- Add AK, FZ, FZ-Antrag -->
            <v-card-actions>
              <v-spacer/>
              <v-btn
                flat
                @click="addAK_show = true"
                v-if="auth.isMutationAllowed('updateAKStatus')"
              >
                <v-icon>add</v-icon>Arbeitskreis
              </v-btn>
              <v-btn flat v-if="true" @click="addFZ_show = true">
                <v-icon>add</v-icon>Führungszeugnis
              </v-btn>
              <v-btn flat v-if="true" @click="fzAntrag">
                <v-icon>add</v-icon>Führungszeugnis-Antrag
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
      <v-btn @click="createLetter">Serienbrief</v-btn>
    </template>

    <template slot="forms">
      <!-- ADD Adresse -->
      <ec-form
        title="Adresse hinzufügen"
        v-model="addAdresse_show"
        @save="addAdresse_save"
        :fieldConfig="addAdresse_config"
      />
      <!-- ADD Telefon -->
      <ec-form
        title="Telefon hinzufügen"
        v-model="addTelefon_show"
        @save="addTelefon_save"
        :fieldConfig="addTelefon_config"
      />
      <!-- ADD Email -->
      <ec-form
        title="Email hinzufügen"
        v-model="addEmail_show"
        @save="addEmail_save"
        :fieldConfig="addEmail_config"
      />
      <!-- EDIT Adresse -->
      <ec-form
        title="Adresse editieren"
        v-model="editAdresse_show"
        @save="editAdresse_save"
        :value="editAdresse_value"
        @delete="editAdresse_delete"
        :fieldConfig="addAdresse_config"
        :deleteBtn="auth.isMutationAllowed('oldStatusKontakt')"
        deleteLabel="Als alt Makieren"
      />
      <!-- EDIT Telefon -->
      <ec-form
        title="Telefon editieren"
        v-model="editTelefon_show"
        @save="editTelefon_save"
        :value="editTelefon_value"
        @delete="editTelefon_delete"
        :fieldConfig="addTelefon_config"
        :deleteBtn="auth.isMutationAllowed('oldStatusKontakt')"
        deleteLabel="Als alt Makieren"
      />
      <!-- EDIT Email -->
      <ec-form
        title="Email editieren"
        v-model="editEmail_show"
        @save="editEmail_save"
        @delete="editEmail_delete"
        :value="editEmail_value"
        :fieldConfig="addEmail_config"
        :deleteBtn="auth.isMutationAllowed('oldStatusKontakt')"
        deleteLabel="Als alt Makieren"
      />
      <!-- ADD AK -->
      <ec-form
        title="Zu AK hinzufügen"
        v-model="addAK_show"
        @save="addAK_save"
        :fieldConfig="addAK_config"
      />
      <!-- EDIT AK -->
      <ec-form
        title="AK Zustand hinzufügen"
        v-model="editAK_show"
        @save="editAK_save"
        :fieldConfig="editAK_config"
        :value="editAK_value"
      />
      <!-- EDIT PersonStamm -->
      <ec-form
        title="Personenstamm editieren"
        :value="editPersonStamm_value"
        v-model="editPersonStamm_show"
        @save="editPersonStamm_save"
        :fieldConfig="editPersonStamm_config"
      />
      <ec-form
        title="Sonstiges editieren"
        :value="editSonstiges_value"
        v-model="editSonstiges_show"
        @save="editSonstiges_save"
        :fieldConfig="editSonstiges_config"
      />
      <ec-form
        title="Führungszeugnis hinzufügen"
        v-model="addFZ_show"
        @save="addFZ_save"
        :fieldConfig="addFZ_config"
      />
      <v-dialog v-model="mapShow">
        <h1>Hier könnte IHRE Karte stehen ;)</h1>
        <p>{{mapData}}</p>
      </v-dialog>
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'
import { jsZip, Docxtemplater } from '@/plugins/docx'

import {
  juLeiCaConfig,
  ecMitgliedConfig,
  vornameConfig,
  nachnameConfig,
  telefonConfig,
  eMailConfig,
  gebDatConfig,
  akConfig,
  strasseConfig,
  plzConfig,
  ortConfig,
  geschlechtConfig,
  statusUpdateDate,
  akStatusConfig,
  personConfig,
  notizConfig,
  ecKreisConfig
} from '@/realPlugins/formConfig'

import event from '@/plugins/eventbus'

import gql from 'graphql-tag'

const loadGQL = gql`
  query($authToken: String!, $personID: Int!) {
    person(personID: $personID, authToken: $authToken) {
      personID
      vorname
      nachname
      gebDat {
        german
        input
      }
      geschlecht
      alter(wann: null)
      Fuehrerschein
      Rettungsschwimmer
      ErsteHilfe
      Notizen
      adressen {
        adressID
        strasse
        plz
        ort
        isOld
        lastUsed {
          german
        }
      }
      emails {
        eMailID
        eMail
        isOld
        lastUsed {
          german
        }
      }
      telefone {
        telefonID
        telefon
        isOld
        lastUsed {
          german
        }
      }
      anmeldungen {
        anmeldeID
        position
        veranstaltung {
          bezeichnung
          begin {
            german
          }
          ende {
            german
          }
        }
      }
      fzs {
        fzID
        gesehenAm {
          german
        }
        fzVon {
          german
        }
        kommentar
        gesehenVon {
          personID
          vorname
          nachname
          gebDat {
            german
          }
        }
      }
      fzAntraege {
        fzAntragID
        erzeugt {
          german
        }
      }
      datumDesLetztenFZ {
        german
      }
      hatFZ(wann: null)
      juLeiCaNr
      ecKreis {
        ecKreisID
        bezeichnung
        website
      }
      ecMitglied
      ak {
        ak {
          akID
          bezeichnung
        }
        currentStatus
        allUpdates {
          akPersonID
          date {
            german
          }
          neuerStatus
        }
      }
      erstellt {
        german
      }
      letzteAenderung {
        german
      }
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
        query: loadGQL,
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
  editSonstiges_value: any = {}
  editSonstiges_show: boolean = false
  editSonstiges_save(value: any) {
    console.log(value.ecKreis)
    console.log(typeof value.ecKreis)
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $personID: Int!
            $juLeiCaNr: String!
            $ecMitglied: Int!
            $ecKreis: Int
            $Fuehrerschein: Boolean!
            $Rettungsschwimmer: Boolean!
            $ErsteHilfe: Boolean!
            $notizen: String!
          ) {
            editSonstiges(
              personID: $personID
              authToken: $authToken
              juLeiCaNr: $juLeiCaNr
              ecMitglied: $ecMitglied
              ecKreis: $ecKreis
              Fuehrerschein: $Fuehrerschein
              Rettungsschwimmer: $Rettungsschwimmer
              ErsteHilfe: $ErsteHilfe
              notizen: $notizen
            )
          }
        `,
        variables: {
          authToken: this.auth.authToken,
          personID: this.$route.params.id,
          ...value,
          ecKreis:
            typeof value.ecKreis === 'string'
              ? null
              : value.ecKreis,
          ecMitglied: value.ecMitglied - 1
        }
      })
      .then(this.refetch)
  }
  editSonstiges_open() {
    this.editSonstiges_value = {}
    this.editSonstiges_value = {
      juLeiCaNr: this.data.person.juLeiCaNr,
      ecMitglied: this.data.person.ecMitglied + 1,
      ecKreis: (
        this.data.person.ecKreis || { ecKreisID: null }
      ).ecKreisID,
      Fuehrerschein: this.data.person.Fuehrerschein,
      Rettungsschwimmer: this.data.person.Rettungsschwimmer,
      ErsteHilfe: this.data.person.ErsteHilfe,
      notizen: this.data.person.Notizen
    }
    this.editSonstiges_show = true
  }
  editSonstiges_config = [
    juLeiCaConfig,
    ecMitgliedConfig,
    ecKreisConfig,
    {
      name: 'Fuehrerschein',
      label: 'Fuehrerschein',
      componentName: 'ec-form-switch'
    },
    {
      name: 'Rettungsschwimmer',
      label: 'Rettungsschwimmer',
      componentName: 'ec-form-switch'
    },
    {
      name: 'ErsteHilfe',
      label: 'Erste Hilfe kenntnisse',
      componentName: 'ec-form-switch'
    },
    {
      name: 'notizen',
      label: 'Notizen',
      componentName: 'v-textarea'
    }
  ]
  addFZ_show = false
  addFZ_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $authToken: String!
            $gesehenAm: String!
            $gesehenVon: Int!
            $kommentar: String!
            $fzVon: String!
          ) {
            addFZ(
              personID: $personID
              authToken: $authToken
              gesehenAm: $gesehenAm
              gesehenVon: $gesehenVon
              kommentar: $kommentar
              fzVon: $fzVon
            )
          }
        `,
        variables: {
          authToken: this.auth.authToken,
          personID: this.$route.params.id,
          kommentar: value.notizen,
          gesehenAm: value.date,
          fzVon: value.fzVon,
          gesehenVon: value.personID
        }
      })
      .then(this.refetch)
  }
  addFZ_config = [
    {
      ...personConfig,
      label: 'Gesehen von'
    },
    {
      ...statusUpdateDate,
      label: 'FZ vom',
      name: 'fzVon'
    },
    {
      ...statusUpdateDate,
      label: 'Gesehen am'
    },
    notizConfig
  ]

  data: any = { person: {} }
  editPersonStamm_show = false
  editPersonStamm_open() {
    this.editPersonStamm_value = {}
    this.editPersonStamm_value = {
      vorname: this.data.person.vorname,
      nachname: this.data.person.nachname,
      gebDat: this.data.person.gebDat.input,
      geschlecht: this.data.person.geschlecht
    }
    this.editPersonStamm_show = true
  }
  editPersonStamm_value = {}
  editPersonStamm_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $vorname: String!
            $nachname: String!
            $gebDat: String!
            $geschlecht: String!
            $authToken: String!
          ) {
            editPersonStamm(
              authToken: $authToken
              personID: $personID
              vorname: $vorname
              nachname: $nachname
              gebDat: $gebDat
              geschlecht: $geschlecht
            )
          }
        `,
        variables: {
          authToken: this.auth.authToken,
          personID: this.$route.params.id,
          ...value
        }
      })
      .then(() => {
        this.refetch()
      })
  }
  editPersonStamm_config = [
    vornameConfig,
    nachnameConfig,
    gebDatConfig,
    geschlechtConfig
  ]
  auskunftsRechtContent = {}
  auskunftsRecht_show = false
  addAK_show = false
  editAK_show = false
  addAK_config = [
    akConfig,
    statusUpdateDate,
    akStatusConfig
  ]
  editAK_config = [
    {
      ...akConfig,
      disabled: true
    },
    statusUpdateDate,
    akStatusConfig
  ]
  editAK_value = {}
  editTelefon_show = false
  editEmail_show = false
  editAdresse_show = false
  editTelefon_value = {}
  editEmail_value = {}
  editAdresse_value = {}
  addTelefon_show = false
  addTelefon_config = [telefonConfig]
  addEmail_show = false
  addEmail_config = [eMailConfig]
  addAdresse_show = false
  addAdresse_config = [strasseConfig, plzConfig, ortConfig]
  tabs = null

  mapData: any = {}
  mapShow: boolean = false
  showMap(item: any) {
    this.mapData = item
    this.mapShow = true
  }
  editAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $personID: Int!
            $status: Int!
            $akID: Int!
            $date: String!
          ) {
            updateAKStatus(
              personID: $personID
              authToken: $authToken
              akID: $akID
              status: $status
              date: $date
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          personID: this.data.person.personID,
          ...value,
          status: value.status - 1
        }
      })
      .then(this.refetch)
  }
  editAK_open(item: any) {
    const d = new Date()
    this.editAK_value = {}
    this.editAK_value = {
      akID: item.ak.akID
    }
    this.editAK_show = true
  }
  addAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $personID: Int!
            $status: Int!
            $akID: Int!
            $date: String!
          ) {
            updateAKStatus(
              personID: $personID
              authToken: $authToken
              akID: $akID
              status: $status
              date: $date
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          personID: this.data.person.personID,
          ...value,
          status: value.status - 1
        }
      })
      .then(this.refetch)
  }
  addAdresse_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $authToken: String!
            $strasse: String!
            $plz: String!
            $ort: String!
          ) {
            addAdresse(
              personID: $personID
              authToken: $authToken
              strasse: $strasse
              plz: $plz
              ort: $ort
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  addTelefon_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $authToken: String!
            $telefon: String!
          ) {
            addTelefon(
              personID: $personID
              authToken: $authToken
              telefon: $telefon
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  addEmail_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $authToken: String!
            $email: String!
          ) {
            addEmail(
              personID: $personID
              authToken: $authToken
              email: $email
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editAdresse_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $adressID: Int!
            $authToken: String!
            $strasse: String!
            $plz: String!
            $ort: String!
          ) {
            editAdresse(
              adressID: $adressID
              authToken: $authToken
              strasse: $strasse
              plz: $plz
              ort: $ort
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editAdresse_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation($adressID: Int!, $authToken: String!) {
            markAdressAsOld(
              adressID: $adressID
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editTelefon_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $telefonID: Int!
            $authToken: String!
            $telefon: String!
          ) {
            editTelefon(
              telefonID: $telefonID
              authToken: $authToken
              telefon: $telefon
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editTelefon_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation($telefonID: Int!, $authToken: String!) {
            markTelefonAsOld(
              telefonID: $telefonID
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editEmail_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation($emailID: Int!, $authToken: String!) {
            markEmailAsOld(
              emailID: $emailID
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editEmail_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $emailID: Int!
            $authToken: String!
            $email: String!
          ) {
            editEmail(
              emailID: $emailID
              authToken: $authToken
              email: $email
            )
          }
        `,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editAdresse_open(item: any) {
    this.editAdresse_value = {}
    this.editAdresse_value = {
      ...item
    }
    this.editAdresse_show = true
  }
  editTelefon_open(item: {
    telefonID: number
    telefon: string
  }) {
    this.editTelefon_value = {}
    this.editTelefon_value = {
      ...item
    }
    this.editTelefon_show = true
  }
  editEmail_open(item: { eMailID: number; eMail: string }) {
    this.editEmail_value = {}
    this.editEmail_value = {
      emailID: item.eMailID,
      email: item.eMail
    }
    this.editEmail_show = true
  }
  created() {
    this.variabels = {
      authToken: auth.authToken,
      personID: this.$route.params.id
    }
    this.query = loadGQL
    super.created()
  }
  alertCommingSoon() {
    alert('Comming Soon')
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
  mailto(item: any) {
    location.href = `mailto:${item.eMail}`
  }
  fzAntrag() {
    // Confirm.
    this.$require.electron.remote.dialog.showMessageBox(
      {
        type: 'question',
        buttons: ['Yes', 'No'],
        title: 'FZ-Antrag generieren?',
        message:
          'Soll wirklich ein FZ-Antrag generiert werden?'
      },
      response => {
        if (response === 0) {
          this.$apollo
            .mutate({
              mutation: gql`
                mutation(
                  $personID: Int!
                  $authToken: String!
                ) {
                  addFZAntrag(
                    personID: $personID
                    authToken: $authToken
                  )
                }
              `,
              variables: {
                authToken: auth.authToken,
                personID: this.$route.params.id
              }
            })
            .then(this.refetch)
        }
      }
    )
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
      briefTemplate.setData({
        ...this.manageData(this.data.person),
        ecMitgliedStatus: [
          'kein EC-Mitglied',
          'EC-Mitglied',
          'EC-Förderer'
        ][this.data.person.ecMitglied - 1]
      })
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
      if (data[key] && data[key] instanceof Array) {
        nData[key] = []
        data[key].forEach((el: any) => {
          if (typeof el === 'object') {
            nData[key].push(this.manageData(el))
          } else {
            nData[key].push(el)
          }
        })
      } else if (
        data[key] &&
        typeof data[key] === 'object'
      ) {
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
}
</script>
<style>
.isOld {
  /* background-color: red; */
}
</style>
