<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="AK suchen" @suche="suche = $event")
    v-list(two-line)
      v-list-tile(
        v-for="item in data.filter($util.filter(suche))" 
        :key="item.akID" 
        @click="$router.push({path: `/ak/${item.akID}`, query: {prev: $route.fullPath}})"
      )
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title {{item.bezeichnung}}
          v-list-tile-sub-title ID: {{item.akID}}
    template(#dialogs)
      //- ec-add-ak(ref="addAK")
      formular-selector(name="addAK" ref="addAK")
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndexAKIndex extends Vue {
  public static meta = {};

  private suche: string = '';
  private data: any = [];

  private config = {
    sheet: [
      {
        icon: this.$util.icon.report,
        label: 'Aktuelle AK Mitglieder Report',
        click: () => {
          this.gen('ak_all_current', 'ak-alle-current.docx');
        }
      },
      {
        icon: this.$util.icon.report,
        label: 'Alle AK Mitglieder Report',
        click: () => {
          this.gen('ak_all_all', 'ak-alle-vollstaendig.docx');
        }
      },
      {
        icon: 'group_add',
        label: 'AK-Hinzufügen',
        click: () => {
          const self = this;
          (this.$refs.addAK as any).show()
            .then((data: {bezeichnung: string}) => {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation($authToken: String!, $bezeichnung: String!) {
                    addAK(bezeichnung: $bezeichnung, authToken: $authToken)
                  }
                `,
                variables: {
                  bezeichnung: data.bezeichnung,
                  authToken: this.$authToken()
                }
              })
              .then((res: any) => {
                this.$notifikation(
                  'Neuer AK',
                  `Du hast erfolgreich einen AK mit dem Namen "${data.bezeichnung}" angelegt`
                );
                self.$router.push({path: `/ak/${res.data.addAK}`, query: {prev: this.$route.fullPath}});
              })
              .catch((err: any) => {
                this.$dialog.error({
                  text: err.message,
                  title: 'Speichern fehlgeschlagen!'
                });
              });
            });
        }
      }
    ],
    title: 'Arbeitskreise'
  };

  private gen(name: string, save: string) {
    this.$util.report.loadData(this, gql`
      query($authToken: String!) {
        aks(authToken: $authToken) {
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
    `, name, save);
  }

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken:String!) {
          aks(authToken:$authToken) {
            akID
            bezeichnung
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.aks;
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
