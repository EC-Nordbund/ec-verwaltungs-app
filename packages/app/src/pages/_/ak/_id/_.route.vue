<template lang="pug">
  ec-wrapper(hasXBtn hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    template(#header)
      .head(style="padding: 2px 10px")
        v-switch(label="Alle Statusupdates anzeigen?" v-model="showAll")
        <h2 v-font v-primary v-if="showAll">Alle Statusupdates</h2>
        <h2 v-font v-primary v-else>Aktuelle Mitglieder</h2>
    v-list(two-line)
      template(v-if="data.personen" v-for="(person, index) in data.personen")
        v-list-tile(v-if="!showAll && person.currentStatus!==0" :key="person.person.personID + '_c'" @click="$router.push({path: `/personen/${person.person.personID}`, query: {prev: $route.fullPath}})")
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
            v-list-tile-sub-title {{stadien[person.currentStatus]}}

        v-divider(v-if="showAll && index!==0")
        v-list-tile(v-for="state in person.allUpdates" v-if="showAll" :key="state.akPersonID + '_s'" @click="$router.push({path: `/personen/${person.person.personID}`, query: {prev: $route.fullPath}})")
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
            v-list-tile-sub-title {{stadien[state.neuerStatus]}} (geändert am {{state.date.german}})
    v-dialog(v-model="addPersonShow" max-width="400px" persistend)
      v-card
        v-card-title
          h1(v-font v-primary) Neuen AK anlegen
        v-card-text
          v-form(v-model="addPersonValid")
            formular(v-model="addPersonValue" :schema=`[
              {
                name: 'personID',
                type: 'autocomplete',
                rule: 'required',
                items: (addPersonenType==='add'?allPersonen:((data.personen||[]).filter(v=>(v.currentStatus>0)).map(v=>v.person))).map(pers=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
                label: 'Person'
              },
              {
                name: 'status',
                rule: 'required',
                type: 'select',
                items: stadien.map((besch, id)=>({value: id, text: besch})),
                label: 'Neuer Status'
              },
              {
                name: 'date',
                type: 'date',
                label: 'Datum des Updates',
                rule: 'required',
                required: true
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="addPersonShow=false") Abbrechen
          v-btn(color="primary" :disabled="!addPersonValid" @click="addPersonSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {

  private get config() {
    return  {
      sheet: [
        {
          id: 'ak_m_add',
          icon: 'person_add',
          label: 'AK Mitglied hinzufügen',
          click: () => {this.edit('add'); }
        },
        {
          id: 'ak_m_update',
          icon: 'edit',
          label: 'AK Mitglied updaten',
          click: () => {this.edit('edit'); }
        },
        {
          id: 'ak_m_del',
          icon: 'delete',
          label: 'AK Mitglied entfernen',
          click: () => {this.edit('delete'); }
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
      subTitle: 'Arbeitskreis'
    };
  }
  public static meta = {};

  private personenData = [];

  private addPersonShow = false;
  private addPersonValid = false;
  private addPersonValue: any = {};
  private addPersonenType: 'add'|'edit'|'delete'|'' = '';

  private allPersonen: any = [];


  private showAll = false;

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ];

  private data: any = {
    personen: []
  };

  @Watch('showAll')
  public onShowAllChange() {
    this.$router.replace({
      path: this.$route.path,
      query: <any>{
        ...this.$route.query, 
        all: this.showAll?1:undefined
      }
    })
  }
}
  private addPersonSave() {
    this.addPersonShow = false

    this.$apolloClient.mutate({
      mutation:  gql`
        mutation(
          $personID: Int!,
          $akID: Int!,
          $date: String!,
          $status: Int!,
          $authToken: String!
        ) {
          updateAKStatus(
            personID:  $personID,
            akID: $akID,
            date: $date,
            status: $status,
            authToken: $authToken
          )
        }
      `,
      variables: {...this.addPersonValue,  akID: this.$route.params.id, authToken: this.$authToken}
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      }); 
    });

  }

  private edit(type: 'add'|'edit'|'delete') {
    this.addPersonenType = type
    this.addPersonValue = {}

    if(type==='delete') {
      this.addPersonValue = {
        status: 0
      }
    }

    if(type==='add'&&this.allPersonen){
      this.getPersonen()
    }

    this.addPersonShow = true;
  }

  private getPersonen() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          personen(authToken: $authToken) {
            personID,
            vorname,
            nachname,
            gebDat {
              german
              input
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken
      }
    })
    .then((res) => {
      this.allPersonen = res.data.personen;
    })
    .catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    }); 
  }

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
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    }); 
  }

  private created() {
    this.loadData(); 
    this.showAll = this.$route.query.all ? true : false;
  }
;
</script>
