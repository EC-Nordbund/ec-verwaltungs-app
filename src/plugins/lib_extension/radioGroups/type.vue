<template>
  <ec-form-radio :items="items" v-bind="$attrs" v-on="$listeners"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class typeRadio extends Vue {
  items = [
    {label: "An", value: 1},
    {label: "CC", value: 2},
    {label: "BCC", value: 3}
  ]
} 
</script>
