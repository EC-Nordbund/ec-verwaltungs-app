<template lang="pug">
  v-checkbox(
    v-validate="schema.rule"
    
    :value="value"
    @input="changeValue"
    
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    v-bind="schema"
    v-on="schema.on ||{}"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';
// @ts-ignore
import { VCheckbox } from 'vuetify/lib';

@Component({
  components: {
    VCheckbox,
  },
})
export default class FormCheckbox extends Mixins(abstractField) {}
</script>
