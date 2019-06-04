<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    template
      router-view(:data="data")
      v-menu(bottom left)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on") TN-Liste gnerieren
        v-list
          v-list-tile(@click="all")
            v-list-tile-title Alle (jeweils mit und ohne Warteliste)
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v==0)")
            v-list-tile-title {{item.label}}
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v>=0)")
            v-list-tile-title {{item.label}} mit Warteliste
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v>0)")
            v-list-tile-title {{item.label}} nur Warteliste
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v<0)")
            v-list-tile-title {{item.label}} nur Abgemeldete
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { generate, getTemplates } from '@/tnList';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {

  private get config() {
    return {
      sheet: [
      ],
      nav: [
        {
          icon: 'home',
          label: 'Allgemein',
          to: 'home'
        },
        {
          icon: 'euro_symbol',
          label: 'Finanzen',
          to: 'finanzen'
        },
        {
          icon: 'group',
          label: 'Anmeldungen',
          to: 'anmeldungen'
        }
      ],
      title: `${this.data.bezeichnung} (${this.data.begin.german} - ${this.data.ende.german})`,
      subTitle: 'Veranstaltung'
    };
  }
  public static meta = {};


  public data: any = {
    anmeldungen: [],
    begin: {},
    ende: {},
    veranstaltungsort: {}
  };

  private tnListen: any = [];
  private genList = generate;

  private all() {
    this.tnListen.forEach((el: {name: string, label: string}) => {
      this.g(el.name, (v) => v === 0);
      this.g(el.name, (v) => v >= 0);
    });
  }

  private g(name: string, wList: (v: number) => boolean) {
    this.genList(parseInt(this.$route.params.id, 10), name, this.$authToken(), this.$apolloClient, wList);
  }


  private sheetClick(item: {id: string}) {alert(item.id); }

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!, $veranstaltungsID: Int!) {
          veranstaltung(
            authToken: $authToken
            veranstaltungsID: $veranstaltungsID
          ) {
            veranstaltungsID
            bezeichnung
            begin {
              german
              input
            }
            ende {
              german
              input
            }
            hauptleiter {
              person {
                personID
                vorname
                nachname
              }
            }
            minTNAlter
            maxTNAlter
            anzahlPlaetze
            anzahlPlaetzeW
            anzahlPlaetzeM
            preisNormal
            preisLastMinute
            preisFruehbucher
            fruehbucherBis {
              german
              input
            }
            lastMinuteAb {
              german
              input
            }
            preisAnzahlungNormal
            preisAnzahlungLastMinute
            preisAnzahlungFruehbucher
            kannVorortBezahltWerden
            hatGWarteliste
            veranstaltungsort {
              vOrtID
              bezeichnung
              plz
              ort
              land
            }
            anmeldungen {
              anmeldeID
              position
              person {
                vorname
                nachname
                geschlecht
                gebDat {
                  german
                }
              }
              wartelistenPlatz
              anmeldeZeitpunkt {
                german
                day
                month
                year
              }
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken(),
        veranstaltungsID: this.$route.params.id
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.veranstaltung;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private created() {
    this.loadData();
    getTemplates().then((res) => {this.tnListen = res; });
  }
}
</script>
