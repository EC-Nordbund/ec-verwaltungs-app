<template lang="pug">
  v-autocomplete(
    v-validate="handleRule(schema.rule)"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    :value="value"
    @input="changeValue"
    :items="data.map(pers=>({value: pers.personID, text: `${pers.vorname} ${pers.nachname} (${pers.gebDat.german})`}))"

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
import gql from 'graphql-tag';

@Component({})
export default class FormSelect extends Mixins(abstractField) {
  private data = [];
}
</script>
