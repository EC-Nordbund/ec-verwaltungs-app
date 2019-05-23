<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData") 
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Anmeldung suchen" @suche="suche = $event")
    v-data-table(:headers=`[
      {
        text: 'AnmeldeID',
        value: 'anmeldeID',
        width: '75px'
      },
      {
        text: 'Person',
        value: 'person.personID',
        width: '45%'
      },
      {
        text: 'Veranstaltung',
        value: 'veranstaltung.veranstaltungsID',
        width: '45%'
      }
    ]` :items = "data.filter($util.filter(suche))" :rows-per-page-items="[rowCount]")
      template( #items="props")
        tr(@click="$router.push({path: `/anmeldungen/${props.item.anmeldeID}/home`, query: {prev: $route.fullPath}})")
          td {{props.item.anmeldeID}}
          td {{props.item.person.vorname}} {{props.item.person.nachname}} ({{props.item.person.gebDat.german}})
          td {{props.item.veranstaltung.bezeichnung}} ({{props.item.veranstaltung.begin.german}} - {{props.item.veranstaltung.ende.german}})
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
@Component({})
export default class EcRootIndexAnmeldungenIndex extends Vue {
  public static meta = {};

  public rowCount = 0;

  private data: any = [];

  private suche = '';


  private config = {
    sheet: [
      {
        id: 'anmel_add',
        icon: 'assignment_ind',
        label: 'Anmeldung eingeben',
        click: this.sheetClick
      }
    ],
    title: 'Anmeldungen'
  };

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken:String!) {
          anmeldungen(authToken:$authToken) {
            anmeldeID
            person {
              personID
              vorname
              nachname
              gebDat {
                german
              }
            }
            veranstaltung {
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
        }
      `,
      variables: {
        authToken: this.$authToken()
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.anmeldungen;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private sheetClick(item: {id: string}) {alert(item.id); }

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
