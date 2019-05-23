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
        id: 'print_all',
        icon: 'print',
        label: 'Alles Drucken',
        click: this.sheetClick
      }
    ],
    title: 'Profil'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
