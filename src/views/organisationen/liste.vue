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
          <ec-button-add/>
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
  /**
   * Wie viele Datensätze dürfen auf eine Seite?
   */
  count = Math.floor(
    (document.body.offsetHeight - 438) / 48
  )

  /**
   * Speichern des Strings zum Suchen
   */
  suchString: any = ''

  /**
   * Wenn erzeugt und alles Injected wurde
   */
  created() {
    // Lade Sitendarstellung von Query
    this.pageI = {
      page: this.$route.query.page || 1,
      sortBy: this.$route.query.sortBy || 'bezeichnung',
      descending: this.$route.query.descending || false
    }
    this.suchString = this.$route.query.suchString || ''
  }

  /**
   * Speichern von Sortierung und Seitenzahl
   */
  pageI: any = {}

  @Watch('suchString')
  onSucheChange() {
    this.onQueryChange()
  }

  @Watch('pageI')
  onPageIChange() {
    this.onQueryChange()
  }

  /**
   * Setze Router Query neu.
   */
  onQueryChange() {
    this.$router.replace({
      path: this.$route.path,
      query: { ...this.pageI, suchString: this.suchString }
    })
  }
}
</script>
