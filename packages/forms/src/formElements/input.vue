<template lang="pug">
  v-text-field(
    v-validate="schema.rule"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    :value="value"
    @input="changeValue"

    v-on="schema.on||{}"
    v-bind="schema"

    :type="schema.typ"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

// @ts-ignore
import { VTextField } from 'vuetify/lib';

@Component({
  components: {
    VTextField,
  },
})
export default class FormInput extends Mixins(abstractField) {}
</script>
