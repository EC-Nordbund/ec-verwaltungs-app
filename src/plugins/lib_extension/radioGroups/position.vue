<template>
  <ec-form-radio :items="items" v-bind="$attrs" v-on="$listeners"/>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class geschlechtRadio extends Vue {
  items = [
    {label: "Teilnehmer", value: 1},
    {label: "Mitarbeiter", value: 2},
    {label: "Küchenmitarbeiter", value: 3},
    {label: "Küchenleitung", value: 4},
    {label: "Leiter", value: 5},
    {label: "Hauptleiter", value: 6}
  ]
} 
</script>
