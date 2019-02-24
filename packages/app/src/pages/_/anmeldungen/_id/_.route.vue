<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config" @getData="getData")
    router-view(:data="data")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private data: any = {};

  private config = {
    sheet: [
      {
        id: 'anmel_rep_bestbrief',
        icon: 'menu',
        label: 'Bestätigungsbrief generieren und Drucken',
        click: this.sheetClick
      },
      {
        id: 'anmel_rep_infobrief',
        icon: 'menu',
        label: 'Infobrief generieren und Drucken',
        click: this.sheetClick
      },
      {
        id: 'anmel_abmelden',
        icon: 'menu',
        label: 'Person abmelden',
        click: this.sheetClick
      },
      {
        id: 'anmel_nachrücken',
        icon: 'menu',
        label: 'Nachrücken lassen',
        click: this.sheetClick
      }
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
        label: 'Sonstiges',
        to: 'sonstiges'
      }
    ],
    title: 'ANMELDUNGNAME',
    subTitle: 'Anmeldung'
  };

  private getData() {
    // TODO: GET DATA FROM API
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
