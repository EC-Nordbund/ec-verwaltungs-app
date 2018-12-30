<template>
  <v-btn icon @click="onBtnClick">
    <v-icon>{{isInLesezeichen ? 'star' : 'star_border'}}</v-icon>
  </v-btn>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class addLesezeichen extends Vue {
  isInLesezeichen: boolean = false

  destroyed() {
    this.$liste.removeAllListeners('changed')
  }

  mounted() {
    this.$liste.on('changed', () => {
      this.isInLesezeichen = this.$liste.contains({
        elID: this.elID,
        type: this.type,
        label: this.label,
        route: this.route
      })
    })
    this.isInLesezeichen = this.$liste.contains({
      elID: this.elID,
      type: this.type,
      label: this.label,
      route: this.route
    })
  }

  onBtnClick() {
    if (this.isInLesezeichen) {
      this.$liste.delete({
        elID: this.elID,
        type: this.type,
        label: this.label,
        route: this.route
      })
    } else {
      this.$liste.add({
        elID: this.elID,
        type: this.type,
        label: this.label,
        route: this.route
      })
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
