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
        id: 'user_add',
        icon: 'person_add',
        label: 'Benutzer hinzufügen',
        click: this.sheetClick
      }
    ],
    title: 'Admin'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
