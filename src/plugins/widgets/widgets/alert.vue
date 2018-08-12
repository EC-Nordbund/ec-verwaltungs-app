<template>
  <v-card class="elevation-10" style="margin: 5px">
    <v-card-title>
      <h1 v-font v-primary :style="{ textAlign: 'center' }">
        Meldungen
      </h1>
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <ec-list :items="alerts" :mapper="v=>({title: v.content, subTitle: v.von})"/>
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

@Component({
  apollo: {
    alerts: gql`
      {
        alerts{
          alertID
          content
          von
        }
      }
    `
  },
  data: ()=>({
    alerts: []
  })
})
class alert extends widgetComponent {}
export default alert

new widget([], 'alert', alert)
</script>
