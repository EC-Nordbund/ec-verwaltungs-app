<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    | Content
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  
  private config = {
    sheet: [
      {
        id: 'ak_m_add',
        icon: 'menu',
        label: 'AK Mitglied hinzufügen',
        click: this.sheetClick
      },
      {
        id: 'ak_m_update',
        icon: 'menu',
        label: 'AK Mitglied updaten',
        click: this.sheetClick
      },
      {
        id: 'ak_m_del',
        icon: 'menu',
        label: 'AK Mitglied entfernen',
        click: this.sheetClick
      },
      {
        id: 'ak_rep_current',
        icon: 'menu',
        label: 'Aktuelle AK Mitglieder Report',
        click: this.sheetClick
      },
      {
        id: 'ak_rep_all',
        icon: 'menu',
        label: 'Alle AK Mitglieder Report',
        click: this.sheetClick
      }
    ],
    title: 'AKNAME',
    subTitle: 'Arbeitskreis'
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
