<template>
  <div>
    <ec-table
      title="Anmeldungen"
      itemName="Anmeldung"
      :items="data.anmeldungen"
      :config="tableConfig"
      suche
      @open="open"
      @sucheChanged="suchStringUpdate"
      :sucheVal="suchstring"
    >
      <template slot="handleOutside" slot-scope="props">
        <template
          v-if="props.config.name==='person'"
        >{{props.item.person.vorname}} {{props.item.person.nachname}} ({{props.item.person.gebDat.german}})</template>
        <template
          v-if="props.config.name==='veranstaltung'"
        >{{props.item.veranstaltung.bezeichnung}} ({{props.item.veranstaltung.begin.german}}{{props.item.veranstaltung.ende?` - ${props.item.veranstaltung.ende.german}`:''}})</template>
        <template v-if="props.config.name==='position'">
          <ec-rolle :value="props.item.position"/>
        </template>
      </template>
    </ec-table>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

const loadGQL = gql`
  query($authToken: String!) {
    anmeldungen(authToken: $authToken) {
      anmeldeID
      person {
        vorname
        nachname
        gebDat {
          german
        }
      }
      veranstaltung {
        bezeichnung
        begin {
          german
        }
        ende {
          german
        }
      }
      position
      anmeldeZeitpunkt {
        german
      }
    }
  }
`

import auth from '@/plugins/auth'

import xButtonLogik from '@/realPlugins/xButton/logic'
import event from '@/plugins/eventbus'
import {getClient} from '@/realPlugins/apollo'
@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<anmeldungsListe>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class anmeldungsListe extends reloaderBase {
  data: { anmeldungen: Array<any> } = {
    anmeldungen: []
  }
  tableConfig = [
    { name: 'anmeldeID', label: 'ID' },
    {
      name: 'person',
      label: 'Person',
      handleOutside: true
    },
    {
      name: 'veranstaltung',
      label: 'Veranstaltung',
      handleOutside: true
    },
    {
      name: 'position',
      label: 'Rolle',
      handleOutside: true,
      width: '220px'
    },
    {
      name: 'anmeldeZeitpunkt.german',
      label: 'Anmeldungszeitpunkt'
    }
  ]

  xButtonLogik = xButtonLogik

  open(item: any) {
    this.xButtonLogik.addItem(this.$route.path, {
      suche: this.suchstring
    })
    this.$router.push(`/app/anmeldungen/${item.anmeldeID}`)
  }

  suchstring: string = ''

  suchStringUpdate(val: string) {
    this.suchstring = val
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = loadGQL
    this.suchstring =
      typeof this.$route.query.suche === 'string'
        ? this.$route.query.suche
        : ''
    super.created()
  }
}
</script>
