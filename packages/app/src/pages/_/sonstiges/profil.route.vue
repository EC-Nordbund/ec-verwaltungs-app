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
        id: 'pwd_change',
        icon: 'menu',
        label: 'Password ändern',
        click: this.sheetClick
      }
    ],
    title: 'Profil'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
