<template>
  <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="256" offset-y>
    <template slot="activator">
      <v-badge overlap bottom color="accent" v-if="lesezeichen.liste.length > 0">
        <span slot="badge">{{lesezeichen.liste.length >= 100 ? ':)' : lesezeichen.liste.length}}</span>
        <v-icon medium v-white>
          {{lesezeichen.liste.length === 0 ? 'star_border' : 'star'}}
        </v-icon>
      </v-badge>
      <v-icon medium v-white v-else>
        star_border
      </v-icon>
    </template>
    <v-card>

      <v-card-title c>
        <h1 v-font>Lesezeichen</h1>
      </v-card-title>

      <v-divider/>
    
      <v-card-text>
        <v-list >
          <v-list-tile v-if="selectedBookmarks.length > 0" inactive>
            <v-list-tile-action @click="selectedBookmarks = []">
              <v-icon>arrow_back</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{selectedBookmarks.length}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action @click="unbookmarkSelected()">
              <v-icon>delete</v-icon>
            </v-list-tile-action>

          </v-list-tile>

          <v-divider v-if="selectedBookmarks.length > 0"/>

          <template v-for="(item, index) in lesezeichen.liste">
            <v-list-tile :key="item.id" @click="click(index)">

              <v-list-tile-action
                v-if="lesezeichen.liste.length > 1"
                @click.stop>
                <v-checkbox v-model="selectedBookmarks" :value="index">
                </v-checkbox>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.type }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action
                @click.stop="unbookmark(index)">
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
import { create } from 'domain'

@Component({})
export default class App extends Vue {
  lesezeichen = lesezeichen
  xButtonLogic = xButtonLogic

  menu: boolean = false

  selectedBookmarks: Array<number> = []

  toggleSelection(index: number) {
    if (this.selectedBookmarks.includes(index)) {
      this.deselect(index)
    } else {
      this.selectedBookmarks.push(index) // Add to list
    }
  }

  deselect(index: number) {
    if (this.selectedBookmarks.includes(index)) {
      const i = this.selectedBookmarks.indexOf(index)
      this.selectedBookmarks.splice(i)
    }
  }

  click(index: number) {
    let bookmark = lesezeichen.liste[index]

    xButtonLogic.reset(bookmark.xButton)
    this.menu = false //close menu
    this.$router.push(bookmark.route)
  }

  unbookmark(index: number) {
    let bookmark = lesezeichen.liste[index]

    lesezeichen.delete(bookmark)
    this.deselect(index)
  }

  unbookmarkSelected() {
    this.selectedBookmarks.forEach(index =>
      this.unbookmark(index)
    )

    this.selectedBookmarks = []
  }

  @Watch('menu')
  onMenuOpenClose(isOpen: boolean) {
    if (!isOpen) {
      this.selectedBookmarks = []
    }
  }
}
</script>
