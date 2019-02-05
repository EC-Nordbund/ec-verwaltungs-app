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
        id: 'ver_ort_add',
        icon: 'menu',
        label: 'Veranstaltungsort hinzufügen',
        click: this.sheetClick
      }
    ],
    title: 'Veranstaltungsorte'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
