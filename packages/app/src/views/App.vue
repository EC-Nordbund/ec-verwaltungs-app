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
        <img src="../../public/ec-logo-without-bg-64.png">
      </v-avatar>
      <span
        v-white
        v-font
        style="font-size: 26px; padding-top: 5px; margin-right: 8px"
      >Nordbund – Verwaltung</span>
      <v-spacer/>
      <ec-lesezeichen-show/>
      <div style="padding-right: 20px"/>
      <v-btn icon v-white @click="dark = !dark">
        <v-icon>invert_colors</v-icon>
      </v-btn>
      <v-btn icon v-white>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer clipped v-model="drawer" app>
      <v-list>
        <v-list-tile @click="$router.push('/dashboard')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-font>Dashboard</v-list-tile-title>
        </v-list-tile>
        <v-list-group prepend-icon="person" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title v-font>Personen</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/personen')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Personen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>person</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/ak')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Arbeitskreise</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-group prepend-icon="person">
          <v-list-tile slot="activator" no-action>
            <v-list-tile-content>
              <v-list-tile-title v-font>Dubletten</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="$router.push('/dubletten/personen/manuell')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Personen manuell mergen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/dubletten/personen/automated')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Personen-Dubletten vorschläge</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/dubletten/kontakt/automated')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Kontakt-Dubletten vorschläge</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-group prepend-icon="event" no-action>
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title v-font>Veranstaltungen</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title v-font>Anmeldung auswählen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/anmeldungen')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Anmeldungen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/veranstaltungen')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Veranstaltungen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/veranstaltungsorte')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Veranstaltungsorte</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
          <v-list-tile @click="$router.push('/organisationen')">
            <v-list-tile-content>
              <v-list-tile-title v-font>Organisationen</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>group</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
        <v-list-tile @click="$router.push('/briefe')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-font>Automatisierte Briefe</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/admin')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-font>Administration</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/profil')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-font>Profil</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="$router.push('/impressum')">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-font>Impressum</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view :key="$route.path" style="margin: 5px; width: calc(100% - 10px);"/>
    </v-content>
    <v-footer fixed app color="secondary" dark style="z-index: 9999; padding: 0 10px;">
      <span v-white>Todo</span>
      <v-spacer/>
      <span v-white>Version: {{ version }}</span>
      <v-spacer/>
      <v-breadcrumbs
        :items="
          [
            `© 2017 - ${new Date().getFullYear()}`,
            'EC-Nordbund',
            'T. Krause + S. Krüger'
          ].map(v => ({ text: v, disabled: true }))
        "
      >
        <v-icon slot="divider">keyboard_arrow_right</v-icon>
        <template slot="item" slot-scope="props">
          <span v-white :class="[props.item.disabled && 'disabled']">{{ props.item.text }}</span>
        </template>
      </v-breadcrumbs>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { version } from "@/../package.json";
import { Component, Vue, Prop, Watch, Emit } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  drawer = null;
  version = version;
  dark = false;
}
</script>
