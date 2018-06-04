<template>
  <ec-form-radio :items="items" v-bind="$attrs" v-on="$listeners"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class geschlechtRadio extends Vue {
  items = [
    {label: "Männlich", value: "m", color: this.$vuetify.theme.male},
    {label: "Weiblich", value: "w", color: this.$vuetify.theme.female}
  ]
} 
</script>

