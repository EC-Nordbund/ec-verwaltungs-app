<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData") 
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Person suchen" @suche="suche = $event" filter @filter="moreFilter")
    v-data-table(:headers=`[
      {
        text: 'Vorname',
        value: 'vorname'
      },
      {
        text: 'Nachname',
        value: 'nachname'
      },
      {
        text: 'GebDat',
        value: 'gebDat.input'
      }
    ]` :items = "data.filter(filterData)" )
      template( #items="props")
        tr(@click="$router.push({path: `/personen/${props.item.personID}/home`, query: {prev: $route.fullPath}})" :class="'geschlecht-' + props.item.geschlecht")
          td {{props.item.vorname}} 
          td {{props.item.nachname}} 
          td {{props.item.gebDat.german}}
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag'

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  public suche = '';
  private data: any = [];

  private config = {
    sheet: [
      {
        id: 'pers_add',
        icon: 'menu',
        label: 'Person hinzufügen',
        click: this.sheetClick
      },
      {
        icon: 'menu',
        id: 'pers_report',
        label: 'Report erzeugen',
        click: this.sheetClick
      }
    ],
    title: 'Personen'
  };

  public moreFilter() {
    // TODO
    alert('test');
  }

  private sheetClick(item: {id: string}) {alert(item.id); }

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken:String!) {
          personen(authToken: $authToken) {
            personID
            vorname
            nachname
            gebDat {
              german
              input
            }
            geschlecht
          }
        }
      `,
      variables: {
        authToken: this.$authToken
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.personen;
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
}
</script>
<style scoped>
.geschlecht-w {
  background-color: #f000a0;
  opacity: .9;
}
.geschlecht-m {
  background-color: #00a0f0;
  opacity: .9;
}
</style>
