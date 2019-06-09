<template lang="pug">
  formular-dialog(v-bind="config" ref="form")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class formularSelector extends Vue {
  @Prop()
  private name!: string;

  @Prop()
  private self!: any;

  private config = {
    title: '',
    initVal: {},
    schema: []
  }

  @Watch('name', {immediate: true})
  onNameChange() {
    const c = this.$ecForm[this.name];
    if(typeof (c) === 'function') {
      this.config = c(this.self)
    } else {
      this.config = c
    }
  }
  

  public show(...args: any[]) {
    return (this.$refs.form as any).show(...args);
  }
}
</script>