<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    ec-search(label="Person suchen" @suche="suche = $event" append-outer-icon="more_vert" @click:append-outer="moreFilter")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  suche='';

  moreFilter() {
    
  }

  private config = {
    sheet: [
      {
        id: 'pers_add',
        icon: 'menu',
        label: 'Person hinzufügen',
        click: this.sheetClick
      },
      {
        icon: 'menu',
        id: 'pers_report',
        label: 'Report erzeugen',
        click: this.sheetClick
      }
    ],
    title: 'Personen'
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
