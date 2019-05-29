<template lang="pug">
  v-radio-group(
    v-validate="schema.rule"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"
    
    :value="value"
    @change="changeValue"

    v-bind="schema"
    v-on="schema.on||{}"
  )
    v-radio(
      v-for="radio in schema.radios" 
      v-bind="radio" 
      v-on="radio.on||{}"
      :key="radio.value"
    )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

@Component({})
export default class FormRadio extends Mixins(abstractField) {}
</script>
