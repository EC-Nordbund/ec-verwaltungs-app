<template>
  <v-menu v-model="menu" :close-on-content-click="false" max-width="450" min-width="450" offset-y>
    <template slot="activator">
      <v-badge overlap bottom color="accent" v-if="count > 0">
        <span slot="badge">{{count >= 16 ? ':-)' : count}}</span>
        <v-icon medium v-white>{{$liste.liste.length === 0 ? 'star_border' : 'star'}}</v-icon>
      </v-badge>
      <v-icon medium v-white v-else>star_border</v-icon>
    </template>
    <v-card>
      <v-card-title>
        <h1 v-font v-primary>Lesezeichen</h1>
      </v-card-title>

      <v-divider/>

      <v-card-text>
        <v-list v-if="count > 0">
          <v-list-tile v-if="selectedBookmarks.length > 0" inactive>
            <v-list-tile-action>
              <v-btn @click="selectedBookmarks = []" icon>
                <v-icon>arrow_back</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{selectedBookmarks.length===1?(selectedBookmarks[0]===100?0:1):selectedBookmarks.length}}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn @click="selectAll" icon>
                <v-icon>select_all</v-icon>
              </v-btn>
            </v-list-tile-action>

            <v-list-tile-action>
              <v-btn @click="unbookmarkSelected" icon>
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>

          <v-divider v-if="selectedBookmarks.length > 0"/>

          <template v-for="(item, index) in $liste.liste">
            <v-list-tile :key="item.type + '-' + item.id" @click="click(index)">
              <v-list-tile-action v-if="count > 1" @click.stop>
                <v-checkbox v-model="selectedBookmarks" :value="index"/>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.label }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.type }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn @click.stop="unbookmark(index)" icon>
                  <v-icon>close</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
        <v-list v-else three-line>
          <v-list-tile inactive>
            <v-list-tile-content>
              <v-list-tile-title centered>Keine Lesezeichen</v-list-tile-title>
              <v-list-tile-sub-title>Klicke auf das
                <v-icon small>star_border</v-icon>-Symbol auf den Details-Seiten um die jeweilige hinzuzufügen.
              </v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
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


@Component({})
export default class showLesezeichen extends Vue {
  menu: boolean = false
  selectedBookmarks: Array<number> = []
  count = 0

  destroyed() {
    this.$liste.removeAllListeners('changed2')
  }

  mounted(){
    this.$liste.on('changed2', ()=>{
      this.count = this.$liste.liste.length
    })
    this.count = this.$liste.liste.length
  }

  toggleSelection(index: number) {
    if (this.selectedBookmarks.includes(index)) {
      this.deselect(index)
    } else {
      this.selectedBookmarks.push(index) // Add to list
    }
  }

  deselect(index: number) {
    const position = this.selectedBookmarks.indexOf(index)

    if (position > -1) {
      this.selectedBookmarks.splice(position, 1)
    }
  }

  selectAll() {
    if (
      this.selectedBookmarks.length ===
      this.$liste.liste.length
    ) {
      this.selectedBookmarks = [100]
    } else {
      this.selectedBookmarks = Array.from(
        this.$liste.liste.keys()
      )
    }
  }

  click(index: number) {
    const bookmark = this.$liste.liste[index]
    this.menu = false //close menu
    this.$router.push(bookmark.route)
  }

  unbookmark(index: number) {
    if (index !== 100) {
      const bookmark = this.$liste.liste[index]
      this.$liste.delete(bookmark)
    }
    this.selectedBookmarks = []
  }

  unbookmarkSelected() {
    this.selectedBookmarks
      .sort()
      .reverse()
      .forEach(this.unbookmark)
    this.selectedBookmarks = []
  }

  @Watch('menu')
  onMenuOpenClose(isOpen: boolean) {
    if (!isOpen) {
      this.selectedBookmarks = []
    }
  }

  @Watch('selectedBookmarks')
  onSelectdedChange() {
    if (this.selectedBookmarks.length > 1) {
      this.deselect(100)
    }
  }
}
</script>
