<template>
  <v-switch
    v-model="intern_value"
    v-bind="$attrs"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class switchEl extends Vue {
  intern_value: boolean = false

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  value!: boolean
  
  @Watch('value', {immediate: true})
  onValueChange(value: boolean) {
    this.intern_value = value
  }

  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value:boolean) {}
}
</script>
