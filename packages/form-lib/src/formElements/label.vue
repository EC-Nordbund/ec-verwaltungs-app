<template lang="pug">
  component(
    :is="schema.tag || 'p'"
    v-text="schema.label"
    v-on="schema.on||{}"
    v-bind="schema"
  )
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

@Component({})
export default class FormInput extends Mixins(abstractField) {}
</script>
