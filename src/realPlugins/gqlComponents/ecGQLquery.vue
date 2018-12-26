<template>
  <div>
    <slot v-if="data" :data="data" :reloading="reloading" :refetch="refetch"/>
    <slot name="loading" v-if="loading || reloading" :loading="loading" :reloading="reloading">
      Laden...
    </slot>
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
export default class ecGQLquery extends Vue {
  auth = auth

  @Prop({ type: Object, default: () => ({}) })
  variables!: any

  query: any

  data: any = {}
  errored = false
  reloading = false
  loading = true

  @Watch('variables', { immediate: true })
  async doQuery() {
    if (!this.query) {
      this.query = gql`
        ${this.$slots.query[0].text}
      `
    }

    if (!this.loading) {
      this.reloading = true
    }

    const data = await this.$getApolloClient()
      .query({
        query: this.query,
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
      this.reloading = false
      this.data = data.data
    }
  }

  public refetch(){
    this.doQuery()
  }
}
</script>
