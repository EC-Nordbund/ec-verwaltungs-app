<template>
  <div class="ec-containerHeight">
    <ec-widget-container :config="config" v-model="edit"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { IConf } from '@/plugins/widgets/types.ts'

@Component({})
export default class Home extends Vue {
  window = window
  public edit: boolean = false
  public widgetSettings_open: boolean = false
  public config: Array<IConf> = [
    {
      id: 1,
      label: 'Allgemein',
      height: 5,
      width: 5,
      areas:
        "'danke danke danke danke danke' 'losung losung alert alert alert' 'losung losung alert alert alert' 'losung losung alert alert alert' 'losung losung alert alert alert'",
      elements: [
        {
          id: 1,
          label: 'test',
          area: 'danke',
          widgetName: 'msg',
          config: {
            msg:
              'Vielen Dank für deinen Einsatz für den EC-Nordbund.'
          }
        },
        {
          id: 2,
          label: 'losung',
          area: 'losung',
          widgetName: 'losung',
          config: {}
        },
        {
          id: 3,
          label: 'alert',
          area: 'alert',
          widgetName: 'alert',
          config: {}
        }
      ]
    }
  ]
}
</script>
<style scoped>
.ec-containerHeight {
  display: grid;
  height: 100%;
}
</style>
