<template>
  <gql-query :variables="{force}">
    <template slot="query">
      query($authToken: String!, $force: Boolean!){
      getDSE(authToken: $authToken, force: $force)
      }
    </template>
    <template slot-scope="{data}">
      <v-dialog :value="show" :persistent="!force" max-width="600px" v-if="data.getDSE">
        <slot slot="activator"/>
        <v-card>
          <v-card-title>
            <h1 v-font v-primary>Datenschutzerklärung</h1>
          </v-card-title>
          <v-card-text id="content" v-html="data.getDSE"/>
          <v-card-actions>
            <v-spacer/>
            <gql-mutate v-if="!force" label="Ich stimme der Datenschutzerklärung zu.">
              <template slot="activation" slot-scope="{mutate}">
                <v-btn
                  @click="show=false;mutate"
                  v-primary-bg
                >Ich stimme der Datenschutzerklärung zu.</v-btn>
              </template>
              <template slot="query">
                mutation($authToken: String!) {
                acceptsDSE(authToken: $authToken)
                }
              </template>
              <template slot="loading"/>
              <template slot="error"/>
            </gql-mutate>
            <v-btn v-if="force" @click="isShow = false" v-primary-bg>Schließen</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <template slot="loading"/>
    <template slot="error"/>
  </gql-query>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch
} from 'vue-property-decorator'

@Component({})
export default class dsgvo extends Vue {
  show = false

  @Prop({ type: Boolean, required: false, default: false })
  force!: boolean

  @Watch('force', { immediate: true })
  onForceChange() {
    this.show = !this.force
  }
}
</script>
<style scoped>
#content h2 {
  font-family: ec-font;
}
#content b {
  font-size: 16pt;
}
</style>