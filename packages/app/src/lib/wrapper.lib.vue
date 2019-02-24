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
  public h = window.innerHeight - 110 + 'px';
  public showNav = false;
  public sheetOpen = false;
  public timer: any;
  public timer2: any;

  @Prop({type: Boolean, default: false})
  public hasXBtn!: boolean;

  @Prop({type: Boolean, default: false})
  public hasDial!: boolean;

  @Prop({type: Boolean, default: false})
  public hasSheet!: boolean;

  @Prop({type: Boolean, default: false})
  public hasNav!: boolean;

  @Prop({type: Boolean, default: false})
  public hasRouterView!: boolean;

  @Prop({type: String, required: true})
  public title!: string;

  @Prop({type: String, required: false})
  public subTitle!: string;

  @Prop({type: Array, required: false})
  public sheet!: any[];

  @Prop({type: Array, required: false})
  public nav!: any[];

  public openNav() {
    this.showNav = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.showNav = false;
    }, 2000);
  }

  public created() {
    this.openNav();
    this.updateData();

    this.timer2 = setInterval(this.updateData, 60000);
  }

  public updateData() {
    this.$emit('getData');
  }

  public beforeDestroy() {
    clearInterval(this.timer2);
  }
}
</script>
