<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    
    template
      v-menu(bottom left)
        template(v-slot:activator="{ on }")
          v-btn(icon v-on="on")
            v-icon menu
        v-list
          v-list-tile(v-for="item in tnListen" @click="g(item.name)")
            v-list-tile-title {{item.label}}
      router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { generate, getTemplates } from '@/tnList';


@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private tnListen:any = [];
  private genList = generate;
  
  private g(name: string){
    this.genList(this.$route.params.id, name, this.$authToken, this.$apolloClient)
  }

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

  private created() {
    getTemplates().then(res=>{this.tnListen = res})
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
