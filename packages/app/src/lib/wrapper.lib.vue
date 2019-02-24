<template lang="pug">
  v-card(:style="{height: h, display: 'grid', gridTemplateRows: 'auto auto 1fr ' + (hasNav?(showNav ? 'auto' : '20px'):'') }")
    v-card-title
      v-btn(
        icon 
        v-if="hasXBtn" 
        @click="$router.push($route.query.prev)" 
        :disabled="!$route.query.prev"
      )
        v-icon close
      v-spacer
      h1(v-font v-primary) {{title}}
      v-spacer
      v-speed-dial(direction="left" v-if="hasDial")
        v-btn(slot="activator" icon)
          v-icon more_vert
        v-bottom-sheet(v-if="hasSheet" v-model="sheetOpen")
          v-btn(icon slot="activator")
            v-icon edit
          v-list
            slot(name="sheet")
            v-list-tile(v-for="item in sheet" :key="item.label" @click="sheetOpen = false;item.click(item)")
              v-list-tile-action
                v-icon {{item.icon}}
              v-list-tile-title {{item.label}}
        ec-lesezeichen-add(:title="title" :subTitle="subTitle")
        slot(name="menu")
    .div
      slot(name="header")
    v-card-text(style="overflow-y: auto" v-if="!hasRouterView")
      slot
    slot(style="overflow-y: auto" v-if="hasRouterView")
    v-card-actions(@mouseover="openNav" v-if="hasNav")
      v-bottom-nav(:value="showNav" class="elevation-0")
        v-btn(v-for="item in nav" :key="item.label" :to="{path: item.to, query: {prev: $route.query.prev}}")
          span {{item.label}}
          v-icon {{item.icon}}
            
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcWrapper extends Vue {
  h = window.innerHeight - 110 + 'px'
  showNav = false
  sheetOpen = false
  timer:any
  timer2:any

  @Prop({type: Boolean, default: false})
  hasXBtn!: boolean

  @Prop({type: Boolean, default: false})
  hasDial!: boolean

  @Prop({type: Boolean, default: false})
  hasSheet!: boolean

  @Prop({type: Boolean, default: false})
  hasNav!: boolean

  @Prop({type: Boolean, default: false})
  hasRouterView!: boolean

  @Prop({type: String, required: true})
  title!: string

  @Prop({type: String, required: false})
  subTitle!: string

  @Prop({type: Array, required: false})
  sheet!: Array<any>

  @Prop({type: Array, required: false})
  nav!: Array<any>

  openNav() {
    this.showNav = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(()=>{
      this.showNav = false;
    }, 2000);
  }

  created() {
    this.openNav()
    this.updateData()

    this.timer2 = setInterval(this.updateData, 60000)
  }

  updateData() {
    this.$emit('getData')
  }

  beforeDestroy() {
    clearInterval(this.timer2)
  }
}
</script>
