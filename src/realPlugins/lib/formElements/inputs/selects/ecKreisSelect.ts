import auth from '@/plugins/auth';
import select_base from '@/realPlugins/lib/formElements/inputs/selects/base';
import gql from 'graphql-tag';
import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';


/**
 * AK-Select
 *
 * @export
 * @class akSelect
 * @extends {select_base}
 */
@Component({})
export default class ecKreisSelect extends select_base {
  /**
   * Created
   *
   * @memberof akSelect
   */
  created() {
    this.query = gql`
      query($authToken: String!) {
        ecKreise(authToken: $authToken) {
          ecKreisID
          bezeichnung
        }
      }
    `

    this.queryName = 'ecKreise'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {
      ecKreisID: number
      bezeichnung: string
    }) => {
      return {
        id: item.ecKreisID,
        beschreibung: item.bezeichnung
      }
    }

    super.created()
  }

  /**
   * RenderFunktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof akSelect
   */
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
