<template>
  <ApolloQuery
    :query="require('@/graphql/veranstaltungsOrte/loadDetails.gql')"
    :variables="{ authToken: $auth.instance.authToken, vOrtID: $route.params.id }"
    :tag="''"
  >
    <template slot-scope="{ result: { loading, error, data }}">
      <div v-if="loading" class="loading apollo">Loading...</div>
      <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
      <v-card v-else-if="data" class="result apollo" style="margin: 5px">
        <v-toolbar color="transparent" class="elevation-0">
          <ec-x-btn/>
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>{{data.vort.bezeichnung}}</h1>
          </v-toolbar-title>
          <v-spacer/>
          <ec-lesezeichen-add
            :route="$route.fullPath"
            :label="data.vort.bezeichnung"
            :elID="$route.params.id"
            type="Veranstaltungsorte"
          />
        </v-toolbar>
        <router-view v-bind="{data, countPerPage: anzahlElement}"/>
        <v-bottom-nav :value="true" color="transparent">
          <v-btn :to="{path: 'allgemein', query: {prev: $route.query.prev}}" replace>
            <span>Allgemein</span>
            <v-icon>history</v-icon>
          </v-btn>
          <v-btn :to="{path: 'kontakt', query: {prev: $route.query.prev}}" replace>
            <span>Kontakte</span>
            <v-icon>history</v-icon>
          </v-btn>
          <v-btn :to="{path: 'veranstaltungen', query: {prev: $route.query.prev}}" replace>
            <span>Veranstaltungen</span>
            <v-icon>history</v-icon>
          </v-btn>
        </v-bottom-nav>
      </v-card>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class vortDetails extends Vue {
  anzahlElement = Math.floor((document.body.offsetHeight - 280) / 72);
}
</script>