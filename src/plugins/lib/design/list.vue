<template>
  <v-list>
    <v-list-tile @click="$emit('click', mapItem.item)" v-for="(mapItem, i) in itemMap" :key="i">
      <v-list-tile-action  v-if="icon!=='-'">
        <v-icon color="indigo">
          {{mapItem.map.icon || icon}}
        </v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{mapItem.map.title}}
        </v-list-tile-title>
        <v-list-tile-sub-title v-if="mapItem.map.subTitle">
          {{mapItem.map.subTitle}}
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-action v-if="mapItem.map.edit || edit">
        <ec-button-icon @click="$event.stopPropagation();$emit('edit', mapItem.item)"/>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>
<script lang="ts">
import { Component, Vue, Emit, Watch, Prop } from 'vue-property-decorator';

@Component({})
export default class Liste extends Vue {
  itemMap:Array<any> = []

  @Prop({type: Array, required: true})
  items!: Array<any>

  @Prop({type: Function, required: true})
  mapper!: (item:any)=>{icon?: string, title: string, subTitle?: string, edit?: boolean}

  @Prop({type: Boolean, default: false})
  edit!:boolean

  @Prop({type: String, default: '.'})
  icon!:boolean

  @Watch('items', {immediate: true})
  onItemsChange() {
    this.itemMap = this.items.map(item => ({
      item,
      map: this.mapper(item),
    }));
  }
}
</script>
