<template lang="pug">
  ec-wrapper(hasXBtn hasSheet hasHeader hasDial v-bind="config")
    template(#header)
      .head(style="padding: 2px 10px")
        v-switch(label="Alle Statusupdates anzeigen?" v-model="showAll")
    v-list(two-line)
      template(v-if="data.personen" v-for="person in data.personen")
        v-list-tile(v-if="!showAll && person.currentStatus>0" :key="person.person.personID + '_c'" @click="$router.push({path: `/personen/${person.person.personID}`, query: {prev: $route.fullPath}})")
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{stadien[person.currentStatus]}}
            v-list-tile-sub-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})

        v-list-tile(v-for="state in person.allUpdates" v-if="showAll" :key="state.akPersonID + '_s'" @click="$router.push({path: `/personen/${person.person.personID}`, query: {prev: $route.fullPath}})")
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{stadien[state.neuerStatus]}} ({{state.date.german}}) 
            v-list-tile-sub-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  
  private showAll = false;

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ]

  private get config() {
    return  {
      sheet: [
        {
          id: 'ak_m_add',
          icon: 'menu',
          label: 'AK Mitglied hinzufügen',
          click: this.sheetClick
        },
        {
          id: 'ak_m_update',
          icon: 'menu',
          label: 'AK Mitglied updaten',
          click: this.sheetClick
        },
        {
          id: 'ak_m_del',
          icon: 'menu',
          label: 'AK Mitglied entfernen',
          click: this.sheetClick
        },
        {
          id: 'ak_rep_current',
          icon: this.$util.icon.report,
          label: 'Aktuelle AK Mitglieder Report',
          click: () => {
            this.$dialog.warning({
              text: 'GENERATE CURRENT AK REPORT',
              title: 'TODO'
            });
          }
        },
        {
          id: 'ak_rep_all',
          icon: this.$util.icon.report,
          label: 'Alle AK Mitglieder Report',
          click: () => {
            this.$dialog.warning({
              text: 'GENERATE FULL AK REPORT',
              title: 'TODO'
            });
          }
        }
      ],
      title: this.data.bezeichnung,
      subTitle: "Arbeitskreis"
    };
  }

  private data:any = {}
  
  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!, $akID: Int!) {
          ak(akID: $akID, authToken: $authToken) {
            akID
            bezeichnung
            personen {
              currentStatus
              allUpdates {
                akPersonID
                neuerStatus
                date {
                  german
                }
              }
              person {
                personID
                vorname
                nachname
                gebDat {
                  german
                }
              }
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken,
        akID: this.$route.params.id
      }
    }).then((res: any) => {
      this.data = res.data.ak;
      console.log(this.data);
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
  }
}
</script>
