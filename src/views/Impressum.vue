<template>
  <div>
    <v-toolbar>
      <v-spacer/>
      <ec-headline>
        Impressum
      </ec-headline>
      <v-spacer/>
    </v-toolbar>
    <v-card>
      <v-card-title>
        <h2 v-font v-primary>Packetliste</h2>
      </v-card-title>
      <v-list>
        <template v-for="(item, i) in data">
          <v-list-tile :key="item.package" @click="no">
            <v-list-tile-content>
              <v-list-tile-title>{{item.package}} ({{item.version}})</v-list-tile-title>
              <v-list-tile-sub-title>Lizenz: {{item.lizenz}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="i < data.length-1" :key="item.package + '-'"/>
        </template>
      </v-list>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Impressum extends Vue {
  no() {}
  data = [
    {
      package: 'electron',
      version: '2.0.2',
      lizenz: 'MIT',
    },
    {
      package: 'vue',
      version: '2.4.2',
      lizenz: 'MIT',
    },
    {
      package: 'vue-router',
      version: '2.5.3',
      lizenz: 'MIT',
    },
    {
      package: 'vue-apollo',
      version: '3.0.0-beta.2',
      lizenz: 'ISC',
    },
    {
      package: 'vuetify',
      version: '1.0.18',
      lizenz: 'MIT',
    },
    {
      package: 'vue-chart-js',
      version: '1.4.1',
      lizenz: 'MIT',
    },
    {
      package: 'electron-settings',
      version: '3.1.4',
      lizenz: 'ISC',
    },
    {
      package: 'graphql',
      version: '0.13.2',
      lizenz: 'MIT',
    },
    {
      package: 'graphql-tag',
      version: '2.9.2',
      lizenz: 'MIT',
    },
    {
      package: 'node-fetch',
      version: '2.1.2',
      lizenz: 'MIT',
    },
    {
      package: 'xlsx-template',
      version: '0.3.0',
      lizenz: 'MIT',
    },
    {
      package: 'docxtemplater',
      version: '3.6.2',
      lizenz: 'MIT',
    }
  ]
}
</script>
