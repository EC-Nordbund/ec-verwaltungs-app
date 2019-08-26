<template lang="pug">  
  ec-wrapper(hasXBtn hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    template(#header)
      .head(style="padding: 2px 10px")
    v-list(two-line subheader)
      v-subheader Aktuell
      v-list-group(v-if="data.personen" v-for="(person, index) in data.personen.filter(p=>p.currentStatus!==0)")
        template( v-slot:activator)
          v-list-tile(:key="person.person.personID + '_c'")
            v-list-tile-action
              v-btn(
                icon
                ripple
                @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
                )
                v-icon person
            v-list-tile-content
              v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
              v-list-tile-sub-title {{stadien[person.currentStatus]}}
        v-timeline(dense  class="ml-2")
          v-timeline-item(
            v-for="state in person.allUpdates"
            small
            :key="state.akPersonID + '_s'"
            @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
            )
            v-list-tile
              v-list-content
                v-list-tile-title {{stadien[state.neuerStatus]}}
                v-list-tile-sub-title seit {{state.date.german}}
      v-divider(v-if="data.personen.filter(p=>p.currentStatus===0).length > 0")
      v-subheader Ehemalige
      v-list-group(v-if="data.personen" v-for="(person, index) in data.personen.filter(p=>p.currentStatus===0)")
        template( v-slot:activator)
          v-list-tile(:key="person.person.personID + '_c'")
            v-list-tile-action
              v-btn(
                icon
                ripple
                @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
                )
                v-icon person
            v-list-tile-content
              v-list-tile-title {{person.person.vorname}} {{person.person.nachname}} ({{person.person.gebDat.german}})
              v-list-tile-sub-title {{stadien[person.currentStatus]}}
        v-timeline(align-top dense  class="ml-2")
          v-timeline-item(
            v-for="state in person.allUpdates"
            small
            :key="state.akPersonID + '_s'"
            @click="$router.push({path: `/personen/${person.person.personID}/home`, query: {prev: $route.fullPath}})"
            )
            v-list-tile
              v-list-content
                v-list-tile-title {{stadien[state.neuerStatus]}}
                v-list-tile-sub-title seit {{state.date.german}}
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
          label: 'Mitglied hinzufügen',
          click: () => {(this.$refs.formEditAk as any).edit('add'); }
        },
        {
          id: 'ak_m_update',
          icon: 'edit',
          label: 'Mitglied bearbeiten',
          click: () => {(this.$refs.formEditAk as any).edit('edit'); }
        },
        {
          id: 'ak_m_del',
          icon: 'delete',
          label: 'Mitglied entfernen',
          click: () => {(this.$refs.formEditAk as any).edit('delete'); }
        },
        {
          id: 'ak_rep_current',
          icon: this.$util.icon.report,
          label: 'Report aktueller Mitglieder',
          click: () => {
            this.$util.report.withData('ak_single_current', this.data, `ak-${this.data.bezeichnung}-current.docx`);
          }
        },
        {
          id: 'ak_rep_all',
          icon: this.$util.icon.report,
          label: 'Report aller Mitglieder',
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

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ];

  private data: any = {
    personen: []
  };

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
  }
}
</script>
