<template lang="pug">
  v-autocomplete(
    v-validate="schema.rule"
    :value="value"
    @change="changeValue"
    :data-vv-name="schema.label"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
    v-on="schema.on || {}"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';
// @ts-ignore
import { VAutocomplete } from 'vuetify/lib';

@Component({
  components: {
    VAutocomplete,
  },
})
export default class FormInput extends Mixins(abstractField) {}
</script>
