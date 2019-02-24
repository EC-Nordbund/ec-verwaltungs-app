<template lang="pug">
  v-text-field(
    v-validate="handleRule(schema.rule)"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    :value="value"
    @input="changeValue"

    type="password"

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
// import 

@Component({})
export default class FormPwd extends Mixins(abstractField) {}
</script>
