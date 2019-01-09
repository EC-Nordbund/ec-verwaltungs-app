import auth from '@/plugins/auth';
import select_base from '@/realPlugins/lib/formElements/inputs/selects/base';
import gql from 'graphql-tag';
import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';

/**
 * Verteiler Select
 *
 * @export
 * @class verteilerSelect
 * @extends {select_base}
 */
@Component({})
export default class verteilerSelect extends select_base {
  /**
   * Created Hook
   *
   * @memberof verteilerSelect
   */
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

  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof verteilerSelect
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
