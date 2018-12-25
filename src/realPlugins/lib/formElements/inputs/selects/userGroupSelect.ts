import auth from '@/plugins/auth';
import select_base from '@/realPlugins/lib/formElements/inputs/selects/base';
import gql from 'graphql-tag';
import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';


/**
 * AK-Select
 *
 * @export
 * @class userGroup
 * @extends {select_base}
 */
@Component({})
export default class userGroup extends select_base {
  /**
   * Created
   *
   * @memberof userGroup
   */
  created() {
    this.query = gql`
      query($authToken: String!) {
        userGroups(authToken: $authToken) {
          userGroupID
          bezeichnung
        }
      }
    `

    this.queryName = 'userGroups'

    this.variabels = {
      authToken: auth.authToken
    }

    this.mapper = (item: {
      userGroupID: number
      bezeichnung: string
    }) => {
      return {
        id: item.userGroupID,
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
   * @memberof userGroup
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
