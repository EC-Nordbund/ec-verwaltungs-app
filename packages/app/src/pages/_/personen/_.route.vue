<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData") 
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="Person suchen" @suche="suche = $event")
    v-data-table(:headers=`[
      {
        text: 'Vorname',
        value: 'vorname'
      },
      {
        text: 'Nachname',
        value: 'nachname'
      },
      {
        text: 'GebDat',
        value: 'gebDat.input'
      }
    ]` :items = "data.filter($util.filter(suche))" :rows-per-page-items="[rowCount]" )
      template(#items="props")
        tr(@click="$router.push({path: `/personen/${props.item.personID}/home`, query: {prev: $route.fullPath}})" :class="'geschlecht-' + props.item.geschlecht")
          td {{props.item.vorname}} 
          td {{props.item.nachname}} 
          td {{props.item.gebDat.german}}
    template(#dialogs)
      formular-selector(name="addPerson" ref="addPerson")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  public suche = '';

  public rowCount = 0;
  private data: any = [];

  private config = {
    sheet: [
      {
        id: 'pers_add',
        icon: 'person_add',
        label: 'Person hinzufügen',
        click: () => {
          const self = this;
          (this.$refs.addPerson as any)
            .show()
            .then((data: {vorname: string, nachname: string, gebDat: string, geschlecht: string}) => {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation(
                    $vorname: String!,
                    $nachname: String!,
                    $gebDat: String!,
                    $geschlecht: String!,
                    $authToken: String!
                  ) {
                    addPerson(
                      vorname: $vorname,
                      nachname: $nachname,
                      gebDat: $gebDat,
                      geschlecht:
                      $geschlecht,
                      authToken: $authToken
                    )
                  }
                `,
                variables: {...data,  anmeldeID: this.$route.params.id, authToken: this.$authToken()}
              }).then((res: any) => {
                this.$notifikation('Neue Person', `Du hast erfolgreich eine neue Person angelegt`);
                self.$router.push({path: `/personen/${res.data.addPerson}/home`, query: {prev: this.$route.fullPath}});
              }).catch((err: any) => {
                this.$dialog.error({
                  text: err.message,
                  title: 'Speichern fehlgeschlagen!'
                });
              });
            })
            .catch(this.$empty);
        }
      }
    ],
    title: 'Personen',
    subTitle: 'Liste'
  };

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken:String!) {
          personen(authToken: $authToken) {
            personID
            vorname
            nachname
            gebDat {
              german
              input
            }
            geschlecht
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.personen;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

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
<style>
.geschlecht-w {
  background-color: #f000a0;
  opacity: .9;
}
.geschlecht-m {
  background-color: #00a0f0;
  opacity: .9;
}
</style>
