<template lang="pug">  
  ec-wrapper(hasXBtn hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    template(#header)
      .head(style="padding: 2px 10px")
        v-switch(label="Alle Statusupdates anzeigen?" v-model="showAll")
        h2(v-font v-primary v-if="showAll") Alle Statusupdates
        h2(v-font v-primary v-else) Aktuelle Mitglieder
    v-list(two-line)
      template(v-if="data.personen" v-for="(person, index) in data.personen")
        v-list-tile(
          v-if="!showAll && person.currentStatus!==0" 
          :key="person.person.personID + '_c'" 
          @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
        )
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
            v-list-tile-sub-title {{stadien[person.currentStatus]}}
        v-divider(v-if="showAll && index!==0")
        v-list-tile(
          v-for="state in person.allUpdates" 
          v-if="showAll" 
          :key="state.akPersonID + '_s'" 
          @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
        )
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
            v-list-tile-sub-title {{stadien[state.neuerStatus]}} (geändert am {{state.date.german}})
    template(#dialogs)
      ec-form-edit-ak(ref="formEditAk" :data="data" @reload="loadData")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndexAKIdIndex extends Vue {
  private get config() {
    return  {
      sheet: [
        {
          id: 'ak_m_add',
          icon: 'person_add',
          label: 'AK Mitglied hinzufügen',
          click: () => {(this.$refs.formEditAk as any).edit('add'); }
        },
        {
          id: 'ak_m_update',
          icon: 'edit',
          label: 'AK Mitglied updaten',
          click: () => {(this.$refs.formEditAk as any).edit('edit'); }
        },
        {
          id: 'ak_m_del',
          icon: 'delete',
          label: 'AK Mitglied entfernen',
          click: () => {(this.$refs.formEditAk as any).edit('delete'); }
        },
        {
          id: 'ak_rep_current',
          icon: this.$util.icon.report,
          label: 'Aktuelle AK Mitglieder Report',
          click: () => {
            this.$util.report.withData('ak_single_current', this.data, `ak-${this.data.bezeichnung}-current.docx`);
          }
        },
        {
          id: 'ak_rep_all',
          icon: this.$util.icon.report,
          label: 'Alle AK Mitglieder Report',
          click: () => {
            this.$util.report.withData('ak_single_all', this.data, `ak-${this.data.bezeichnung}-all.docx`);
          }
        }
      ],
      title: this.data.bezeichnung,
      subTitle: 'Arbeitskreis'
    };
  }
  public static meta = {};

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
      query: {
        ...this.$route.query,
        all: this.showAll ? 1 : undefined
      } as any
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
        authToken: this.$authToken(),
        akID: this.$route.params.id
      },
      fetchPolicy: 'no-cache'
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
}
</script>
