import { Component } from 'vue-property-decorator'
import select_base from '@/plugins/lib/formElements/selects/select'
import auth from '@/plugins/auth'

import gql from 'graphql-tag'
import { CreateElement } from 'vue'

@Component({})
export default class akSelect extends select_base {
  created() {
    this.query = gql`
      query($authToken: String!) {
        aks(authToken: $authToken) {
          akID
          bezeichnung
        }
      }
    `

    this.queryName = 'aks'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {
      akID: number
      bezeichnung: string
    }) => {
      return {
        id: item.akID,
        beschreibung: item.bezeichnung
      }
    }

    super.created()
  }
  render(h: CreateElement) {
    return h('v-autocomplete', {
      props: {
        items: this.items,
        value: this.select,
        'single-line': true,
        'item-text': 'beschreibung',
        'item-value': 'id',
        ...this.$attrs
      },
      attrs: {
        ...this.$attrs
      },
      on: {
        input: (val: any) => {
          this.select = val
        }
      }
    })
  }
}
