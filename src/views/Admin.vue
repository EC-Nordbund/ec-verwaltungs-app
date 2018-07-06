<template>
  <div>
    <v-toolbar tabs>
      <v-spacer/>
      <ec-headline>
        Administration
      </ec-headline>
      <v-spacer/>
      <v-tabs v-model="tabs" fixed-tabs slot="extension">
        <v-tabs-slider/>
        <v-tab href="#tab-2" v-secondary>
          <v-icon v-accent>contacts</v-icon>
          <v-spacer/>
          <span>User</span>
          <v-spacer/>
        </v-tab>
        <v-tab href="#tab-3" v-secondary>
          <v-icon v-accent>event</v-icon>
          <v-spacer/>
          <span>User-Gruppen</span>
          <v-spacer/>
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item id="tab-2">
        <ec-list
          :items="data.users"
          :mapper="(item)=>({
            title: `${item.userName} (${item.person.vorname} ${item.person.nachname})`,
            subTitle: `${item.userGroup.bezeichnung} (bis ${item.ablaufDatum.german})`
          })"
          edit
          icon="person"
        />
      </v-tab-item>
      <v-tab-item id="tab-3">
        <ec-list
          :items="data.userGroups"
          :mapper="(item)=>({
            title: `${item.bezeichnung}`,
            subTitle: `${item.mutationRechte.join(', ')}`
          })"
          edit
          icon="group"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'

@Component({})
export default class verteilerDetails extends reloaderBase {
  data = {
    users: [],
    userGroups: []
  }
  tabs = null
  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = gql`
      query($authToken: String!) {
        users(authToken: $authToken) {
          userID
          userName
          person {
            personID
            vorname
            nachname
          }
          ablaufDatum {
            german
          }
          userGroup {
            userGroupID
            bezeichnung
          }
        }
        userGroups(authToken: $authToken) {
          userGroupID
          bezeichnung
          mutationRechte
          fieldAccess {
            field
            table
          }
        }
      }
    `
    super.created()
  }
}
</script>
<style scoped>
.hidden {
  visibility: hidden;
}
</style>
