<template>
  <ApolloQuery
    :query="require('@/graphql/organisationen/loadDetails.gql')"
    :variables="{ authToken: $auth.instance.authToken, orgaID: $route.params.id }"
    tag
  >
    <template slot-scope="{ result: { loading, error, data }}">
      <div v-if="loading" class="loading apollo">Loading...</div>
      <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
      <v-card v-else-if="data" class="result apollo" style="margin: 5px">
        <v-toolbar color="transparent" class="elevation-0">
          <!-- <x-btn-new/> -->
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>{{data.orga.bezeichnung}}</h1>
          </v-toolbar-title>
          <v-spacer/>
          <!-- <v-btn icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-btn icon @click="refetch" :disabled="reloading">
            <v-icon :class="{'ec-rotate': reloading}">replay</v-icon>
          </v-btn>-->
          <ec-lesezeichen-add
            :route="$route.fullPath"
            :label="data.orga.bezeichnung"
            :elID="$route.params.id"
            type="Organisation"
          />
        </v-toolbar>
        <router-view v-bind="{data, countPerPage: anzahlElement}"/>
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
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class orgaDetails extends Vue {
  anzahlElement = Math.floor((document.body.offsetHeight - 280) / 72);
}
</script>