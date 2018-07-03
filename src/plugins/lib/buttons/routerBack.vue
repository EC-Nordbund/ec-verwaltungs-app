<template>
  <v-btn color="accent" :style="items.pathHistory.length > 0 ? 'padding-right: 0' : ''" @click="$router.back()">

    <v-icon>
      keyboard_arrow_left
    </v-icon>
    Zurück
    
    <v-menu open-on-hover bottom offset-y v-show="items.pathHistory.length > 0">
      <v-btn icon slot="activator">
        <v-icon>
          keyboard_arrow_down
        </v-icon>
      </v-btn>

      <v-list>
        <v-list-tile
          v-for="(item, index) in items.pathHistory_r"
          :key="index"
          @click="$router.push(item.route)"
          v-if="index < maxCount"
        >
          <v-list-tile-title>{{ item.beschreibung }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

  </v-btn>
</template>
<script lang="ts">
import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

import rb from '@/plugins/routerBack/index'

const maxCount = 10

/**
 * Zurückbutton (router)
 *
 * @export
 * @class RouterBack
 * @extends {Vue}
 */
@Component({})
export default class RouterBack extends Vue {
  items = rb
  maxCount = maxCount
}
</script>
