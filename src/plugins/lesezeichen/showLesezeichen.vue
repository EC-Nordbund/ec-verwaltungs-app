<template>
  <v-menu offset-y>
    <template slot="activator">
      <v-badge color="red" v-if="lesezeichen.liste.length > 0 ">
        <span slot="badge">{{lesezeichen.liste.length >= 100 ? ':)' : lesezeichen.liste.length}}</span>
        <v-icon large>
          {{lesezeichen.liste.length === 0 ? 'star_border' : 'star'}}
        </v-icon>
      </v-badge>
      <v-icon large v-else>
        star_border
      </v-icon>
    </template>
    <v-card>
      <v-card-title>
        Hier kommt die Liste mit Lesezeichen hin. Voretst nur JSON
        {{lesezeichen.liste}}
      </v-card-title>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

import lesezeichen, {
  Lesezeichen
} from '@/plugins/lesezeichen/lesezeichen.ts'

@Component({})
export default class App extends Vue {
  lesezeichen = lesezeichen

  @Watch('lesezeichen.liste', {
    immediate: true
  })
  onLesezeichenChange() {
   
  }
}
</script>
