<template>
  <v-btn 
    v-accent-bg dark 
    v-bind="$attrs"
    @click="click">
    <v-icon>keyboard_arrow_left</v-icon>
    Zurück
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class RouterBack extends Vue {
  click() {
    this.$router.back();
  }
}
</script>