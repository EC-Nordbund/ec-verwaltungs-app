<template>
  <ec-wrapper title="Organisation Details" :label="data.orga.bezeichnung" type="Organisation">
    <template slot="label">
      <ec-headline>
        {{data.orga.bezeichnung}}
        <ec-button-icon @click="editOrga_open" v-if="data.orga.organisationsID!==1"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary v-if="data.orga.organisationsID!==1">Allgemein</v-tab>
        <v-tab href="#tab-3" v-secondary>Veranstaltungsorte</v-tab>
        <v-tab href="#tab-4" v-secondary>Veranstaltungen</v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tab-2">
          <ec-list
            :items="[
            {title: data.orga.ansprechpartner, subTitle: 'Ansprechpartner', icon: 'person'},
            {title: data.orga.strasse, subTitle: `${data.orga.plz} ${data.orga.ort} (${data.orga.land})`, icon: 'home'},
            {title: data.orga.telefon, subTitle: 'Telefon'},
            {title: data.orga.email, subTitle: 'E-Mail'},
            {title: data.orga.notizen, subTitle: 'Notizen'}
          ]"
            :mapper="v=>v"
            icon="map"
          />
        </v-tab-item>
        <v-tab-item id="tab-3">
          <ec-list
            :items="data.orga.vOrte || []"
            icon="home"
            :mapper="v=>({
              title: v.bezeichnung,
              subTitle: `${v.plz} ${v.ort} (${v.land})`
            })"
            @click="item => $router.push('/app/vOrte/' + item.vOrtID)"
          />
        </v-tab-item>
        <v-tab-item
          id="tab-4"
        >Hier kommt eine Liste der Veranstaltungen der Veranstaltungsorte der Organisation hin.
          <br>(Comming Soon...)
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="forms">
      <ec-form
        title="Organisation editieren"
        :value="editOrga_value"
        v-model="editOrga_show"
        @save="editOrga_save"
        :fieldConfig="editOrga_config"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import {getClient} from '@/realPlugins/apollo'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import event from '@/plugins/eventbus'

import {
  bezeichnungConfig,
  strasseConfig,
  plzConfig,
  ortConfig,
  eMailConfig,
  telefonConfig,
  landConfig,
  notizConfig
} from '@/realPlugins/formConfig'

import gql from 'graphql-tag'

import { required, maxLength } from '@/config/rules'

const loadGQL = gql`
  query($authToken: String!, $orgaID: Int!) {
    orga(authToken: $authToken, organisationsID: $orgaID) {
      organisationsID
      bezeichnung
      ansprechpartner
      strasse
      plz
      ort
      land
      telefon
      email
      notizen

      vOrte {
        vOrtID
        bezeichnung
        plz
        ort
        land
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
          orgaID: to.params.id
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
          orgaID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
          authToken: auth.authToken,
          orgaID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class orgaDetails extends reloaderBase {
  editOrga_open() {
    this.editOrga_value = {}
    this.editOrga_value = {
      bezeichnung: this.data.orga.bezeichnung,
      ansprechpartner: this.data.orga.ansprechpartner,
      strasse: this.data.orga.strasse,
      plz: this.data.orga.plz,
      ort: this.data.orga.ort,
      land: this.data.orga.land,
      telefon: this.data.orga.telefon,
      email: this.data.orga.email,
      notizen: this.data.orga.notizen
    }
    this.editOrga_show = true
  }
  editOrga_value: any = {}
  editOrga_show = false
  editOrga_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $authToken: String!
            $orgaID: Int!
            $bezeichnung: String!
            $ansprechpartner: String!
            $strasse: String!
            $plz: String!
            $ort: String!
            $land: String!
            $telefon: String!
            $email: String!
            $notizen: String!
          ) {
            editOrganisation(
              organisationsID: $orgaID
              bezeichnung: $bezeichnung
              ansprechpartner: $ansprechpartner
              strasse: $strasse
              plz: $plz
              ort: $ort
              land: $land
              telefon: $telefon
              email: $email
              notizen: $notizen
              authToken: $authToken
            )
          }
        `,
        variables: {
          ...value,
          authToken: auth.authToken,
          orgaID: this.data.orga.organisationsID
        }
      })
      .then(this.refetch)
  }
  editOrga_config = [
    bezeichnungConfig,
    strasseConfig,
    {
      ...plzConfig,
      rules: [
        required('eine PostLeitZahl'),
        maxLength('eine PostLeitZahl', 'die', 10)
      ],
      counter: 10
    },
    ortConfig,
    eMailConfig,
    telefonConfig,
    landConfig,
    notizConfig
  ]
  data: any = {
    orga: {}
  }
  tabs = null
}
</script>
