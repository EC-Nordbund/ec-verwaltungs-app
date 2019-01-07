<template>
  <ApolloQuery
    :query="require('@/graphql/veranstaltungsOrte/loadList.gql')"
    :variables="{ authToken: $auth.instance.authToken }"
    :tag="''"
  >
    <template slot-scope="{ result: { loading, error, data }}">
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">An error occured {{error}}</div>
      <v-card v-else-if="data">
        <v-toolbar color="transparent" class="elevation-0">
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>Veranstaltungsorte</h1>
          </v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            label="Suchen"
            prepend-icon="search"
            :append-icon="suchString.length > 0 ? 'close' : undefined"
            v-model="suchString"
            @click:append="()=>{suchString = ''}"
          />
          <v-data-table
            :rows-per-page-items="[count]"
            :items="data.vorte"
            :pagination.sync="pageI"
            :search="suchString"
            :headers="[
              {
                text: 'Bezeichnung',
                align: 'center',
                value: 'bezeichnung'
              },
              {
                text: 'Anschrift',
                align: 'center',
                value: 'plz'
              },
              {
                text: 'Organisationen',
                align: 'center',
                value: 'organisation.bezeichnung'
              }
            ]"
          >
            <template slot="items" slot-scope="{item}">
              <tr
                @click="$router.push({ path: `/veranstaltungsorte/${item.vOrtID}/allgemein`, query: {prev: $route.fullPath}})"
              >
                <td>{{item.bezeichnung}}</td>
                <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
                <td>{{item.organisation.bezeichnung}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <ec-add-btn @click="$refs.addVort.show()"/>
          <ec-form
            ref="addVort"
            title="Hinzufügen eines Veranstaltungsort"
            :value="{}"
            :config="{
              form: [
                {
                  name: 'bezeichnung',
                  label: 'Bezeichnungen',
                  component: 'v-text-field',
                  counter:50,
                  rules:[
                    v=>!v?'Du musst eine Bezeichnung angeben!':true,
                    v=>(v&&v.length > 50)?'Die Bezeichnung darf maximal 50 Zeichen lang sein.':true
                  ]
                },
                {
                  name: 'strasse',
                  label: 'Strasse',
                  component: 'v-text-field',
                  counter: 50,
                  rules:[
                    v=>!v?'Du musst eine Strasse angeben!':true,
                    v=>(v&&v.length > 50)?'Die Strasse darf maximal 50 Zeichen lang sein.':true
                  ]
                },
                {
                  name: 'plz',
                  label: 'PLZ',
                  component: 'v-text-field',
                  counter: 8,
                  rules:[
                    v=>!v?'Du musst eine PLZ angeben!':true,
                    v=>(v&&v.length > 8)?'Die PLZ darf maximal 8 Zeichen lang sein.':true
                  ]
                },
                {
                  name: 'ort',
                  label: 'Ort',
                  component: 'v-text-field',
                  counter: 50,
                  rules:[
                    v=>!v?'Du musst einen Ort angeben!':true,
                    v=>(v&&v.length > 50)?'Der Ort darf maximal 50 Zeichen lang sein.':true
                  ]
                },
                {
                  name: 'land',
                  label: 'Land',
                  component: 'v-text-field',
                  counter: 50,
                  rules:[
                    v=>!v?'Du musst ein Land angeben!':true,
                    v=>(v&&v.length > 50)?'Das Land darf maximal 50 Zeichen lang sein.':true
                  ]
                },
                {
                  name: 'organisationsID',
                  label: 'Organisation {comming soon...}',
                  component:'v-text-field',
                  value: 0,
                  disabled: true
                }
              ],
              buttons: [
                {
                  onDone(){},
                  label:'Abbrechen',
                  needValid:false
                },
                {
                  onDone(){},
                  label:'Speichern',
                  needValid:true,
                  color:'primary',
                  mutation: require('@/graphql/veranstaltungsOrte/addVort.gql')
                }
              ]
            }"
          />
        </v-card-actions>
      </v-card>
      <div v-else>No result :(</div>
    </template>
  </ApolloQuery>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class orgaListe extends Vue {
  valid = false;
  editShow = false;

  value = {
    bezeichnung: ""
  };

  count = Math.floor((document.body.offsetHeight - 438) / 48);

  suchString: any = "";

  created() {
    this.pageI = {
      page: this.$route.query.page || 1,
      sortBy: this.$route.query.sortBy || "bezeichnung",
      descending: this.$route.query.descending || false
    };
    this.suchString = this.$route.query.suchString || "";
  }

  pageI: any = {};

  @Watch("suchString")
  onSucheChange() {
    this.onQueryChange();
  }

  @Watch("pageI")
  onPageIChange() {
    this.onQueryChange();
  }

  onQueryChange() {
    this.$router.replace({
      path: this.$route.path,
      query: { ...this.pageI, suchString: this.suchString }
    });
  }
}
</script>
