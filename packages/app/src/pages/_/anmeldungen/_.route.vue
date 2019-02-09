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
        id: 'anmel_add',
        icon: 'menu',
        label: 'Anmeldung eingeben',
        click: this.sheetClick
      }
    ],
    title: 'Anmeldungen'
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
