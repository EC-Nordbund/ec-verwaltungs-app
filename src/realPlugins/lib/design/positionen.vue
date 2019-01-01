<template>
  <span>{{['Teilnehmer', 'Mitarbeiter', 'Küchenmitarbeiter', 'Küchenleitung', 'Leiter', 'Hauptleiter'][value-1]}}</span>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class position extends Vue {
  @Prop({type: Number, required: true})
  value!:number
}
</script>
