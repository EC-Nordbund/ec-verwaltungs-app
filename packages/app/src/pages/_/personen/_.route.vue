<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    ec-search(label="Person suchen" @suche="suche = $event" filter @filter="moreFilter")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  public suche = '';

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
  };

  public moreFilter() {
    // TODO
    alert('test');
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
