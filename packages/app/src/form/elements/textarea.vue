<template lang="pug">
  v-textarea(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @input="changeValue"
    :data-vv-name="schema.name"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormTextarea extends Mixins(abstractField) {}
</script>
