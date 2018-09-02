<template>
  <v-dialog :value="ishow" persistent max-width="600px" v-if="!loading">
    <slot slot="activator"/>
    <v-card v-if="data!==null">
      <v-card-title>
        <h1 v-font v-primary>
          Datenschutzerklärung
        </h1>
      </v-card-title>
      <v-card-text id="content" v-if="data!==''" v-html="data"/>
      <v-card-text v-if="data===''">
        Es scheint Probleme mit unserem Server zu geben. 
        Bitte starte das Programm erneut.
      </v-card-text>
      <v-card-actions v-if="data!==''">
        <v-spacer/>
        <v-btn @click="accept" v-primary-bg>
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
  Prop,
  Watch
} from 'vue-property-decorator'

import auth from '@/plugins/auth'
import gql from 'graphql-tag'
import { getClient } from '@/plugins/apollo'

@Component({})
export default class dsgvo extends Vue {
  ishow = false
  data = ''

  @Prop({ type: Boolean, required: false, default: false })
  force!: boolean

  accept() {
    this.ishow = false
    getClient().mutate({
      mutation: gql`
        mutation($authToken: String!) {
          acceptsDSE(authToken: $authToken)
        }
      `,
      variables: {
        authToken: auth.authToken
      }
    })
  }

  @Watch('force', { immediate: true })
  onForceChange() {
    this.ishow = !this.force
    this.getData()
  }

  loading=true

  getData() {
    this.loading=true
    ;(<any>getClient())
      .query({
        query: gql`
        query{
          getDSE(authToken: "${auth.authToken}", force: ${
          this.force
        })
        }
      `
      })
      .then((v:{data: {getDSE: string}})=> v.data)
      .then((v:{getDSE: string}) => {
        this.data = v.getDSE
        this.loading=false
      })
  }

  @Watch('data', {})
  onDataChange(data: string | null) {
    if (data === null) {
      this.ishow = false
    }
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