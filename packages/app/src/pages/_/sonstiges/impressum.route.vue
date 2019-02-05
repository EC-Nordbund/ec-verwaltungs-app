<template lang="pug">
  ec-wrapper(v-bind="config")
    | {{version}}
    h2(v-font v-primary) Versionen
    p Wir benutzen verschiedene Packete die alle unter OpenSource Lizenzen verfügbar sind.
    table
      tr
        th Packet
        th Version
      tr
        td Vue
        td {{version.vue}}
      tr
        td Vuetify
        td {{version.vuetify}}
      tr
        td Electron
        td {{version.electron}}
    h2(v-font v-primary) Lizenz
    h2(v-font v-primary) Lizenz-Losungen
    
    
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vuetify from 'vuetify';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  private version = {vue: Vue.version, vuetify: Vuetify.version, electron: '4.0.x'};
  private config = {
    title: 'Impressum'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
