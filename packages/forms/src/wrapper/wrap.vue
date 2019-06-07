<template lang="pug">
  formular-dialog(v-bind="$ecForm[name]" ref="form" :parentData="parentData")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  @Prop()
  private name!: string;

  public show(...args: any[]) {
    return (this.$refs.form as any).show(...args);
  }

  @Prop({
    required: false,
    default: {}
  })
  public parentData!: any;
}
</script>