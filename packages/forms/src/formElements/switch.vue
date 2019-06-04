<template lang="pug">
  v-switch(
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
import { VSwitch } from 'vuetify/lib';

@Component({
  components: {
    VSwitch,
  },
})
export default class FormSwitch extends Mixins(abstractField) {}
</script>
