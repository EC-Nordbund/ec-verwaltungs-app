<template lang="pug">
  v-rating(
    v-validate="schema.rule"
    :value="value"
    @input="changeValue"
    :data-vv-name="schema.name"
    :data-vv-as="schema.label"
    :error-messages="errors.collect(schema.name)"

    v-bind="schema"
    v-on="schema.on || {}"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

// @ts-ignore
import { VRating } from 'vuetify/lib';

@Component({
  components: {
    VRating,
  },
})
export default class FormRating extends Mixins(abstractField) {}
</script>
