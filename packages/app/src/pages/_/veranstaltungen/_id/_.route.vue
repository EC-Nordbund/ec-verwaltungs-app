<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    template
      v-menu(bottom left)
        template(v-slot:activator="{ on }")
          v-btn(v-on="on") TN-Liste gnerieren
        v-list
          v-list-tile(@click="all")
            v-list-tile-title Alle (jeweils mit und ohne Warteliste)
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v==0)")
            v-list-tile-title {{item.label}}
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v>=0)")
            v-list-tile-title {{item.label}} mit Warteliste
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v>0)")
            v-list-tile-title {{item.label}} nur Warteliste
          v-divider
          v-list-tile(v-for="item in tnListen" @click="g(item.name, v=>v<0)")
            v-list-tile-title {{item.label}} nur Abgemeldete
      router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { generate, getTemplates } from '@/tnList';


@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private tnListen: any = [];
  private genList = generate;

  private config = {
    sheet: [
    ],
    nav: [
      {
        icon: 'menu',
        label: 'Allgemein',
        to: 'home'
      },
      {
        icon: 'menu',
        label: 'Finanzen',
        to: 'finanzen'
      },
      {
        icon: 'menu',
        label: 'Erlaubnisse und Bemerkungen',
        to: 'erlaubnisse'
      }
    ],
    title: 'VERANSTALTUNGSNAME',
    subTitle: 'Veranstaltung'
  };

  private all() {
    this.tnListen.forEach((el: {name: string, label: string}) => {
      this.g(el.name, (v) => v === 0);
      this.g(el.name, (v) => v >= 0);
    });
  }

  private g(name: string, wList: (v: number) => boolean) {
    this.genList(parseInt(this.$route.params.id, 10), name, this.$authToken, this.$apolloClient, wList);
  }

  private created() {
    getTemplates().then((res) => {this.tnListen = res; });
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
