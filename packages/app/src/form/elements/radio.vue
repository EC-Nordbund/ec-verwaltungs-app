<template lang="pug">
  v-radio-group(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @change="changeValue"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
  )
    v-radio(
      v-for="radio in schema.radios" 
      v-bind="radio" 
      :key="radio.value"
    )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormRadio extends Mixins(abstractField) {}
</script>
