<template lang="pug">
  formular-dialog(v-bind="$ecForm[name]" ref="form")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  @Prop()
  private name!: string;

  public show(...args: Array<any>) {
    return this.$refs.form.show(...args)
  }
}
</script>