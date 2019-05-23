<template lang="pug">
  ec-wrapper(hasSheet hasDial hasHeader v-bind="config" hasReload @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Veranstaltung suchen" @suche="suche = $event")
    v-list(two-line)
      v-list-tile(v-for="item in data.filter(filterData).reverse()" :key="item.veranstaltungsID" @click="$router.push({path: `veranstaltungen/${item.veranstaltungsID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title {{item.bezeichnung}} (ID: {{item.veranstaltungsID}})
          v-list-tile-sub-title {{item.begin.german}} - {{item.ende.german}}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private suche = '';

  private config = {
    sheet: [
      {
        id: 'vera_add',
        icon: 'add',
        label: 'Veranstaltung hinzufügen',
        click: this.sheetClick
      }
    ],
    title: 'Veranstaltungen'
  };

  private data: any = [];

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          veranstaltungen(authToken: $authToken) {
            veranstaltungsID
            bezeichnung
            begin {
              german
            }
            ende {
              german
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    }).then((res: any) => {
      this.data = res.data.veranstaltungen;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private created() {
    this.loadData();
  }

  private filterData(item: any): boolean {
    return this.suche
      .toLowerCase()
      .split(' ')
      .map((suche: string) => this.filterPart(item, suche))
      .reduce((a, b) => a && b, true);
  }

  private filterPart(item: any, suche: string): boolean {
    if (!suche) {
      return true;
    }
    if (typeof item === 'string') {
      return item.toLowerCase().includes(suche);
    } else if (typeof item === 'number' || typeof item === 'boolean') {
      return item.toString().toLowerCase().includes(suche);
    } else if (item) {
      return Object.keys(item).map((key) => this.filterPart(item[key], suche)).reduce((a, b) => a || b, false);
    } else {
      return false;
    }
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
