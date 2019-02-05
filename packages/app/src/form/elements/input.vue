<template lang="pug">
  v-text-field(
    v-validate="handleRule(schema.rule)"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    :value="value"
    @input="changeValue"

    @click:append="schema.clickAppend"
    @click:prepend="schema.clickPrepend"
    @click:append-outer="schema.clickAppendOuter"
    @click:prepend-inner="schema.clickPrependInner"
    
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormInput extends Mixins(abstractField) {}
</script>
