<template>
  <div>
    <slot name="activation" :mutate="doQuery">
      <v-btn @click="doQuery">
        {{label}}
      </v-btn>
    </slot>
    <slot name="loading" v-if="loading">
      Laden...
    </slot>
    <slot name="error" v-if="errored">
      <b>Bei einer Abfrage ist ein Fehler aufgetreten</b>
    </slot>
    <slot :data="data"/>
  </div>
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


@Component({})
export default class ecGQLmutate extends Vue {
  auth = auth

  @Prop({ type: Object, default: () => ({}) })
  variables!: any

  @Prop({ type: String, default: 'Speichern' })
  label!: string

  query: any

  data: any = {}
  errored = false
  loading = false

  async doQuery() {
    if (!this.query) {
      this.query = gql`
        ${this.$slots.query[0].text}
      `
    }

    const data = await this.$getApolloClient()
      .mutate({
        mutation: this.query,
        variables: {
          ...this.variables,
          authToken: auth.authToken
        }
      })
      .catch(err => {
        this.$require.electron.remote.dialog.showErrorBox(
          'Bei der Abfrage von Daten ist ein Fehler aufgetreten!',
          err.toString()
        )
        this.errored = true
        return null
      })
    if (data) {
      this.loading = false
      this.data = data.data
    }
    this.$emit('done')
  }
}
</script>
