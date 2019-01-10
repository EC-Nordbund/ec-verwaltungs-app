<template>
  <div
    style="display: grid; grid-template-rows: 1fr auto 1fr; grid-template-columns: 1fr auto 1fr; grid-template-areas: '. . .' '. center .' '. . .'"
  >
    <h1 v-font v-primary style="grid-area: center">{{ config.text }}</h1>
  </div>
</template>
<script lang="ts">
import config from "@/config/dashboard";
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";

@Component({})
export default class ecWidgetHeadline extends Vue {
  @Prop({
    type: Object
  })
  config!: { text: string };
}
</script>
