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
        label: 'Finanzen',
        to: 'finanzen'
      },
      {
        icon: 'menu',
        label: 'Erlaubnisse und Bemerkungen',
        to: 'erlaubnisse'
      }
    ],
    title: 'VERANSTALTUNGSNAME',
    subTitle: 'Veranstaltung'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
