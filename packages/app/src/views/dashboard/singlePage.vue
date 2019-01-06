<template>
  <v-card-text>
    <ec-widget-container v-for="(widget, index) in config" :config="widget" :key="index"/>
  </v-card-text>
</template>
<script lang="ts">
import config from '@/config/dashboard'
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'

@Component({})
export default class singlePage extends Vue {
  config:Array<any> = []
  created(){
    this.config = config[parseInt(this.$route.params.id)]
  }
}
</script>
