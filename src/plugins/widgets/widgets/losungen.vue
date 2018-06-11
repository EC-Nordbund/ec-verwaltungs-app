<template>
  <v-card>
    <v-card-title>
      <h2 v-font style="text-align: center" v-primary>Losung</h2>
    </v-card-title>
    <v-card-text style="display: grid; grid-template-rows: 1fr 1fr 1fr">
      <div>
        <span v-primary v-html="losung[0]" :style="{fontSize: '16px'}"/><br>
        <b class="right" v-html="losung[1]"/>
      </div>
      <div/>
      <div>
        <span v-primary v-html="losung[2]" :style="{fontSize: '16px'}"/><br>
        <b class="right" v-html="losung[3]"/>
      </div>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import {
  widget,
  widgetComponent
} from '@/plugins/widgets/widgets/index.ts'
import { Component, Vue } from 'vue-property-decorator'

@Component({})
class losungen extends widgetComponent {
  losung: Array<string> = []

  created() {
    window
      .fetch('http://www.losungen.de/heute.php')
      .then((v: any) => v.text())
      .then((v: any) => v.split('tr'))
      .then((v: any) => {
        return [
          v[9].split('<b>')[1].split('</b>')[0],
          v[9]
            .split('<b>')[1]
            .split('<br>')[1]
            .split('</font>')[0],
          v[13].split('<b>')[1].split('</b>')[0],
          v[13]
            .split('<b>')[1]
            .split('<br>')[1]
            .split('</font>')[0]
        ]
      })
      .then((v: any) => {
        this.losung = v
      })
  }
}

export default losungen

new widget([], 'losung', losungen)
</script>
<style scoped>
.right {
  text-align: right;
}
</style>
