<template lang="pug">
  ec-wrapper(hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="AK suchen" @suche="suche = $event")
    v-list(two-line)
      v-list-tile(v-for="item in data.filter(filterData)" :key="item.id" @click="$router.push({path: `/ak/${item.akID}`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title {{item.bezeichnung}}
          v-list-tile-sub-title ID: {{item.akID}}
    template(#sheet)
      v-list-tile(@click="addAKShow=true")
        v-list-tile-action
          v-icon group_add
        v-list-tile-title AK hinzufügen
    v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Neuen AK anlegen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'bezeichnung',
                type: 'input',
                label: 'Bezeichnung',
                rule: "required|max:50",
                required: true,
                counter: 50
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="addAKShow=false") Abbrechen
          v-btn(color="primary" :disabled="!addAKValid" @click="addAKSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootAKRoot extends Vue {
  public static meta = {};

  private suche: string = '';

  private addAKValid = false;
  private addAKShow = false;
  private addAKValue: {bezeichnung: string} = {bezeichnung: ''};

  private data: any = [];

  private config = {
    sheet: [
      {
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
    title: 'Arbeitskreise'
  };
  private addAKSave() {
    this.addAKShow = false;
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!, $bezeichnung: String!) {
          addAK(bezeichnung: $bezeichnung, authToken: $authToken)
        }
      `,
      variables: {
        ...this.addAKValue,
        authToken: this.$authToken
      }
    }).then((res: any) => {
      this.$router.push({path: `/ak/${res.data.addAK}`, query: {prev: this.$route.fullPath}});
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    });
    this.addAKValue = {bezeichnung: ''};
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
        authToken: this.$authToken
      }
    }).then((res: {data: {aks: Array<{akID: number, bezeichnung: string}>}}) => {
      this.data = res.data.aks;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private filterData(item: any): boolean {
    return this.suche.toLowerCase().split(' ').map((suche: string) => this.filterPart(item, suche)).reduce((a, b) => a && b, true);
  }

  private filterPart(item: any, suche: string): boolean {
    if (!suche) {
      return true;
    }
    if (typeof item === 'string') {
      return item.toLowerCase().includes(suche);
    } else if (typeof item === 'number' || typeof item === 'boolean') {
      return item.toString().toLowerCase().includes(suche);
    } else if (item) {
      return Object.keys(item).map((key) => this.filterPart(item[key], suche)).reduce((a, b) => a || b, false);
    } else {
      return false;
    }
  }

  private created() {
    this.loadData();
  }
}
</script>
