<template>
  <v-btn color="primary" dark absolute bottom right fab ripple v-on="$listeners" v-bind="$attrs">
    <v-icon>add</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AddButton extends Vue {}
</script>
