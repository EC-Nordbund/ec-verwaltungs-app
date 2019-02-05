<template lang="pug">
  v-textarea(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @change="changeValue"
    @click:append="schema.clickAppend"
    @click:prepend="schema.clickPrepend"
    @start="schema.movementStarts"
    @end="schema.movementStoped"
    :data-vv-name="schema.name"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormSlider extends Mixins(abstractField) {}
</script>
