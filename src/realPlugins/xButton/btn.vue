<template>
  <v-btn icon @click="btnClick">
    <v-icon>
      close
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

import xButtonLogic from '@/realPlugins/xButton/logic'

@Component({})
export default class App extends Vue {
  xButtonLogic = xButtonLogic

  btnClick() {
    this.xButtonLogic.xButtonClick(this.$router)
  }
}
</script>