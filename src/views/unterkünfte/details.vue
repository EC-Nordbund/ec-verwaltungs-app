<template>
  <ec-wrapper
    title="Veranstaltungsort Details"
    :label="data.vort.bezeichnung"
    type="Veranstaltungsort"
  >
    <template slot="label">
      <ec-headline>
        {{data.vort.bezeichnung}} ({{(data.vort.organisation || {}).bezeichnung}})
        <ec-button-icon @click="stamm_open"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>Allgemeines</v-tab>
        <v-tab href="#tab-4" v-secondary>Kontakt</v-tab>
        <v-tab href="#tab-3" v-secondary>Veranstaltungen</v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tab-2">
          <ec-list
            @edit="sonstiges_open"
            :mapper="v=>v"
            icon="map"
            :items="[
            {
              title: data.vort.strasse,
              subTitle:`${data.vort.plz} ${data.vort.ort} (${data.vort.land})`,
              icon:'home'
            },
            {
              click: true,
              title: `${(data.vort.organisation||{}).bezeichnung} (${(data.vort.organisation||{}).ort} ${(data.vort.organisation||{}).land})`,
              subTitle: 'Organisation bei der gebucht'
            },
            {
              title: data.vort.anzahl_min?data.vort.anzahl_min:'N/A',
              subTitle: 'Mindestzahl an TN',
              edit: true
            },
            {
              title: data.vort.anzahl_max?data.vort.anzahl_max:'N/A',
              subTitle: 'Maximalzahl an TN',
              edit: true
            },
            ...(data.vort.vollverpflegung?[
              {
                title: 'Vollverpflegung möglich',
                edit: true
              }
            ]:[]),
            ...(data.vort.selbstversorger?[
              {
                title: 'Selbstversorger möglich',
                edit: true
              }
            ]:[]),
            {
              title: data.vort.notizen?data.vort.notizen:'N/A',
              subTitle: 'Notizen',
              edit: true
            }
          ]"
          />
        </v-tab-item>
        <v-tab-item id="tab-4">
          <div v-for="(kontakt, index) in data.vort.kontakte || []" :key="index">
            <v-divider v-if="index !== 0"/>
            <ec-list
              @edit="editKontakt(kontakt)"
              :mapper="v=>v"
              icon="map"
              :items="[
                {
                  title: kontakt.ansprechpartner,
                  subTitle: 'Ansprechpartner',
                  edit: true
                },
                {
                  title: kontakt.typ,
                  subTitle: 'Typ'
                },
                {
                  title: kontakt.telefon,
                  subTitle: 'Telefon'
                },
                {
                  title: kontakt.email,
                  subTitle: 'E-Mail'
                },
                {
                  title: kontakt.notizen,
                  subTitle: 'Notizen'
                }
              ]"
            />
          </div>
          <ec-button-add @click="kontaktAdd_show = true"/>
        </v-tab-item>
        <v-tab-item id="tab-3">
          <ec-list
            :items="data.vort.veranstaltungen || []"
            :mapper="v=>({
              title: `${v.bezeichnung} (${v.begin.german} - ${(v.ende||{}).german})`
            })"
            @click="item=>$router.push('/app/veranstaltungen/' + item.veranstaltungsID)"
          />
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="forms">
      <ec-form
        title="Veranstaltungsort editieren"
        v-model="stamm_show"
        :fieldConfig="stamm_config"
        :value="stamm_value"
        @save="stamm_save"
      />

      <ec-form
        title="Veranstaltungsort editieren"
        v-model="sonstiges_show"
        :fieldConfig="sonstiges_config"
        :value="sonstiges_value"
        @save="sonstiges_save"
      />

      <ec-form
        title="Ansprechpartner hinzufügen"
        v-model="kontaktAdd_show"
        :fieldConfig="ansprechConfig"
        @save="kontaktAdd_save"
      />

      <ec-form
        title="Ansprechpartner editiern"
        v-model="kontaktEdit_show"
        :value="kontaktEdit_value"
        deleteBtn
        @delete="kontaktEdit_delete"
        :fieldConfig="ansprechConfig"
        @save="kontaktEdit_save"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import event from '@/plugins/eventbus'

import gql from 'graphql-tag'
import {getClient} from '@/realPlugins/apollo'
const loadGQL = gql`
  query($authToken: String!, $vOrtID: Int!) {
    vort(authToken: $authToken, vOrtID: $vOrtID) {
      vOrtID
      bezeichnung
      strasse
      plz
      ort
      land
      anzahl_min
      anzahl_max
      vollverpflegung
      selbstversorger
      kontakte {
        vOrtKontaktID
        ansprechpartner
        typ
        email
        telefon
        notizen
      }
      organisation {
        organisationsID
        bezeichnung
        ort
        land
      }
      veranstaltungen {
        veranstaltungsID
        bezeichnung
        begin {
          german
        }
        ende {
          german
        }
      }
    }
  }
`

import {
  bezeichnungConfig,
  strasseConfig,
  plzConfig,
  ortConfig,
  landConfig,
  orgaConfig,
  notizConfig
} from '@/realPlugins/formConfig'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken,
          vOrtID: to.params.id
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
          vOrtID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
          authToken: auth.authToken,
          vOrtID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class vOrtDetails extends reloaderBase {
  kontaktEdit_show = false
  kontaktEdit_value: any = {}
  kontaktEdit_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $vOrtKontaktID: Int!
            $ansprechpartner: String!
            $typ: String!
            $telefon: String!
            $email: String!
            $authToken: String!
          ) {
            veranstaltungsortEditKontakt(
              vOrtKontaktID: $vOrtKontaktID
              ansprechpartner: $ansprechpartner
              typ: $typ
              telefon: $telefon
              email: $email
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
  kontaktEdit_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $vOrtKontaktID: Int!
            $authToken: String!
          ) {
            veranstaltungsortDeleteKontakt(
              vOrtKontaktID: $vOrtKontaktID
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
  kontaktAdd_show = false
  kontaktAdd_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $vOrtID: Int!
            $ansprechpartner: String!
            $typ: String!
            $telefon: String!
            $email: String!
            $authToken: String!
          ) {
            veranstaltungsortAddKontakt(
              vOrtID: $vOrtID
              ansprechpartner: $ansprechpartner
              typ: $typ
              telefon: $telefon
              email: $email
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          vOrtID: this.data.vort.vOrtID,
          ...value
        }
      })
      .then(this.refetch)
  }
  ansprechConfig = [
    {
      name: 'ansprechpartner',
      label: 'Ansprechpartner'
    },
    {
      name: 'typ',
      label: 'Typ'
    },
    {
      name: 'telefon',
      label: 'Telefon'
    },
    {
      name: 'email',
      label: 'E-Mail'
    },
    {
      name: 'notizen',
      label: 'Notizen',
      componentName: 'v-textarea'
    }
  ]

  sonstiges_show = false
  sonstiges_config = [
    {
      name: 'selbstversorger',
      label: 'Selbstversorger möglich',
      componentName: 'v-checkbox'
    },
    {
      name: 'vollverpflegung',
      label: 'Vollverpflegung möglich',
      componentName: 'v-checkbox'
    },
    {
      name: 'anzahl_min',
      label: 'Mindestzahl Personen',
      type: 'number'
    },
    {
      name: 'anzahl_max',
      label: 'Maximalzahl Personen',
      type: 'number'
    },
    notizConfig
  ]
  sonstiges_value: any = {}
  sonstiges_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $vOrtID: Int!
            $anzahl_min: Int
            $anzahl_max: Int
            $selbstversorger: Boolean!
            $vollverpflegung: Boolean!
            $notizen: String
            $authToken: String!
          ) {
            veranstaltungsortEditSonstiges(
              vOrtID: $vOrtID
              anzahl_min: $anzahl_min
              anzahl_max: $anzahl_max
              selbstversorger: $selbstversorger
              vollverpflegung: $vollverpflegung
              notizen: $notizen
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          vOrtID: this.data.vort.vOrtID,
          ...value,
          notizen: value.notizen ? value.notizen : null
        }
      })
      .then(this.refetch)
  }
  sonstiges_open() {
    this.sonstiges_value = {}
    this.sonstiges_value = {
      ...this.data.vort
    }
    this.sonstiges_show = true
  }
  stamm_show = false
  stamm_config = [
    bezeichnungConfig,
    orgaConfig,
    strasseConfig,
    plzConfig,
    ortConfig,
    landConfig
  ]
  stamm_value: any = {}
  stamm_open() {
    this.stamm_value = {}
    this.stamm_value = {
      bezeichnung: this.data.vort.bezeichnung,
      organisationsID: this.data.vort.organisation
        .organisationsID,
      strasse: this.data.vort.strasse,
      plz: this.data.vort.plz,
      ort: this.data.vort.ort,
      land: this.data.vort.land
    }
    this.stamm_show = true
  }
  stamm_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $vOrtID: Int!
            $bezeichnung: String!
            $strasse: String!
            $plz: String!
            $ort: String!
            $land: String!
            $organisationsID: Int!
            $authToken: String!
          ) {
            veranstaltungsortEditStamm(
              vOrtID: $vOrtID
              bezeichnung: $bezeichnung
              strasse: $strasse
              plz: $plz
              ort: $ort
              land: $land
              organisationsID: $organisationsID
              authToken: $authToken
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          vOrtID: this.data.vort.vOrtID,
          ...value
        }
      })
      .then(this.refetch)
  }

  tabs = null
  data: any = {
    vort: {
      organisation: {}
    }
  }

  editKontakt(konatkt: any) {
    this.kontaktEdit_value = {}
    this.kontaktEdit_value = {
      ...konatkt
    }
    this.kontaktEdit_show = true
  }
  open(item: any) {
    if (item.click) {
      this.$router.push(
        '/app/organisationen/' +
          this.data.vort.organisation.organisationsID
      )
    }
  }
}
</script>

