<template lang="pug">
  v-autocomplete(
    v-validate="handleRule(schema.rule)"
    :value="value"
    @change="changeValue"
    @click:append="schema.clickAppend"
    @click:prepend="schema.clickPrepend"
    @click:append-outer="schema.clickAppendOuter"
    @click:prepend-inner="schema.clickPrependInner"
    :data-vv-name="schema.label"
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
