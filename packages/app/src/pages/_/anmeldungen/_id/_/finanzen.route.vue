<template lang="pug">
  v-card-text Hier kommen demnächst die Finanzinformationen. Da dafür aber viele Berechnungen gemacht werden müssen ist das etwas komplizierter.
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAnmeldungenIdIndexFinanzen extends Vue {
  public static meta = {};

  @Prop({default: {person: {}}})
  private data!: any;
}
</script>
