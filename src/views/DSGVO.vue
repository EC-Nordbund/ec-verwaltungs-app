<template>
  <v-dialog :value="true">
    <v-card>
      <v-card-title>
        Datenschutzerklärung
      </v-card-title>
      <v-card-text v-html="data.text"/>
      <v-card-actions>
        <v-spacer/><v-btn>Ich stimme der Datenschutzerklärung zu.</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class dsgvo extends Vue {
  data= {
    id: -1,
    text: 'Loading...'
  }
  async created(){
    const fetcher = await fetch('https://h2778646.stratoserver.net:4000/dsgvo')
    const res = await fetcher.json()
    this.data = res
  }
}
</script>
