<template>
  <gql-watch>
    <template slot-scope="{data, reloading, refetch}">
      <v-card style="margin: 5px">
        <v-toolbar color="transparent" class="elevation-0">
          <v-spacer/>
          <v-toolbar-title>
            <h1 v-font v-primary>Unterkünfte</h1>
          </v-toolbar-title>
          <v-spacer/>
          <v-btn icon @click="refetch" :disabled="reloading">
            <v-icon :class="{rot: reloading}">replay</v-icon>
          </v-btn>
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
              <tr @click="$router.push(`/app/organisationen/${item.organisationsID}`)">
                <td>{{ item.bezeichnung }}</td>
                <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </template>
    <template slot="query">
      query($authToken: String!) {
      orgas(authToken: $authToken) {
      organisationsID
      bezeichnung
      plz
      ort
      land
      }
      }
    </template>
    <template slot="error">Ein Fehler ist beim Laden der Daten aufgetreten</template>
    <template slot="loading" slot-scope="{loading}">
      <template v-if="loading">Laden {initial}</template>
    </template>
  </gql-watch>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class orgaListe extends Vue {
  count = Math.floor(
    (document.body.offsetHeight - 438) / 48
  )
  
  suchString:any = ""

  created(){
    this.pageI = {
      page: this.$route.query.page || 1,
      sortBy: this.$route.query.sortBy || "bezeichnung",
      descending: this.$route.query.descending || false
    }
    this.suchString = this.$route.query.suchString || ''
  }

  pageI: any = {}
  
  
  @Watch('suchString')
  onSucheChange(){
    this.onQueryChange()
  }

  @Watch('pageI')
  onPageIChange(){
    this.onQueryChange()
  }

  onQueryChange(){
    this.$router.replace({path: this.$route.path, query: {...this.pageI,suchString: this.suchString}})
  }
}
</script>
<style scoped>
@keyframes rotate {
  0% {
    transfrom: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.rot {
  animation: rotate 0.5s infinite;
}
</style>
