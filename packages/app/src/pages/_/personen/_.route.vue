<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData") 
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Person suchen" @suche="suche = $event")
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
    ]` :items = "data.filter($util.filter(suche))" :rows-per-page-items="[rowCount]" )
      template(#items="props")
        tr(@click="$router.push({path: `/personen/${props.item.personID}/home`, query: {prev: $route.fullPath}})" :class="'geschlecht-' + props.item.geschlecht")
          td {{props.item.vorname}} 
          td {{props.item.nachname}} 
          td {{props.item.gebDat.german}}
    template(#dialogs)
      ec-add-person(ref="addPerson")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  public suche = '';

  public rowCount = 0;
  private data: any = [];

  private config = {
    sheet: [
      {
        id: 'pers_add',
        icon: 'person_add',
        label: 'Person hinzufügen',
        click: () => {(this.$refs.addPerson as any).show(); }
      }
    ],
    title: 'Personen',
    subTitle: 'Liste'
  };

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
        authToken: this.$authToken()
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
    this.getCount();
  }

  private getCount() {
    const tableHeight = window.innerHeight - 64 - 80 - 72 - 32 - 56 - 36 - 50 - 5;
    this.rowCount = Math.floor(tableHeight / 50);
  }
}
</script>
<style>
.geschlecht-w {
  background-color: #f000a0;
  opacity: .9;
}
.geschlecht-m {
  background-color: #00a0f0;
  opacity: .9;
}
</style>
