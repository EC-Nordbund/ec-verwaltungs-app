<template>
  <v-app app :dark="dark">
    <v-toolbar fixed app clipped-left color="primary">
      <v-toolbar-side-icon v-white @click="drawer = !drawer"/>
      <v-spacer/>
      <v-avatar size="60px" style="margin-right: 10px">
        <img src="../public/ec-logo-without-bg-64.png">
      </v-avatar>
      <span v-white v-font style="font-size: 26px; padding-top: 5px; margin-right: 8px">Nordbund – Verwaltung</span>
      <v-spacer/>
      <v-btn icon v-black @click="darkChange">
        <v-icon>invert_colors</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer clipped v-model="drawer" app>
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
    <v-content style="display: grid;">
      <router-view/>
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
    <v-dialog v-model="soonLogOut" width="500px">
      <v-card>
        <v-card-title>
          <h1 v-font v-primary>
            Automatischer LogOut...
          </h1>
        </v-card-title>
        <v-card-text :style="{fontSize: '18px'}">
          <b>Achtung!</b> Du wirst automatisch in {{sec}} Sekunden abgemeldet...<br/>
          Um das zu verhindern musst du nur irgendwoanders hinklicken.
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import auth from '@/plugins/auth'
import nav from '@/plugins/config/nav.config'
import electron, {
  isElectron,
  isProduction
} from '@/plugins/electron'
import settings from '@/plugins/settings'
import version from '@/plugins/version/version'
import { BrowserWindow } from 'electron'

import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import event from '@/plugins/eventbus'

@Component({})
export default class App extends Vue {
  sec: number = 0
  loading: boolean = false
  drawer: boolean | null = null
  version: string = version
  dark: boolean = false
  soonLogOut: boolean = false
  nav = nav
  auth = auth
  event = event
  click(route: string) {
    if (route === '_hilfe') {
      let win: BrowserWindow = new electron.remote.BrowserWindow(
        {
          show: false
        }
      )
      const onlinePath = 'http://localhost:8081'
      const url = isProduction
        ? isElectron ? '../docs/index.html' : onlinePath
        : 'http://localhost:8081'
      win.loadURL(url)
      win.on('ready-to-show', () => {
        win.show()
      })
      return
    }
    this.$router.push(route)
  }
  created() {
    if (isElectron) {
      this.dark = <any>settings.get('dark', false)
    }
    this.event.on('showLoading', () => {
      this.loading = true
    })
    this.event.on('hideLoading', () => {
      this.loading = false
    })
    this.event.on('soonLogout', () => {
      this.soonLogOut = true
      this.sec = 5 * 60
    })
    setInterval(() => {
      this.sec--
    }, 1000)
  }
  darkChange() {
    this.dark = !this.dark
    if (isElectron) {
      settings.set('dark', this.dark)
    }
  }
  @Watch('soonLogOut')
  onSoonLogOutChange(val: boolean) {
    if (!val) {
      this.auth.extend()
    }
  }
}
</script>
