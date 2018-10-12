<template>
  <ec-wrapper title="Veranstaltungsort Details" :label="data.vort.bezeichnung" type="Veranstaltungsort">

    <template slot="label">
      <ec-headline>
        {{data.vort.bezeichnung}} ({{(data.vort.organisation || {}).bezeichnung}})
        <ec-button-icon @click="soon"/>
      </ec-headline>
    </template>

    <template slot="extension">
      <v-tabs v-model="tabs" fixed-tabs color="transparent">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          Allgemeines
        </v-tab>
        <v-tab href="#tab-4" v-secondary>
          Kontakt
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          Veranstaltungen
        </v-tab>
      </v-tabs>
    </template>

    <template>
      <v-tabs-items v-model="tabs">
        <v-tab-item id="tab-2">
          <ec-list :mapper="v=>v" icon="map" :items="[
            {
              title: data.vort.strasse,
              subTitle:`${data.vort.plz} ${data.vort.ort} (${data.vort.land})`,
              icon:'home'
            },
            {
              title: `${data.vort.bezeichnung} (${data.vort.ort} ${data.vort.land})`,
              subTitle: 'Organisation bei der gebucht'
            },
            {
              title: data.vort.anzahl_min?data.vort.anzahl_min:'N/A',
              subTitle: 'Mindestzahl an TN'
            },
            {
              title: data.vort.anzahl_max?data.vort.anzahl_max:'N/A',
              subTitle: 'Maximalzahl an TN'
            },
            ...(data.vort.vollverpflegung?[
              {
                title: 'Vollverpflegung möglich'
              }
            ]:[]),
            ...(data.vort.sebstversorger?[
              {
                title: 'Sebstversorger möglich'
              }
            ]:[]),
            {
              title: data.vort.notizen?data.vort.notizen:'N/A',
              subTitle: 'Notizen'
            }
          ]"/>
        </v-tab-item>
        <v-tab-item id="tab-4">
          <div v-for="(kontakt, index) in data.vort.kontakte || []" :key="index">
            <v-divider v-if="index !== 0"/>
            <ec-list
              @edit="editKontakt(kontakt)"
              :mapper="v=>v"
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
        </v-tab-item>
        <v-tab-item id="tab-3">
          <ec-list
            :items="data.vort.veranstaltungen || []"
            :mapper="v=>({
              title: `${v.bezeichnung} (${v.begin.german} - ${v.ende.german})`
            })"
          />
        </v-tab-item>
      </v-tabs-items>
    </template>

    <template slot="actions">
      
    </template>

    <template slot="forms">
    </template>

  </ec-wrapper>
</template>
<script lang="ts">
import electron, { isElectron } from '@/plugins/electron'
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import { query } from '@/graphql/index'

import { getClient } from '@/plugins/apollo'
import event from '@/plugins/eventbus'

import gql from 'graphql-tag'

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
      sebstversorger
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
  tabs = null
  data: any = {
    vort: {}
  }

  editKontakt(konatkt: any) {
    console.log(konatkt)
    this.soon()
  }

  soon() {
    alert('Cooming Soon...')
  }
}
</script>
