<template>
  <v-app app :dark="dark">
    <v-toolbar fixed app :clipped-left="true" color="primary">
      <v-toolbar-side-icon @click="drawer = !drawer" v-white/>
      <v-spacer/>
      <v-avatar size="30px">
        <img src="./assets/logo.png">
      </v-avatar>
      <span v-white v-font style="font-size: 26px; padding-top: 5px; margin-right: 8px">Nordbund – Verwaltung</span>
      <v-spacer/>
      <v-btn icon v-black @click="darkChange">
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer fixed :clipped="true" v-model="drawer" app>
      <v-list>
        <template v-for="item in nav" v-if="item.userGroups === '*' || item.userGroups.indexOf(auth._userGroupBezeichnung) !== -1">
          <v-list-group v-if="item.items" :key="item.title" :prepend-icon="item.action" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title v-font>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile v-for="subItem in item.items" :key="subItem.title" @click="click(subItem.route)" v-if="subItem.userGroups === '*' || subItem.userGroups.indexOf(auth._userGroupBezeichnung) !== -1">
              <v-list-tile-content>
                <v-list-tile-title v-font>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-if="!item.items" @click="click(item.route)" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.action }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-font>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer fixed app color="secondary" dark style="z-index: 9999; padding: 0 10px;">
      <v-progress-circular indeterminate color="accent" v-if="loading"/>
      <span v-white>
        {{auth.personBeschreibung}}
      </span>
      <v-spacer/>
        <span v-white>Version: {{ version }}</span>
      <v-spacer/>
        <span v-white>
          © 2017 - {{ (new Date()).getFullYear() }}
          <v-icon>keyboard_arrow_right</v-icon>
          EC-Nordbund
          <v-icon>keyboard_arrow_right</v-icon>
          T. Krause + S. Krüger
        </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import auth from '@/plugins/auth';
import nav from '@/plugins/config/nav.config'

import settings from '@/plugins/settings'
import { isElectron } from '@/plugins/electron'

@Component({})
export default class App extends Vue {
  loading: boolean = true
  drawer: boolean = false
  version: string = "0.1.0 - alpha"
  dark: boolean = false
  nav = nav
  auth = auth
  click(route:string) {
    this.$router.push(route)
  }
  created() {
    if (isElectron) {
      this.dark = (<any>settings.get('dark', false))
    }
  }
  darkChange() {
    this.dark = !this.dark
    if (isElectron) {
      settings.set('dark', this.dark)
    }
  }
}
</script>
