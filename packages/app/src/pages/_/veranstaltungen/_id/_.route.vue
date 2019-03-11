<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config")
    template(#menu)
      v-menu(bottom left)
        template(#activator="{on}")
          v-btn(icon v-on="on")
            v-icon menu
        v-list
          v-list-tile(v-for="item in (tnListen || [])" @click="genList($route.params.id, item.name, $authToken, $apolloClient)")
            v-list-title-title {{item.label}}
    router-view
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { generate, getTemplates } from '@/tnList'


@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private tnListen = getTemplates()
  private genList = generate

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

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
