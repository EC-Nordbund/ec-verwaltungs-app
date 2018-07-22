<template>
  <v-card class="elevation-10" style="margin: 5px">
    <v-card-title>
      <h1 v-font v-primary :style="{ textAlign: 'center' }">
        Meldungen
      </h1>
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <ec-list :items="elements" :mapper="v=>v"/>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import {
  widget,
  widgetComponent
} from '@/plugins/widgets/widgets/index.ts'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class alert extends widgetComponent {
  elements = [
    {
      title: 'Hier stehen verschiede Meldungen die Thomas + Admins erzeugen können (z.B. "Neue Version" etc.)',
      subTitle: 'Sebastian Krüger'
    },
    {
      title: 'Neue Version verfügbar (0.1.5)',
      subTitle: 'EC-Norbund Entwickler-Team'
    }
  ]
}

export default alert

new widget([], 'alert', alert)
</script>
<style scoped>

</style>
