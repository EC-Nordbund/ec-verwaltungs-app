<template lang="pug">
  v-checkbox(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @input="changeValue"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormCheckbox extends Mixins(abstractField) {}
</script>
