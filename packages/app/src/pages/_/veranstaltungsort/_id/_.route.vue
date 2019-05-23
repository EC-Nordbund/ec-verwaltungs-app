<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexVeranstaltungsortIdIndex extends Vue {
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
        icon: 'event',
        label: 'Veranstaltungen',
        to: 'veranstaltungen'
      }
    ],
    title: 'VERANSTALTUNGSORTNAME',
    subTitle: 'Veranstaltungsort'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
