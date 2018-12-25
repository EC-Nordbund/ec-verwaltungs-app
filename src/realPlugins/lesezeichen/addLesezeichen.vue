<template>
  <v-btn icon @click="onBtnClick">
    <v-icon>
      {{isInLesezeichen ? 'star' : 'star_border'}}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

import {
  Lesezeichen
} from '@/plugins/lesezeichen/lesezeichen.ts'

@Component({})
export default class App extends Vue {
  isInLesezeichen: boolean = false

  @Watch('lesezeichen.liste', {
    immediate: true
  })
  onLesezeichenChange() {
    this.isInLesezeichen =
      this.$liste.liste.filter(v => v.route === this.route)
        .length !== 0
  }

  onBtnClick() {
    if (this.isInLesezeichen) {
      this.$liste.delete(this.route)
    } else {
      this.$liste.addLesezeichen(
        new Lesezeichen(
          this.route,
          this.label,
          this.type,
          this.elID
        )
      )
    }
  }

  @Prop({
    type: String,
    required: true
  })
  route!: string

  @Prop({
    type: String,
    required: true
  })
  label!: string

  @Prop({
    type: String,
    required: true
  })
  type!: string

  @Prop({
    type: [String, Number],
    required: true
  })
  elID!: string
}
</script>
