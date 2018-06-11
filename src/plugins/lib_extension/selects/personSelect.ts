import { CreateElement } from 'vue';
import {
  Component,
  Vue,
  Emit
} from 'vue-property-decorator';
import select_base from '@/plugins/lib/formElements/selects/select';
import auth from '@/plugins/auth';

import gql from 'graphql-tag';

@Component({})
export default class personSelect extends select_base {
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
    `;

    this.queryName = 'personen';

    this.variabels = {
      authToken: auth.authToken
    };

    this.mapper = (item: {
      personID: number;
      vorname: string;
      nachname: string;
      gebDat: { german: string };
    }) => {
      return {
        id: item.personID,
        beschreibung: `${item.vorname} ${item.nachname} (${
          item.gebDat.german
        })`
      };
    };

    super.created();
  }

  render(h: CreateElement) {
    return h('v-select', {
      props: {
        items: this.items,
        value: this.select,
        'single-line': true,
        'item-text': 'beschreibung',
        'item-value': 'id',
        ...this.$attrs,
        autocomplete: true
      },
      attrs: {
        ...this.$attrs
      },
      on: {
        input: (val: any) => {
          this.select = val;
        }
      }
    });
  }
}
