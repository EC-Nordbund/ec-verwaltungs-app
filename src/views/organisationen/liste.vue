<template>
  <!-- Lade Daten von API -->
  <gql-watch>
    <!-- Tatsächlicher Content -->
    <template slot-scope="{data, reloading, refetch}">
      <!-- V-Card mit etwas Platz zu allen Seiten -->
      <v-card style="margin: 5px">
        <!-- Kopfzeile -->
        <v-toolbar color="transparent" class="elevation-0">
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>Organisationen</h1>
          </v-toolbar-title>
          <v-spacer/>
          <!-- Neuladen -->
          <v-btn icon @click="refetch" :disabled="reloading">
            <v-icon :class="{'ec-rotate': reloading}">replay</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Content -->
        <v-card-text>
          <!-- Eingabe der Suche -->
          <v-text-field
            label="Suchen"
            prepend-icon="search"
            :append-icon="suchString.length > 0 ? 'close' : undefined"
            v-model="suchString"
            @click:append="()=>{suchString = ''}"
          />
          <!-- Darstellung der Tabelle -->
          <v-data-table
            :rows-per-page-items="[count]"
            :items="data.orgas"
            :pagination.sync="pageI"
            :search="suchString"
            :headers="[
              {
                text: 'Bezeichnung',
                align: 'center',
                value: 'bezeichnung'
              },
              {
                text: 'Anschrift',
                align: 'center',
                value: 'plz'
              }
            ]"
          >
            <template slot="items" slot-scope="{item}">
              <tr
                @click="$router.push({ path: `/app/organisationen/${item.organisationsID}/allgemein`, query: {prev: $route.fullPath}})"
              >
                <td>{{ item.bezeichnung }}</td>
                <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-dialog v-model="editShow" persistend max-width="500px">
            <ec-button-add slot="activator"/>
            <v-card>
              <v-card-title>
                <h1 v-font v-primary>Hinzufügen einer Organisation</h1>
              </v-card-title>
              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field v-bind="$formConfig.bezeichnungConfig" v-model="value.bezeichnung"/>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn @click="editShow=false">Abbrechen</v-btn>
                <div style="margin: 0px 3px;"/>
                <gql-mutate :variables="value" @done="refetch">
                  <v-btn
                    slot="activation"
                    slot-scope="{mutate}"
                    @click="mutate();editShow=false"
                    :disabled="!valid"
                    color="primary"
                  >Speichern</v-btn>
                  <template slot="query">
                    mutation ($authToken: String!, $bezeichnung: String!) {
                    addOrganisation(authToken: $authToken, bezeichnung: $bezeichnung)
                    }
                  </template>
                </gql-mutate>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>
    </template>
    <!-- GQL-Abfrage -->
    <template slot="query">
      query($authToken: String!) {
      orgas(authToken: $authToken) {
      organisationsID
      bezeichnung
      plz
      ort
      land
      }
      }
    </template>
    <!-- Bei Fehler anzuzeigen -->
    <template slot="error">Ein Fehler ist beim Laden der Daten aufgetreten</template>
    <!-- Beim Laden anzuzeigen -->
    <template slot="loading" slot-scope="{loading}">
      <template v-if="loading">Laden {initial}</template>
    </template>
  </gql-watch>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component({})
export default class orgaListe extends Vue {
  valid = false
  editShow = false

  value = {
    bezeichnung: ''
  }

  count = Math.floor(
    (document.body.offsetHeight - 438) / 48
  )

  suchString: any = ''

  created() {
    this.pageI = {
      page: this.$route.query.page || 1,
      sortBy: this.$route.query.sortBy || 'bezeichnung',
      descending: this.$route.query.descending || false
    }
    this.suchString = this.$route.query.suchString || ''
  }

  pageI: any = {}

  @Watch('suchString')
  onSucheChange() {
    this.onQueryChange()
  }

  @Watch('pageI')
  onPageIChange() {
    this.onQueryChange()
  }

  onQueryChange() {
    this.$router.replace({
      path: this.$route.path,
      query: { ...this.pageI, suchString: this.suchString }
    })
  }
}
</script>
