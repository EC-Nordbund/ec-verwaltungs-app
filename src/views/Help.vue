<template>
  <v-app class="ec_help_wrapper">
    <!-- <div class="ec_help_wrapper"> -->
      <v-toolbar ripple tabs>
        <ec-button-router-back/>
        <v-spacer/>
        <ec-headline>Hilfe</ec-headline>
        <v-spacer/>
        <!-- <ec-button-icon @click="editAKStamm_open"/> -->
      </v-toolbar>
      <iframe :src="isProduction?(isElectron?'../docs/index.html':onlinePath):'http://localhost:8081'"/>
    <!-- </div> -->
  </v-app>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { isProduction, isElectron } from '@/plugins/electron';
@Component({})
export default class Help extends Vue {
  isProduction = isProduction
  isElectron = isElectron
  // TODO: ChangeURL
  onlinePath = 'http://localhost:8081'
}
</script>

<style>
body {
  display: grid;
  height: 100%;
}
html {
  height: 100%;
}
div .application--wrap {
  display: grid;
  grid-template-rows: 60px 1fr;
}
iframe {
  height: 100%;
  width: 100%;
}
</style>
