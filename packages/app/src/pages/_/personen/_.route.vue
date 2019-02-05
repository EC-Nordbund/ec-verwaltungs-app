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
        id: 'pers_add',
        icon: 'menu',
        label: 'Person hinzufügen',
        click: this.sheetClick
      }
    ],
    title: 'Personen'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
