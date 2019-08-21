<template lang="pug">
  ec-wrapper(hasSheet hasDial hasHeader v-bind="config" hasReload @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Veranstaltung suchen" @suche="suche = $event")
            
    v-progress-linear(:active="isLoading" indeterminate height="3" rounded)

    v-list(three-line)
      template(v-for="item in data.filter(filterData).sort(sortData)")
        v-list-tile(
          :key="item.veranstaltungsID"
          @click="$router.push({path: `veranstaltungen/${item.veranstaltungsID}/home`, query: {prev: $route.fullPath}})"
          avatar)

          //- Avatar: highlight future events
          v-list-tile-avatar(
            :color="daysToEvent(item) > 0 ? 'primary' : daysToEvent(item) == 15 ? 'accent' : undefined"
            class="hidden-xs-only")
            v-icon(:color="daysToEvent(item) > 0 ? 'white' : undefined") event

          v-list-tile-content
            //- Title: highlight events when they are today
            v-list-tile-title(:class="daysToEvent(item) == 0 ? 'accent--text font-weight-bold' : ''")
              v-icon(v-if="daysToEvent(item) == 0" size="20" color="accent") star
              | {{item.bezeichnung}}

            v-list-tile-sub-title
              v-progress-linear(
                v-if="item.anzahlPlaetze"
                :value="countMale(item)*100/item.anzahlPlaetze"
                :buffer-value="(countMale(item)+countFemale(item))*100/item.anzahlPlaetze"
                color="male"
                background-color="female"
                height="12"
                rounded
                class="seat-bar-background my-1 py-0 ")
            v-list-tile-sub-title
              | {{countAnmeldungen(item)}} Anmeldungen 
              | • {{formateDayCounter(item)}} 
              | • {{daysDifference(item.ende, item.begin) === 0 ? "Tagesveranstaltung" : daysDifference(item.ende, item.begin)+1 + "-tägige Veranstaltung"}}

              
        v-divider(class="hidden-md-and-up my-2")
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

  private isLoading: boolean = false;

  private seatBar = [0, 0];

  private formateDayCounter(e: any): string {
    const delta = this.daysToEvent(e);
    return delta < 0
      ? 'endete am ' + e.ende.german
      : delta > 1
      ? 'beginnt in ' + delta + ' Tagen'
      : delta === 1
      ? 'morgen'
      : 'heute';
  }

  private countAnmeldungen(e: any): number {
    return e.anmeldungen.filter((a: any) => a.wartelistenPlatz === 0).length;
  }

  private countMale(e: any): number {
    return e.anmeldungen.filter(
      (a: any) => a.person.geschlecht === 'm' && a.wartelistenPlatz === 0
    ).length;
  }

  private countFemale(e: any): number {
    return e.anmeldungen.filter(
      (a: any) => a.person.geschlecht === 'w' && a.wartelistenPlatz === 0
    ).length;
  }

  private loadData() {
    this.isLoading = true;
    this.$apolloClient
      .query({
        query: gql`
          query($authToken: String!) {
            veranstaltungen(authToken: $authToken) {
              veranstaltungsID
              bezeichnung
              anmeldungen {
                person {
                  geschlecht
                }
                wartelistenPlatz
              }
              anzahlPlaetze
              begin {
                day
                month
                year
                german
              }
              ende {
                 day
                month
                year
                german
              }
            }
          }
        `,
        variables: {
          authToken: this.$authToken()
        }
      })
      .then((res: any) => {
        // console.log(this.$authToken());

        this.data = res.data.veranstaltungen;
        setTimeout(() => (this.isLoading = false), 300);
      })
      .catch((err: any) => {
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

  private daysToEvent(e: any): number {
    const today = new Date();
    const begin = new Date(e.begin.year, e.begin.month - 1, e.begin.day);

    return Math.trunc(
      (begin.getTime() - today.getTime()) / 1000 / 60 / 60 / 24
    );
  }

  private daysDifference(a, b): number {
    const da = new Date(a.year, a.month - 1, a.day);
    const db = new Date(b.year, b.month - 1, b.day);

    return Math.trunc((da.getTime() - db.getTime()) / 1000 / 60 / 60 / 24);
  }

  private sortData(a: any, b: any): number {
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
      return item
        .toString()
        .toLowerCase()
        .includes(suche);
    } else if (item) {
      return Object.keys(item)
        .map(key => this.filterPart(item[key], suche))
        .reduce((a, b) => a || b, false);
    } else {
      return false;
    }
  }

  private sheetClick(item: { id: string }) {
    alert(item.id);
  }
}
</script>

<style scoped>
.seat-bar-background {
  background-color: #eee;
}
</style>
