<template>
  <v-card class="elevation-10" style="margin: 5px">
    <v-card-title @click="openL" style="cursor: pointer;">
      <h1 v-font v-primary :style="{ textAlign: 'center' }">
        Die Losungen
      </h1>
      <v-spacer/>
      <img width="64px" src="../../../../public/losung.png"/>
    </v-card-title>
    <template v-if="$require.isElectron">
      <v-card-text v-if="losung.length > 0" :style="{ display: 'grid', gridTemplateRows: 'auto auto auto', gridGap: '20px' }">
        <div>
          <span v-font v-primary v-html="losung[0]" :style="{ fontSize: '16px' }" />
          <br/>
          <b v-font v-html="losung[1]" class="right"/>
        </div>
        <div>
          <span v-font v-primary v-html="losung[2]" :style="{ fontSize: '16px' }"/>
          <br/>
          <b v-font v-html="losung[3]" class="right"/>
        </div>
        <div v-font :style="{fontSize: '12px'}">
          <a @click="openH">© Evangelische Brüder-Unität – Herrnhuter Brüdergemeine</a>
        </div>
      </v-card-text>
      <v-card-text v-if="losung.length === 0" :style="{display: 'grid', gridTemplateColumns: 'auto 1fr', gridGap: '10px'}">
        <v-progress-circular indeterminate color="primary"/>
        <div v-font v-primary :style="{ fontSize: '22px' }">
          Loading...
        </div>
      </v-card-text>
    </template>
    <v-card-text v-if="!$require.isElectron">
      <span v-font v-primary :style="{ fontSize: '16px' }">Leider werden die Losungen im Browser nicht unterstützt... Nutze dafür bitte unsere App!</span>
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

  async created() {
    if (this.$require.isElectron) {
      const res = await window.fetch(
        'https://www.losungen.de/heute.php'
      )
      const html = await res.text()
      const tableRows = html.split('<tr>')
      this.losung = [
        tableRows[5].split('<b>')[1].split('</b>')[0],
        tableRows[5]
          .split('<b>')[1]
          .split('<br>')[1]
          .split('</font>')[0],
        tableRows[7].split('<b>')[1].split('</b>')[0],
        tableRows[7]
          .split('<b>')[1]
          .split('<br>')[1]
          .split('</font>')[0]
      ]
    }
  }

  openL(){
    if (this.$require.isElectron) {
      this.$require.electron.shell.openExternal('www.losungen.de')
    }
  }
  openH(){
    if (this.$require.isElectron) {
      this.$require.electron.shell.openExternal('www.herrnhuter.de')
    }
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
