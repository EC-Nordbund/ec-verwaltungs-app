<template>
  <v-list two-line>
    <template v-for="(item, index) of items">
      <v-divider v-if="item.divider&&index>0" :key="index"/>
      <v-list-tile v-if="!item.divider" :key="index" @click.stop="clickHandler(item.click)">
        <v-list-tile-action v-if="item.iconA || standard.iconA">
          <v-btn v-if="item.clickA" @click.stop="item.clickA" icon>
            <v-icon color="indigo">{{item.iconA || standard.iconA}}</v-icon>
          </v-btn>
          <v-icon v-if="!item.clickA" color="indigo">{{item.iconA || standard.iconA}}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content v-if="item.title || standard.title">
          <v-list-tile-title>{{item.title || standard.title}}</v-list-tile-title>
          <v-list-tile-sub-title v-if="item.subTitle || standard.subTitle">{{item.subTitle || standard.subTitle}}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action v-if="item.iconB || standard.iconB">
          <v-btn v-if="item.clickB" @click.stop="item.clickB" icon>
            <v-icon color="indigo">{{item.iconB || standard.iconB}}</v-icon>
          </v-btn>
          <v-icon v-if="!item.clickB" color="indigo">{{item.iconB || standard.iconB}}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </template>
    <v-list-tile v-for="i in extra" :key="`ex-${i}`"/>
  </v-list>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class orgaDetailsVeranstaltungen extends Vue {
  @Prop({ type: Array })
  items!: any

  @Prop({ type: Object })
  standard!: any

  @Prop({ type: Number, default: 0 })
  extra!: any

  clickHandler(func: Function){
    if(func){
      func()
    }
  }
}
</script>