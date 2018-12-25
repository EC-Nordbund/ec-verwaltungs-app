import auth from '@/plugins/auth';
import select_base from '@/realPlugins/lib/formElements/inputs/selects/base';
import gql from 'graphql-tag';
import { CreateElement } from 'vue';
import { Component, Emit, Vue } from 'vue-property-decorator';

/**
 * PErsonen Select
 *
 * @export
 * @class personSelect
 * @extends {select_base}
 */
@Component({})
export default class personSelect extends select_base {
  /**
   * Created Hook
   *
   * @memberof personSelect
   */
  created() {
    this.query = gql`
      query($authToken: String!) {
        personen(authToken: $authToken) {
          personID
          vorname
          nachname
          gebDat {
            german
          }
        }
      }
    `

    this.queryName = 'personen'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {
      personID: number
      vorname: string
      nachname: string
      gebDat: { german: string }
    }) => {
      return {
        id: item.personID,
        beschreibung: `${item.vorname} ${item.nachname} (${
          item.gebDat.german
        })`
      }
    }

    super.created()
  }

  /**
   * Redner Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof personSelect
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
