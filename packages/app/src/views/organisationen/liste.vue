<template>
  <ApolloQuery
    :query="require('@/graphql/organisationen/loadList.gql')"
    :variables="{ authToken: $auth.instance.authToken }"
    tag
  >
    <template slot-scope="{ result: { loading, error, data }, query}">
      <div v-if="loading" class="loading apollo">Loading...</div>
      <div v-else-if="error" class="error apollo">An error occured {{error}}</div>
      <v-card v-else-if="data" class="result apollo">
        <v-toolbar color="transparent" class="elevation-0">
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>Organisationen</h1>
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
            :items="data.orgas"
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
              }
            ]"
          >
            <template slot="items" slot-scope="{item}">
              <tr
                @click="$router.push({ path: `/organisationen/${item.organisationsID}/allgemein`, query: {prev: $route.fullPath}})"
              >
                <td>{{ item.bezeichnung }}</td>
                <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <ec-add-btn @click="$refs.addOrga.show()"/>
          <ec-form
            ref="addOrga"
            title="Hinzufügen einer Organisation"
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
                  mutation: require('@/graphql/organisationen/addOrga.gql')
                }
              ]
            }"
          />
        </v-card-actions>
      </v-card>
      <div v-else class="no-result apollo">No result :(</div>
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
