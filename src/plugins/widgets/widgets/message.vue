<template>
  <div>
    <h1 v-font v-primary>{{config.msg}}</h1>
  </div>
</template>
<script lang="ts">
import {
  widget,
  widgetComponent
} from '@/plugins/widgets/widgets/index.ts'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class message extends widgetComponent {}

export default message

new widget([], 'msg', message)
</script>
<style scoped>
h1 {
  text-align: center;
  grid-area: c;
}
div {
  display: grid;
  grid-template-rows: 1fr auto 1fr;
  grid-template-areas: '.' 'c' '.';
}
</style>
