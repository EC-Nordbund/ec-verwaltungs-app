<template>
  <ec-wrapper
    title="Arbeitskreis Details"
    :label="data.ak.bezeichnung || ''"
    type="AK"
    @share="share">
    
    <template slot="label">
      <ec-headline>
        {{data.ak.bezeichnung}}
      </ec-headline>
      <ec-button-icon @click="editAKStamm_open" v-if="auth.isMutationAllowed('editAK')"/>
    </template>

    <template>
      <v-expansion-panel>
        <v-expansion-panel-content ripple lazy>
          <div slot="header">Aktuelle Mitglieder</div>
          <ec-list
            @click="item => $router.push('/app/personen/' + item.person.personID)"
            :items="(data.ak.personen || []).filter(item=>(item.currentStatus > 0))"
            :mapper="item=>({
              title: `${item.person.vorname} ${item.person.nachname} (${item.person.gebDat.german})`,
              subTitle: `${['Ausgetreten', 'Mitglied', 'GV-Vertreter', 'Leiter'][item.currentStatus]}`
            })"
            icon="map"
            :edit="auth.isMutationAllowed('updateAKStatus')"
            @edit="editPersonStatus"
          />
        </v-expansion-panel-content>
        <v-expansion-panel-content ripple lazy>
          <div slot="header">Alle Mitglieder</div>
          <v-expansion-panel> 
            <v-divider/>
            <v-expansion-panel-content ripple lazy v-for="person in (data.ak.personen||[])" :key="person.person.personID">
              <div slot="header">
                {{person.person.vorname}}
                {{person.person.nachname}}
                ({{person.person.gebDat.german}})
              </div>
              <ec-list :items="person.allUpdates" :mapper="item=>({
                title: `${['Ausgetreten', 'Mitglied', 'GV-Vertreter', 'Leiter'][item.neuerStatus]}`, 
                subTitle: `${item.date.german}`
                })" icon="map"
                @click="$router.push('/app/personen/' + person.person.personID)"
              />
            </v-expansion-panel-content>
          </v-expansion-panel> 
        </v-expansion-panel-content>
      </v-expansion-panel>
    </template>

    <template slot="actions">
      <ec-button-add v-if="auth.isMutationAllowed('updateAKStatus')" @click="addAKPerson_show = true"/>
      <v-dialog max-width="500px">
        <v-btn slot="activator">Mitgliederliste</v-btn>
        <v-card>
          <v-card-title>
            <h1>
              Was für eine Liste wird benötigt?
            </h1>
          </v-card-title>
          <v-card-actions>
            <v-btn @click="soon">Aktuelle Mitglieder</v-btn>
            <v-spacer/>
            <v-btn @click="soon">Gesamte Liste (inkl. Ausgetretenen)</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template slot="forms">
      <!-- Edit AK-Stamm -->
      <ec-form
        title="Arbeitskreis editieren"
        v-model="editAKStamm_show"
        :fieldConfig="editAKStamm_config"
        :value="editAKStamm_value"
        @save="editAKStamm_save"
      />

      <!-- Edit AK-Person -->
      <ec-form
        title="Editiere Personenzuordnung"
        v-model="editAKPerson_show"
        :fieldConfig="editAKPerson_config"
        :value="editAKPerson_value"
        @save="editAKPerson_save"
      />

      <!-- ADD AK-Person -->
      <ec-form
        title="Person hinzufügen"
        v-model="addAKPerson_show"
        :fieldConfig="addAKPerson_config"
        @save="addPersonAK_save"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import {
  personConfig,
  bezeichnungConfig,
  statusUpdateDate,
  akStatusConfig
} from '@/realPlugins/formConfig'
import auth from '@/plugins/auth'

import event from '@/plugins/eventbus'

import gql from 'graphql-tag'

const loadGQL = gql`
  query($authToken: String!, $akID: Int!) {
    ak(akID: $akID, authToken: $authToken) {
      akID
      bezeichnung
      personen {
        currentStatus
        allUpdates {
          akPersonID
          neuerStatus
          date {
            german
          }
        }
        person {
          personID
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

import {getClient} from '@/realPlugins/apollo'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken,
          akID: to.params.id
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
          akID: to.params.id
        }
      })
      .then((v: any) => {
        ;(<any>this).data = v.data
        ;(<any>this).variabels = {
          authToken: auth.authToken,
          akID: to.params.id
        }
        next()
        setTimeout(() => {
          event.emit('hideLoading')
        }, 500)
      })
  }
})
export default class AKDetails extends reloaderBase {
  auth = auth
  data: { ak: any } = { ak: {} }
  mapper = (item: any) => ({
    title: `${item.person.vorname} ${
      item.person.nachname
    } (${item.person.gebDat.german})`,
    subTitle: `${item.eintritt.german}${
      item.austritt ? ` ${item.austritt.german}` : ''
    }${item.leiter ? ' (Leiter)' : ''}`
  })
  editAKStamm_show = false
  editAKStamm_config = [bezeichnungConfig]
  editAKStamm_value = {}
  editAKPerson_show = false
  editAKPerson_config = [
    {
      ...personConfig,
      disabled: true
    },
    statusUpdateDate,
    akStatusConfig
  ]
  editAKPerson_value = {}
  addAKPerson_show = false
  addAKPerson_config = [
    personConfig,
    statusUpdateDate,
    akStatusConfig
  ]
  edit(item: any) {
    this.editAKPerson_value = {
      personAKID: item.personAKID,
      personID: item.person.personID
    }
    this.editAKPerson_show = true
  }
  editAKStamm_open() {
    this.editAKStamm_value = {}
    this.editAKStamm_value = {
      bezeichnung: this.data.ak.bezeichnung
    }
    this.editAKStamm_show = true
  }
  editAKStamm_save(value: any) {
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $akID: Int!
            $bezeichnung: String!
            $authToken: String!
          ) {
            editAK(
              authToken: $authToken
              akID: $akID
              bezeichnung: $bezeichnung
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          akID: this.$route.params.id,
          bezeichnung: value.bezeichnung
        }
      })
      .then(this.refetch)
  }
  editAKPerson_save(value: any) {
    console.log(value)
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $akID: Int!
            $date: String!
            $authToken: String!
            $status: Int!
          ) {
            updateAKStatus(
              personID: $personID
              akID: $akID
              date: $date
              authToken: $authToken
              status: $status
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          akID: this.$route.params.id,
          personID: value.personID,
          date: value.date,
          status: value.status - 1
        }
      })
      .then(this.refetch)
  }
  addPersonAK_save(value: any) {
    console.log(value)
    this.$apollo
      .mutate({
        mutation: gql`
          mutation(
            $personID: Int!
            $akID: Int!
            $date: String!
            $authToken: String!
            $status: Int!
          ) {
            updateAKStatus(
              personID: $personID
              akID: $akID
              date: $date
              authToken: $authToken
              status: $status
            )
          }
        `,
        variables: {
          authToken: auth.authToken,
          akID: this.$route.params.id,
          personID: value.personID,
          date: value.date,
          status: value.status - 1
        }
      })
      .then(this.refetch)
  }

  created() {
    this.variabels = {
      authToken: auth.authToken,
      akID: this.$route.params.id
    }
    this.query = loadGQL
    super.created()
  }
  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
  editPersonStatus(item: any) {
    console.log(item)
    this.editAKPerson_show = true
  }

  soon() {
    alert('Comming Soon...')
  }
}
</script>
