<template lang="pug">
  v-alert(
    v-bind="schema"
    :type="schema.color"
    :value="true"
  ) {{schema.text}}
</template>

<script lang="ts">
import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '../abstract';

@Component({})
export default class FormTextarea extends Mixins(abstractField) {}
</script>
