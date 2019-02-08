<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config")
    v-textfield(label="AK suchen")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  
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

  private sheetClick(item: {label: string}) {}
}
</script>
