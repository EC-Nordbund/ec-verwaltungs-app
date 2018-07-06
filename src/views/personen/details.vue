<template>
  <div>
    <v-toolbar tabs>
      <ec-x-btn/>
      <ec-lesezeichen-add :route="$route.path" :label="data.person.vorname ? `${data.person.vorname} ${data.person.nachname} (${data.person.gebDat.german})` : ''" type="Person" :elID="$route.params.id"/>
      <v-spacer/>
      <ec-headline>
        <v-avatar :style="{ background: (data.person.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }">
          <span class="headline" v-white>
            {{(data.person.vorname || ' ')[0]}}{{(data.person.nachname || ' ')[0]}}
          </span>
        </v-avatar>
        {{data.person.vorname || ''}} {{data.person.nachname || ''}} ({{data.person.gebDat ? data.person.gebDat.german : ''}})
      </ec-headline>
      <v-spacer/>
      <v-btn v-if="isElectron" color="primary" @click="auskunftsRecht">Auskunftsrecht</v-btn>      
      <ec-button-icon @click="editPersonStamm_open"/>
      <v-tabs v-model="tabs" fixed-tabs slot="extension" color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>Kontaktdaten</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>Anmeldungen</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          <v-icon v-accent>extension</v-icon>
          <v-spacer/>
          <span>Sonstiges</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="tab-2">
        <v-card>
          <!-- Adressen -->
          <ec-list
            :items="data.person.adressen || []"
            :mapper="item=>({title: item.strasse, subTitle: item.plz + ' ' + item.ort})"
            icon="location_on"
            :edit="auth.isMutationAllowed('editAdresse')"
            @edit="editAdresse_open"
          />
          <v-divider/>
          <!-- Email -->
          <ec-list
            :items="data.person.emails || []"
            :mapper="item=>({title: item.email})"
            icon="mail"
            :edit="auth.isMutationAllowed('editEmail')"
            @edit="editEmail_open"
          />
          <v-divider/>
          <!-- Telefone -->
          <ec-list
            :items="data.person.telefone || []"
            :mapper="item=>({title: item.telefon})"
            icon="local_phone"
            :edit="auth.isMutationAllowed('editTelefon')"
            @edit="editTelefon_open"
          />
          <!-- Add Adresse, Email, Telefon -->
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="addAdresse_show = true" v-if="auth.isMutationAllowed('addAdresse')">
              <v-icon>add</v-icon>
              Adresse
            </v-btn>
            <v-btn flat @click="addEmail_show = true" v-if="auth.isMutationAllowed('addEmail')">
              <v-icon>add</v-icon>
              Email
            </v-btn>
            <v-btn flat @click="addTelefon_show = true" v-if="auth.isMutationAllowed('addTelefon')">
              <v-icon>add</v-icon>
              Telefon
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
            subTitle: `${item.position === 1 ? 'Teilnehmer' : ''}${item.position === 2 ? 'Mitarbeiter' : ''}${item.position === 3 ? 'Küchenmitarbeiter' : ''}${item.position === 5 ? 'Küchenleiter' : ''}${item.position === 6 ? 'Leiter' : ''}`
          })"
          icon="local_phone"
        />
      </v-tab-item>
      <v-tab-item id="tab-4">
        <v-card>
          <v-expansion-panel> 
            <v-expansion-panel-content ripple>
              <div slot="header">Arbeitskreise</div>
              <ec-list
                :items="data.person.aks || []"
                :mapper="item=>({
                  title: `${item.ak.bezeichnung}`,
                  subTitle: `${item.eintritt.german}${item.austritt === null?'':' - ' + item.austritt.german}${item.leiter?' (Leiter)':''}`
                })"
                icon="map"
                @edit="editAK_open"
                :edit="auth.isMutationAllowed('editAKPerson')"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Verteiler</div>
              <ec-list
                :items="data.person.verteiler || []"
                :mapper="item=>({
                  title: `${item.verteiler.bezeichnung}`,
                  subTitle: `${item.type===1?'TO':''}${item.type===2?'CC':''}${item.type===3?'BCC':''}`,
                  edit: item.verteiler.isAuto && auth.isMutationAllowed('editVerteilerPerson')
                })"
                icon="mail"
                @edit="editVerteiler_open"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Führungszeungniss Anträge</div>
              <v-card>
                Comming soon...
              </v-card>
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Führungszeungnisse</div>
              <ec-list
                :items="data.person.fzs || []"
                :mapper="(item)=>({
                  title: item.kommentar,
                  subTitle: `Gesehen am ${item.gesehenAm.german} von ${item.gesehenVon.vorname} ${item.gesehenVon.nachname}`
                })"
                :edit="true"
                icon="extension"
              />
            </v-expansion-panel-content>
            <v-expansion-panel-content ripple>
              <div slot="header">Sonstiges</div>
              <ec-list
                :items="data.person !== {} ? [{title: data.person.juLeiCaNr, subTitle: 'JuLeiCa'}] : []"
                :mapper="item=>item"
                icon="extension"
                :edit="true"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- Add AK, Verteiler, FZ, FZ-Antrag -->
          <v-card-actions>
            <v-spacer/>
            <v-btn flat @click="addAK_show = true" v-if="auth.isMutationAllowed('addAKPerson')">
              <v-icon>add</v-icon>
              Arbeitskreis
            </v-btn>
            <v-btn flat @click="addVerteiler_show = true" v-if="auth.isMutationAllowed('addVerteilerPerson')">
              <v-icon>add</v-icon>
              Verteiler
            </v-btn>
            <v-btn flat @click="addPersonFZ_show = true" v-if="true">
              <v-icon>add</v-icon>
              Führungszeugnis
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
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
      :fieldConfig="addAdresse_config"
    />
    <!-- EDIT Telefon -->
    <ec-form
      title="Telefon editieren"
      v-model="editTelefon_show"
      @save="editTelefon_save"
      :value="editTelefon_value"
      :fieldConfig="addTelefon_config"
    />
    <!-- EDIT Email -->
    <ec-form
      title="Email editieren"
      v-model="editEmail_show"
      @save="editEmail_save"
      :value="editEmail_value"
      :fieldConfig="addEmail_config"
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
      title="AK-Zugehörigkeit editieren"
      v-model="editAK_show"
      @save="editAK_save"
      :fieldConfig="editAK_config"
      :value="editAK_value"
    />
    <!-- ADD Verteiler -->
    <ec-form
      title="ZuVerteiler hinzufügen"
      v-model="addVerteiler_show"
      @save="addVerteiler_save"
      :fieldConfig="addVerteiler_config"
    />
    <!-- EDIT Verteiler -->
    <ec-form
      title="Verteiler-Zugehörigkeit editieren"
      deleteBtn
      @delete="editVerteiler_delete"
      v-model="editVerteiler_show"
      @save="editVerteiler_save"
      :fieldConfig="addVerteiler_config"
      :value="editVerteiler_value"
    />
    <!-- EDIT PersonStamm -->
    <ec-form
      title="Personenstamm editieren"
      :value="editPersonStamm_value"
      v-model="editPersonStamm_show"
      @save="editPersonStamm_save"
      :fieldConfig="editPersonStamm_config"
    />
  </div>
</template>
<script lang="ts">
import electron, { isElectron } from '@/plugins/electron'
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import {
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
  verteilerConfig,
  verteilerTypeConfig
} from '@/plugins/formConfig/index'

import { query } from '@/graphql/index'

@Component({})
export default class PersonenDetails extends reloaderBase {
  isElectron: boolean = isElectron
  data: { person: any } = {
    person: {}
  }
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
        mutation: query.personen.details.editStamm,
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
  addVerteiler_show = false
  addVerteiler_config = [
    verteilerConfig,
    verteilerTypeConfig
  ]
  editVerteiler_show = false
  editVerteiler_value = {}
  addAK_show = false
  editAK_show = false
  addAK_config = [
    akConfig,
    {
      name: 'eintritt',
      label: 'Eintritt',
      componentName: 'ec-form-datePicker',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Eintrittsdatum angegeben werden!'
            : true
      ],
      required: true
    },
    {
      name: 'leiter',
      label: 'Leiter',
      componentName: 'ec-form-checkbox'
    }
  ]
  editAK_config = [
    {
      ...akConfig,
      disabled: true
    },
    {
      name: 'eintritt',
      label: 'Eintritt',
      componentName: 'ec-form-datePicker',
      rules: [
        (v: string) =>
          !v
            ? 'Es muss ein Eintrittsdatum angegeben werden!'
            : true
      ],
      required: true
    },
    {
      name: 'austritt',
      label: 'Austritt',
      componentName: 'ec-form-datePicker'
    },
    {
      name: 'leiter',
      label: 'Leiter',
      componentName: 'ec-form-checkbox'
    }
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
  auskunftsRecht() {
    ;(<any>this.$apollo)
      .getClient()
      .query({
        query: query.personen.details.auskunft,
        variables: {
          authToken: auth.authToken,
          personID: this.$route.params.id
        }
      })
      .then((v: any) => v.data.person)
      .then((v: any) => {
        const { clipboard, remote } = electron

        const typeName = (obj: any) => {
          let newObj: any = {}
          for (const key in obj) {
            if (key !== '__typename') {
              if (typeof obj[key] === 'object') {
                newObj[key] = typeName(obj[key])
              } else {
                newObj[key] = obj[key]
              }
            }
          }
          return newObj
        }

        clipboard.writeText(
          JSON.stringify(typeName(v), null, 2)
        )
        remote.dialog.showMessageBox({
          title: 'Zwischenspeicher',
          message:
            'Die Daten wurden in den Zwischenspeicher zwischengespeichert.'
        })
      })
  }
  editVerteiler_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.editVerteiler,
        variables: {
          ...value,
          personID: this.data.person.personID,
          authToken: auth.authToken
        }
      })
      .then(this.refetch)
  }
  editVerteiler_open(item: any) {
    this.editVerteiler_value = {}
    this.editVerteiler_value = {
      verteilerPersonenID: item.verteilerPersonenID,
      verteiler: item.verteiler.verteilerID,
      type: item.type
    }
    this.editVerteiler_show = true
  }
  editVerteiler_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.deleteVerteiler,
        variables: {
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  addVerteiler_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.addVerteiler,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.editAK,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value,
          leiter:
            value.leiter === null ? false : value.leiter
        }
      })
      .then(this.refetch)
  }
  editAK_open(item: any) {
    this.editAK_value = {}
    this.editAK_value = {
      personAKID: item.personAKID,
      ak: item.ak.akID,
      eintritt: item.eintritt.input,
      austritt: (item.austritt || {}).input,
      leiter: item.leiter
    }
    this.editAK_show = true
  }
  addAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.addAK,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value,
          leiter:
            value.leiter === null ? false : value.leiter
        }
      })
      .then(this.refetch)
  }
  addAdresse_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.addAdresse,
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
        mutation: query.personen.details.addTelefon,
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
        mutation: query.personen.details.addEmail,
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
        mutation: query.personen.details.editAdresse,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editTelefon_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.editTelefon,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editEmail_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.personen.details.editEmail,
        variables: {
          personID: this.data.person.personID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editAdresse_open(item: {
    adressID: number
    strasse: string
    plz: string
    ort: string
  }) {
    this.editAdresse_value = {}
    this.editAdresse_value = {
      adressID: item.adressID,
      strasse: item.strasse,
      plz: item.plz,
      ort: item.ort
    }
    this.editAdresse_show = true
  }
  editTelefon_open(item: {
    telefonID: number
    telefon: string
  }) {
    this.editTelefon_value = {}
    this.editTelefon_value = {
      telefonID: item.telefonID,
      telefon: item.telefon
    }
    this.editTelefon_show = true
  }
  editEmail_open(item: { emailID: number; email: string }) {
    this.editEmail_value = {}
    this.editEmail_value = {
      emailID: item.emailID,
      email: item.email
    }
    this.editEmail_show = true
  }
  created() {
    this.variabels = {
      authToken: auth.authToken,
      personID: this.$route.params.id
    }
    this.query = query.personen.details.load
    super.created()
  }
}
</script>