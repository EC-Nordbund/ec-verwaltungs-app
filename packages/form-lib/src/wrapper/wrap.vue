<template lang="pug">
  formular-dialog(v-bind="$ecForm[name]")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  @Prop()
  private name!: string;
}
</script>