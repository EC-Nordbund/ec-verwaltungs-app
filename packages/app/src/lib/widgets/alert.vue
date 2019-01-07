<template>
  <ApolloQuery
      :query="require('@/graphql/widgets/alerts.gql')"
      :tag="''"
    >
      <template slot-scope="{ result: { loading, error, data }}">
        <div v-if="loading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
        <v-card v-else-if="data" class="elevation-10" style="margin: 5px">
          <v-card-title>
            <h1 v-font v-primary :style="{ textAlign: 'center' }">
              Meldungen
            </h1>
          </v-card-title>
          <v-card-text>
            <ec-liste :standard="{}" :items="data.alerts.map(v=>({title: v.content, subTitle: v.von}))" :value="1" :countPerPage="5"/>
          </v-card-text>
        </v-card>
      </template>
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component({})
export default class ecWidgetAlert extends Vue {}
</script>
