import { Component } from 'vue-property-decorator'
import select_base from '@/plugins/lib/formElements/selects/select'
import auth from '@/plugins/auth'

import gql from 'graphql-tag'
import { CreateElement } from 'vue'

@Component({})
export default class verteilerSelect extends select_base {
  created() {
    this.query = gql`
      query($authToken: String!) {
        verteilerList(authToken: $authToken) {
          verteilerID
          bezeichnung
        }
      }
    `

    this.queryName = 'verteilerList'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {
      verteilerID: number
      bezeichnung: string
    }) => {
      return {
        id: item.verteilerID,
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
