<template lang="pug">
  ec-wrapper(title="Home")
    v-container(fluid)
    v-layout(row wrap)

      v-flex(d-flex xs12 sm6 md4 px-2 pb-3)
        v-card
          v-card-title
            span(class="title font-weight-black") Hinweise
            v-spacer
            v-icon(class="ml-3" size="48" color="primary") info
          v-card-text Bitte vor schließen des Tabs abmelden!

      v-flex(d-flex xs12 sm6 md4 px-2 pb-3)
        v-card
          v-card-title
            span(class="display-2 font-weight-black mr-1" v-text="countRecentAnmeldungen") 
            v-layout(row align-baseline)
              v-layout(column align-start)
                span(class="caption grey--text text-uppercase") seit 7 Tagen
                span(class="title text-uppercase" style="line-height:20px") Anmeldung{{countRecentAnmeldungen===1?'':'en'}}
            v-spacer
            v-icon(class="ml-3" size="48" color="primary") assignment_ind

          v-progress-linear(:active="isLoading" indeterminate height="3" class="ma-0")

          v-sheet(color="transparent")
            v-sparkline(
              :value="anmeldungPerWeek"
              :smooth="8"
              :radius="8"
              :padding="16"
              :gradient="['#365E36', '#365E36']"
              auto-draw
              stroke-linecap="round")

      v-flex(d-flex xs12 sm6 md4 px-2 pb-3)
        v-card
          v-card-title
            span(class="title font-weight-black") Nächste Veranstaltungen
            v-spacer
            v-icon(class="ml-3" size="48" left color="primary") event
        
          v-progress-linear(:active="isLoading" indeterminate height="3" class="ma-0")

          v-list(two-line)
            template(v-for="item in data.veranstaltungen.sort(sortDates)")
              v-list-tile(:key="item.veranstaltungsID" avatar @click="")
                v-list-tile-avatar(color="primary" v-white)
                  strong {{item.kurzBezeichnung}}
                v-list-tile-content
                  v-list-tile-title {{item.bezeichnung}}
                  v-list-tile-sub-title in 8 Tagen 
              //- v-list-tile(avatar @click="")
              //-   v-list-tile-avatar(color="primary" v-white)
              //-     strong JEF
              //-   v-list-tile-content
              //-     v-list-tile-title  Jung Erwachsenen Freizeit 2019
              //-     v-list-tile-sub-title in 16 Tagen
              //- v-list-tile(avatar @click="")
              //-   v-list-tile-avatar(color="primary" v-white)
              //-     strong TO
              //-   v-list-tile-content
              //-     v-list-tile-title TeenOut 2019
              //-     v-list-tile-sub-title in 32 Tagen




</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndexHome extends Vue {
  private data: any = {
    anmeldungen: [],
    veranstaltungen: [],
  };


  private isLoading: boolean = false;

  private get countRecentAnmeldungen(): number {
    return this.data.anmeldungen.filter(this.filterLastWeek).length
  }

  private get anmeldungPerWeek(): number[] {
    return [4,1,4,2,5,8,9];
  }

  private filterLastWeek(amld: any) {
    const today = new Date();
    const prior = new Date().setDate(today.getDate()-7);
    const curr = new Date(
      amld.anmeldeZeitpunkt.year,
      amld.anmeldeZeitpunkt.month-1,
      amld.anmeldeZeitpunkt.day)
    
    return curr.getTime() - prior > 0
  }

  private sortDates(a: any, b: any): number {
    if (a.begin.year === b.begin.year) {
      if (a.begin.month === b.begin.month) {
        return b.begin.day - a.begin.day;
      } else {
        return b.begin.month - a.begin.month;
      }
    } else {
      return b.begin.year - a.begin.year;
    }
  }

  private loadData() {
    this.isLoading = true;

    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          anmeldungen(authToken: $authToken) {
            anmeldeZeitpunkt {
              day
              month
              year
            }
          }
          veranstaltungen(authToken: $authToken) {
            veranstaltungsID
            kurzBezeichnung
            bezeichnung
            begin {
              day
              month
              year
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data.anmeldungen = res.data.anmeldungen;
      this.data.veranstaltungen = res.data.veranstaltungen;
      setTimeout(() => (this.isLoading = false), 300);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
      this.isLoading = false;
    });
  }

  private created() {
    this.loadData();
  }
}
</script>