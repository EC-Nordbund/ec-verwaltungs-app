<template>
  <div class="ec-containerHeight">
    <v-toolbar>
      <v-spacer/>
      <ec-headline>
        Startseite
      </ec-headline>
      <v-spacer/>
      <ec-button-icon @click="edit = true"/>
    </v-toolbar>
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
      label: 'test',
      height: 5,
      width: 5,
      areas:
        "'danke danke danke danke danke' 'losung losung . . .' 'losung losung . . .' 'losung losung . . .' 'losung losung . . .'",
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
        }
      ]
    },
    {
      id: 2,
      label: 'test2',
      height: 5,
      width: 3,
      areas: '',
      elements: []
    }
  ]
}
</script>
<style scoped>
.ec-containerHeight {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}
</style>
