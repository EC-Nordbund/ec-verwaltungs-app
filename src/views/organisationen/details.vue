<template>
  <!-- Lade Daten von API -->
  <gql-watch :variables="{orgaID: $route.params.id}">
    <!-- Tatsächlicher Content -->
    <template slot-scope="{data, reloading, refetch}">
      <!-- V-Card mit etwas Platz zu allen Seiten -->
      <v-card v-if="data.orga" style="margin: 5px">
        <!-- Kopfzeile -->
        <v-toolbar color="transparent" class="elevation-0">
          <!-- X-Button -->
          <x-btn-new/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>{{data.orga.bezeichnung}}</h1>
          </v-toolbar-title>
          <v-spacer/>
          <v-speed-dial
            direction="left"
            :open-on-hover="true"
            v-if="$require.isElectron"
            transition="slide-y-reverse-transition"
          >
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <!-- Neuladen -->
            <v-btn icon @click="refetch" :disabled="reloading">
              <v-icon :class="{'ec-rotate': reloading}">replay</v-icon>
            </v-btn>
            <!-- Lesezeichen -->
            <ec-lesezeichen-add
              :route="$route.fullPath"
              :label="data.orga.bezeichnung"
              :elID="$route.params.id"
              type="Organisation"
            />
            <!-- Share -->
            <v-btn
              icon
              @click="$require.electron.clipboard.writeText(`ec://${route.fullPath}`)"
              v-if="$require.isElectron"
            >
              <v-icon>share</v-icon>
            </v-btn>
          </v-speed-dial>
          <!-- Neuladen -->
          <v-btn v-else icon @click="refetch" :disabled="reloading">
            <v-icon :class="{'ec-rotate': reloading}">replay</v-icon>
          </v-btn>
        </v-toolbar>
        <!-- Content -->
        <router-view v-bind="{data, reloading, refetch, countPerPage: anzahlElement}"/>
        <!-- Navigation mit Buttons -->
        <v-bottom-nav :value="true" color="transparent">
          <v-btn :to="{path: 'allgemein', query: {prev: $route.query.prev}}" replace>
            <span>Allgemein</span>
            <v-icon>history</v-icon>
          </v-btn>
          <v-btn :to="{path: 'veranstaltungsorte', query: {prev: $route.query.prev}}" replace>
            <span>Veranstaltungsorte</span>
            <v-icon>history</v-icon>
          </v-btn>
          <v-btn :to="{path: 'veranstaltungen', query: {prev: $route.query.prev}}" replace>
            <span>Veranstaltungen</span>
            <v-icon>history</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </template>
    <!-- GQL-Abfrage -->
    <template slot="query">
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
      veranstaltungen {
      veranstaltungsID
      bezeichnung
      begin {
      german
      input
      }
      ende {
      german
      }
      }
      plz
      ort
      land
      }
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
export default class orgaDetails extends Vue {
  anzahlElement = Math.floor(
    (document.body.offsetHeight - 280) / 72
  )
}
</script>