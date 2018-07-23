<template>
  <v-menu offset-y width="512px">
    <template slot="activator">
      <v-badge color="red" v-if="lesezeichen.liste.length > 0 ">
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
      <v-card-title>
        <h1 v-font>Lesezeichen</h1>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="[
            {
              text: 'Typ',
              value: 'type',
              width: '30px'
            },
            {
              text: 'Beschreibung',
              value: 'label'
            },
            {
              text: 'ID',
              width: '25px',
              value: 'id'
            },
            {
              text: '',
              width: '25px',
              value: 'id',
              sortable: false
            }
          ]"
          :items="lesezeichen.liste"
          :rows-per-page-items="[10]"
          class="elevation-1"
          disable-initial-sort
        >
          <template slot="items" slot-scope="props">
            <tr @click="xButtonLogic.reset(props.item.xButton);$router.push(props.item.route)">
              <td>{{ props.item.type }}</td>
              <td>{{ props.item.label }}</td>
              <td>{{ props.item.id }}</td>
              <td>
                <v-btn icon @click="lesezeichen.delete(props.item.route)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
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
}
</script>
