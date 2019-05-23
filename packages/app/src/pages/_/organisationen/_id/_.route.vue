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
        icon: 'home',
        label: 'Allgemein',
        to: 'home'
      },
      {
        icon: 'events',
        label: 'Veranstaltungen',
        to: 'veranstaltungen'
      },
      {
        icon: 'home',
        label: 'Veranstaltungsorte',
        to: 'veranstaltungsorte'
      }
    ],
    title: 'ANMELDUNGNAME',
    subTitle: 'Organisation'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
