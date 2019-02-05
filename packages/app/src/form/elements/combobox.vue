<template lang="pug">
  v-combobox(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @input="changeValue"
    @click:append="schema.clickAppend"
    @click:prepend="schema.clickPrepend"
    @click:append-outer="schema.clickAppendOuter"
    @click:prepend-inner="schema.clickPrependInner"
    :data-vv-name="schema.name"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormInput extends Mixins(abstractField) {}
</script>
