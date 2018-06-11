<template>
  <v-card :style="{height: '100%', display: 'grid', 'grid-template-rows': `repeat(${config.height}, 1fr)`, gridTemplateColumns: `repeat(${config.width}, 1fr)`, gridTemplateAreas: config.areas, gridGap: '10px'}">
    <ec-widget-element v-for="el in config.elements" :key="el.id" :config="el"/>
  </v-card>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop
} from 'vue-property-decorator'

import { IConf } from '@/plugins/widgets/types.ts'

@Component({})
export default class widgetContainer extends Vue {
  @Prop({ required: true, type: [Array, Object] })
  config!: IConf
}
</script>
