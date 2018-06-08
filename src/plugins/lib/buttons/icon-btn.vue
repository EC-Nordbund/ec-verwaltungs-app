<template>
  <v-btn icon v-on="$listeners" v-bind="$attrs">
    <v-icon color="secondary">{{icon}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';

@Component({})
export default class IconButton extends Vue {
  @Prop({
    type: String,
    required: false,
    default: 'edit'
  })
  icon!: string
}
</script>
