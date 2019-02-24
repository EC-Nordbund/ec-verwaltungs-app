<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config" @getData="getData")
    | Content
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private data: any = {};

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
  };

  private getData() {
    // TODO: GET DATA FROM API
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
