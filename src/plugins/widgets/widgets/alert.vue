<template>
  <v-card class="elevation-10" style="margin: 5px">
    <v-card-title>
      <h1 v-font v-primary :style="{ textAlign: 'center' }">
        Meldungen
      </h1>
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <gql-query>
        <template slot-scope="result">
          <ec-list v-if="result.data" :items="result.data.alerts||[]" :mapper="v=>({title: v.content, subTitle: v.von})"/>
          <div v-else>Loading ...</div>
        </template>
        <template slot="query">
          query{
          alerts{
          alertID
          content
          von
          }
          }
        </template>
      </gql-query>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import {
  widget,
  widgetComponent
} from '@/plugins/widgets/widgets/index.ts'
import { Component, Vue } from 'vue-property-decorator'

import gql from 'graphql-tag'

@Component({})
class alert extends widgetComponent {}
export default alert

new widget([], 'alert', alert)
</script>
