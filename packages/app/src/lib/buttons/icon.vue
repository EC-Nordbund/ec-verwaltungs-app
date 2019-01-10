<template>
  <v-btn icon v-bind="$attrs" v-on="$listeners">
    <v-icon color="secondary"> {{ icon }} </v-icon>
  </v-btn>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

/**
 * Einfacher Button mit Icon
 *
 * @export
 * @class IconButton
 * @extends {Vue}
 */
@Component({})
export default class ecIconBtn extends Vue {
  /**
   * Icon das angezeigt werden soll
   *
   * @type {string}
   * @memberof IconButton
   */
  @Prop({
    type: String,
    required: false,
    default: "edit"
  })
  icon!: string;
}
</script>
