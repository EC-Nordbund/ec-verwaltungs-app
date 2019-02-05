<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  
  private config = {
    sheet: [
    ],
    nav: [
      {
        icon: 'menu',
        label: 'Allgemein',
        to: 'home'
      },
      {
        icon: 'menu',
        label: 'Veranstaltungen',
        to: 'veranstaltungen'
      },
      {
        icon: 'menu',
        label: 'Veranstaltungsorte',
        to: 'veranstaltungsorte'
      }
    ],
    title: 'ANMELDUNGNAME',
    subTitle: 'Organisation'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
