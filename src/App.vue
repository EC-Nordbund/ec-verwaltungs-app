<template>
  <v-app app :dark="dark">
    <v-toolbar fixed app clipped-left color="primary">
      <v-toolbar-side-icon v-white @click="drawer = !drawer"/>
      <v-btn v-white icon @click="$router.back()">
        <v-icon>navigate_before</v-icon>
      </v-btn>
      <v-btn v-white icon @click="$router.forward()">
        <v-icon>navigate_next</v-icon>
      </v-btn>
      <v-spacer/>
      <v-avatar size="60px" style="margin-right: 10px">
        <img src="../public/ec-logo-without-bg-64.png">
      </v-avatar>
      <span
        v-white
        v-font
        style="font-size: 26px; padding-top: 5px; margin-right: 8px"
      >Nordbund – Verwaltung</span>
      <v-spacer/>
      <ec-lesezeichen-show/>
      <div style="padding-right: 20px"/>
      <v-btn icon v-white @click="darkChange">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <v-btn icon v-white @click="logOut">
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer clipped v-model="drawer" app>
      <v-list>
        <template
          v-for="item in nav"
          v-if="item.userGroups === '*' || item.userGroups.indexOf(auth._userGroupBezeichnung) !== -1"
        >
          <v-list-group v-if="item.items" :key="item.title" :prepend-icon="item.icon" no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title v-font>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="subItem in item.items"
              :key="subItem.title"
              @click="click(subItem.route)"
              v-if="subItem.userGroups === '*' || subItem.userGroups.indexOf(auth._userGroupBezeichnung) !== -1"
            >
              <v-list-tile-content>
                <v-list-tile-title v-font>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.icon }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-if="!item.items" @click="click(item.route)" :key="item.title">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-font>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <ec-anmeldungSelect>
          <v-btn>Anmeldung wählen</v-btn>
        </ec-anmeldungSelect>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer fixed app color="secondary" dark style="z-index: 9999; padding: 0 10px;">
      <v-progress-circular indeterminate color="accent" v-if="loading"/>
      <span v-white>{{auth.personBeschreibung}}</span>
      <v-spacer/>
      <span v-white>Version: {{ $require.version }}</span>
      <v-spacer/>
      <span v-white>
        © 2017 - {{ (new Date()).getFullYear() }}
        <v-icon>keyboard_arrow_right</v-icon>EC-Nordbund
        <v-icon>keyboard_arrow_right</v-icon>T. Krause + S. Krüger
      </span>
    </v-footer>
    <v-dialog v-model="soonLogOut" width="500px">
      <v-card>
        <v-card-title>
          <h1 v-font v-primary>Automatischer LogOut...</h1>
        </v-card-title>
        <v-card-text :style="{fontSize: '18px'}">
          <b>Achtung!</b>
          Du wirst automatisch in {{sec}} Sekunden abgemeldet...
          <br>Um das zu verhindern musst du nur irgendwoanders hinklicken.
        </v-card-text>
      </v-card>
    </v-dialog>
    <ec-dsgvo/>
  </v-app>
</template>

<script lang="ts">

import auth from '@/plugins/auth'
import nav from '@/config/nav'
import { BrowserWindow } from 'electron'

import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'
import event from '@/plugins/eventbus'

import xButtonLogic from '@/realPlugins/xButton/logic'

@Component({})
export default class App extends Vue {
  sec: number = 0
  loading: boolean = false
  drawer: boolean | null = null
  dark: boolean = false
  soonLogOut: boolean = false
  countdown: null | NodeJS.Timer = null
  nav = nav
  auth = auth
  event = event
  xButtonLogic = xButtonLogic
  click(route: string) {
    if (route === '_hilfe') {
      this.$require.electron.ipcRenderer.send('openHelp')
      return
    }
    this.$router.push(route)
    this.xButtonLogic.reset()
  }
  created() {
    if (this.$require.isElectron) {
      this.$updateChecker()
      this.dark = <boolean>(
        this.$require.settings.get('dark', false)
      )
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
    this.countdown = setInterval(() => {
      if (this.sec > 0) {
        this.sec--
      }
    }, 1000)
  }

  destroyed() {
    if (this.countdown !== null) {
      clearInterval(this.countdown)
    }
  }

  darkChange() {
    this.dark = !this.dark
    if (this.$require.isElectron) {
      this.$require.settings.set('dark', this.dark)
    }
  }
  @Watch('soonLogOut')
  onSoonLogOutChange(val: boolean) {
    if (!val) {
      this.auth.extend()
    }
  }

  logOut() {
    this.auth.logOut()
    this.$router.push('/')
  }

  dgvoID(id: number) {
    console.log(id)
  }
}
</script>
