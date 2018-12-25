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
export default class vOrtSelect extends select_base {
  /**
   * Created
   *
   * @memberof akSelect
   */
  created() {
    this.query = gql`
      query($authToken: String!) {
        vorte(authToken: $authToken) {
          vOrtID
          bezeichnung
          ort
          land
        }
      }
    `

    this.queryName = 'vorte'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: any) => {
      return {
        id: item.vOrtID,
        beschreibung: `${item.bezeichnung} (${item.ort} - ${
          item.land
        })`
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
