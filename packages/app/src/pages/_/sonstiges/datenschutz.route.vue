<template lang="pug">
  ec-wrapper(v-bind="config")
    | Content
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  private config = {
    title: 'Datenschutzerklärung'
  }

  private sheetClick(item: {label: string}) {}
}
</script>
