<template>
  <v-radio-group v-model="intern_value" v-bind="$attrs">
    <v-radio v-for="(item, index) in items" :label="item.label" :value="item.value" :style="'color:' + item.color + '!important'" :key="index"/>
  </v-radio-group>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class radio extends Vue {
  intern_value: string|number = ""

  @Prop({
    type: [String, Number],
    required: false,
    default: ''
  })
  value!: string|number
  
  @Prop({
    type: Array,
    required: true
  })
  items!: Array<{
    label: string
    value: string
    color: string
  }>

  @Watch('value', {immediate: true})
  onValueChange(value: string) {
    this.intern_value = value
  }

  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value:string) {}
}
</script>