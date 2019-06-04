<template lang="pug">
  v-textarea(
    v-validate="schema.rule"
    :value="value"
    @input="changeValue"
    :data-vv-name="schema.name"
    :error-messages="errors.collect(schema.name)"
    v-bind="schema"
    v-on="schema.on || {}"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

// @ts-ignore
import { VTextarea } from 'vuetify/lib';

@Component({
  components: {
    VTextarea,
  },
})
export default class FormTextarea extends Mixins(abstractField) {}
</script>
