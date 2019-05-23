<template lang="pug">
  ec-wrapper(hasSheet hasDial hasHeader v-bind="config" hasReload @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Veranstaltung suchen" @suche="suche = $event")
    v-list(two-line)
      v-list-tile(v-for="item in data.filter(filterData)" :key="item.vOrtID" @click="$router.push({path: `veranstaltungsort/${item.vOrtID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title {{item.bezeichnung}} (ID: {{item.vOrtID}})
          v-list-tile-sub-title {{item.plz}} {{item.ort}} | {{item.land}}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndexVeranstaltungsortIndex extends Vue {
  public static meta = {};
  private config = {
    sheet: [
      {
        id: 'ver_ort_add',
        icon: 'add',
        label: 'Veranstaltungsort hinzufügen',
        click: this.sheetClick
      }
    ],
    title: 'Veranstaltungsorte'
  };

  private suche = '';
  private data: any = [];

  private sheetClick(item: {id: string}) {alert(item.id); }

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          vorte(authToken: $authToken) {
            vOrtID
            bezeichnung
            plz
            ort
            land
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    }).then((res: any) => {
      this.data = res.data.vorte;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
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

  private created() {
    this.loadData();
  }
}
</script>
