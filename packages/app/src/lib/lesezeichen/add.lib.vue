<template lang="pug">
  v-btn(icon @click="toggleLesezeichen")
    v-icon star
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcLesezeichenAdd extends Vue {
  @Prop({type: String, required: true})
  title!: string

  @Prop({type: String, required: false})
  subTitle!: string

  toggleLesezeichen() {
    // TODO: Soon
    alert("Cooming Soon")
  }
}
</script>
