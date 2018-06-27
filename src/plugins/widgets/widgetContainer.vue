<template>
  <div>
    <v-tabs v-if="config.length >= 2" class="ec-widgetContainer-grid" grow>
      <template v-for="tab in config">
        <v-tab :key="'h_' + tab.id">
          {{tab.label}}
        </v-tab>
        <v-tab-item :key="'c_' + tab.id">
          <ec-widget-tab :config="tab" :style="{height: '100%'}"/>
        </v-tab-item>
      </template>
    </v-tabs>
    <ec-widget-tab v-else-if="config.length === 1" :config="config[0]"/>
    <div v-else>Keine Widget-Configuration gefunden...</div>
    <ec-widget-container-settings v-model="showDialog" :config="config"/>
  </div>
</template>
<script lang="ts">
import {
  Vue,
  Component,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'

import { IConf } from '@/plugins/widgets/types.ts'

@Component({})
export default class widgetContainer extends Vue {
  showDialog: boolean = false

  @Prop({ required: true, type: Array })
  config!: Array<IConf>

  @Prop({ required: true, type: Boolean })
  value!: boolean

  @Watch('value')
  onValueChange() {
    this.showDialog = this.value
  }

  @Watch('showDialog')
  @Emit('input')
  onShowDialofChange(val: boolean) {}
}
</script>
<style lang="scss">
.ec-widgetContainer-grid {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  .v-tabs__items {
    display: grid;
    .tabs__content {
      height: 100%;
    }
  }
}
</style>
