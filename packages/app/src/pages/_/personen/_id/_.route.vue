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
      {
        icon: 'menu',
        id: 'pers_add_adresse',
        label: 'Adresse hinzufügen'
      },
      {
        icon: 'menu',
        id: 'pers_merge_adresse',
        label: 'Adresse Mergen'
      },
      {
        icon: 'menu',
        id: 'pers_add_email',
        label: 'Email hinzufügen'
      },
      {
        icon: 'menu',
        id: 'pers_add_telefon',
        label: 'Telefon hinzufügen'
      },
      {
        icon: 'menu',
        id: 'pers_merge_telefon',
        label: 'Telefon mergen'
      },
      {
        icon: 'menu',
        id: 'pers_merge',
        label: 'Person mergen'
      },
      {
        icon: 'menu',
        id: 'pers_create_fz_antrag',
        label: 'FZ-Antrag generieren'
      },
      {
        icon: 'menu',
        id: 'pers_add_fz',
        label: 'FZ Eintragen'
      },
      {
        icon: 'menu',
        id: 'pers_edit_stamm',
        label: 'Stammdaten editieren'
      },
      {
        icon: 'menu',
        id: 'pers_edit_kategor',
        label: 'Kategorien editieren'
      },
      {
        icon: 'menu',
        id: 'pers_edit_sonstiges',
        label: 'Sonstiges editieren'
      },
      {
        icon: 'menu',
        id: 'pers_old_Adresse',
        label: 'Adresse als veraltet makieren'
      },
      {
        icon: 'menu',
        id: 'pers_old_Telefon',
        label: 'Telefon als veraltet makieren'
      },
      {
        icon: 'menu',
        id: 'pers_old_Email',
        label: 'E-Mail als veraltet makieren'
      },
      {
        icon: 'menu',
        id: 'pers_report',
        label: 'Report erzeugen'
      }
    ].map((v) => ({click: this.sheetClick, ...v})),
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
        label: 'Sonstiges',
        to: 'sonstiges'
      }
    ],
    title: 'PERSONENNAME',
    subTitle: 'Person'
  };

  private sheetClick(item: {id: string}) {
    alert(item.id);
  }
}
</script>
