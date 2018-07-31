<template>
  <v-menu auto close-on-content-click="false" :nudge-width="256" offset-y width="512px">
    <template slot="activator">
      <v-badge color="red" v-if="lesezeichen.liste.length > 0 ">
        <span slot="badge">{{lesezeichen.liste.length >= 100 ? ':)' : lesezeichen.liste.length}}</span>
        <v-icon large>
          {{lesezeichen.liste.length === 0 ? 'star_border' : 'star'}}
        </v-icon>
      </v-badge>
      <v-icon large v-else>
        star_border
      </v-icon>
    </template>
    <v-card>

      <v-card-title c>
        <h1 v-font>Lesezeichen</h1>
      </v-card-title>
      
      <v-divider></v-divider>

      <v-card-text>
        <v-list >
          <template v-for="(item, index) in lesezeichen.liste">
            <v-list-tile :key="item.id" @click="click(index)">

              <v-list-tile-content>
                <v-list-tile-title>{{ item.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.type }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action
              @click="unbookmark(index)">
                <v-icon>close</v-icon>
              </v-list-tile-action>

            </v-list-tile>
          </template>
        </v-list>
      </v-card-text>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

import lesezeichen, {
  Lesezeichen
} from '@/plugins/lesezeichen/lesezeichen.ts'

import xButtonLogic from '@/plugins/xButton/logic'

@Component({})
export default class App extends Vue {
  lesezeichen = lesezeichen
  xButtonLogic = xButtonLogic

  click(index: number) {
    let bookmark = lesezeichen.liste[index]

    xButtonLogic.reset(bookmark.xButton)
    this.$router.push(bookmark.route)
  }

  unbookmark(index: number) {
    let bookmark = lesezeichen.liste[index]

    lesezeichen.delete(bookmark)
  }
}
</script>
