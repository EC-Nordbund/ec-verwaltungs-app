<template>
  <div>
    <slot v-if="data" :data="data" :reloading="reloading" :refetch="refetch"/>
    <slot
      name="loading"
      v-if="loading || reloading"
      :loading="loading"
      :reloading="reloading"
    >Laden...</slot>
    <slot name="error" v-if="errored">
      <b>Bei einer Abfrage ist ein Fehler aufgetreten</b>
    </slot>
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
export default class ecGQLwatch extends Vue {
  auth = auth

  @Prop({ type: Object, default: () => ({}) })
  variables!: any

  query: any

  data: any = {}
  errored = false
  reloading = false
  loading = true

  _query: any

  // @Watch('variables')
  // onVarChange() {
  //   this.loading = true
  //   this._query
  //     .setVariable({
  //       ...this.variables,
  //       authToken: auth.authToken
  //     })
  //     .then((val: any) => {
  //       this.loading = false
  //       this.data = val.data
  //     })
  // }

  async mounted() {
    if (!this.query) {
      this.query = gql`
        ${this.$slots.query[0].text}
      `
    }

    this._query = this.$getApolloClient().watchQuery({
      query: this.query,
      variables: {
        ...this.variables,
        authToken: auth.authToken
      }
    })

    if (this._query !== null) {
      // subscribe to response
      this._query.subscribe((val: any) => {
        if (val.data) {
          this.data = val.data
          this.loading = false
          this.reloading = false
        }
      }),
        (err: any) => {
          this.$require.electron.remote.dialog.showErrorBox(
            'Bei der Abfrage von Daten ist ein Fehler aufgetreten!',
            err.toString()
          )
        }
    }
  }

  public refetch() {
    this.reloading = true

    this._query.refetch().then((val: any) => {
      this.data = val.data
      this.reloading = false
    })
  }
}
</script>
