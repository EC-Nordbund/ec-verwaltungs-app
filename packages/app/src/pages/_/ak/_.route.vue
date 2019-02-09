<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    ec-search(label="AK suchen" queryParam="suche" @suche="suche = $event")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootAKRoot extends Vue {
  public static meta = {};

  suche=""
  
  private config = {
    sheet: [
      {
        id: 'ak_add',
        icon: 'menu',
        label: 'AK hinzufügen',
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
    title: 'AK'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
