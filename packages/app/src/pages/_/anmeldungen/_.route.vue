<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData") 
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Anmeldung suchen" @suche="suche = $event")
    v-data-table(:headers=`[
      {
        text: 'AnmeldeID',
        value: 'anmeldeID',
        width: '20%'
      },
      {
        text: 'Person',
        value: 'person.personID',
        width: '30%'
      },
      {
        text: 'Veranstaltung',
        value: 'veranstaltung.veranstaltungsID',
        width: '30%'
      },
      {
        text: 'Datum',
        value: 'timestamp',
        width: '20%'
      },
    ]`
    :items = "data.filter($util.filter(suche))"
    :rows-per-page-items="[rowCount]"
    :loading="isLoading"
    :sort-by='timestamp') //- TODO: default timestamp sorting doesnt work
      template( #items="props")
        tr(@click="$router.push({path: `/anmeldungen/${props.item.anmeldeID}/home`, query: {prev: $route.fullPath}})")
          td {{props.item.anmeldeID}}
          td {{props.item.person.vorname}} {{props.item.person.nachname}}
          td {{props.item.veranstaltung.bezeichnung}}
          td {{('0' + props.item.timestamp.getDay()).slice(-2)}}.{{('0' + (props.item.timestamp.getMonth()+1)).slice(-2)}}.{{props.item.timestamp.getFullYear()}} {{('0' + props.item.timestamp.getHours()).slice(-2)}}:{{('0' + props.item.timestamp.getMinutes()).slice(-2)}}
          
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

  private isLoading: boolean = false;

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
    this.isLoading = true

    this.$apolloClient.query({
      query: gql`
        query($authToken:String!) {
          anmeldungen(authToken:$authToken) {
            anmeldeID
            anmeldeZeitpunkt {
              day
              month
              year
              h
              min
              s
            }
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
      res.data.anmeldungen.map(a => {
        a.timestamp = new Date(
          a.anmeldeZeitpunkt.year,
          a.anmeldeZeitpunkt.month+1,
          a.anmeldeZeitpunkt.day,
          a.anmeldeZeitpunkt.h,
          a.anmeldeZeitpunkt.min,
          a.anmeldeZeitpunkt.s
        )
        return a
      })
      this.data = res.data.anmeldungen;
      this.isLoading = false
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
      this.isLoading = false
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
