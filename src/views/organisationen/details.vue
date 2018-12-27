<template>
  <gql-watch :variables="{orgaID: $route.params.id}">
    <template slot-scope="{data, reloading, refetch}">
      <v-card v-if="data.orga" style="margin: 5px">
        <v-toolbar color="transparent" class="elevation-0">
          <x-btn-new/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>{{data.orga.bezeichnung}}</h1>
          </v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="refetch" :disabled="reloading">
            <v-icon :class="{rot: reloading}">replay</v-icon>
          </v-btn>
        </v-toolbar>
        <router-view v-bind="{data, reloading, refetch, countPerPage: anzahlElement}"/>
        <v-card-actions>
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
        </v-card-actions/>
      </v-card>
    </template>
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
    <template slot="error">Ein Fehler ist beim Laden der Daten aufgetreten</template>
    <template slot="loading" slot-scope="{loading}">
      <template v-if="loading">Laden {initial}</template>
    </template>
  </gql-watch>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class orgaDetails extends Vue {
  anzahlElement = Math.floor((document.body.offsetHeight - 280)/72)
}
</script>
<style scoped>
@keyframes rotate {
  0% {
    transfrom: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.rot {
  animation: rotate 0.5s infinite;
}
</style>
