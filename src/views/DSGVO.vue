<template>
  <v-dialog :value="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <h1 v-font v-primary>
          Datenschutzerklärung (Version {{data.id}})
        </h1>
      </v-card-title>
      <v-card-text id="content" v-if="data.id!==-1" v-html="data.text"/>
      <v-card-text v-if="data.text===''">
        Es scheint Probleme mit unserem Server zu geben. 
        Bitte starte das Programm erneut.
      </v-card-text>
      <v-card-actions v-if="data.id!==-1">
        <v-spacer/>
        <v-btn @click="accept">
          Ich stimme der Datenschutzerklärung zu.
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class dsgvo extends Vue {
  data = {
    id: -1,
    text: ''
  }
  async created() {
    const fetcher = await fetch(
      'https://h2778646.stratoserver.net:4000/dsgvo'
    )
    const res = await fetcher.json()
    this.data = res
  }

  show: boolean = true

  accept() {
    this.show = false
    console.log('....')
  }
}
</script>
<style>
  #content h2 {
    font-family: ec-font;
  }
  #content b {
    font-size: 16pt;
  }
</style>