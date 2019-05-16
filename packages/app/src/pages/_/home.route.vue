<template lang="pug">
  ec-wrapper(hasXBtn hasSheet hasDial hasNav v-bind="config")
    template
      
    template(#menu)
      v-btn test
      v-btn test
      v-btn test
    
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexHome extends Vue {

  private config = {
    sheet: [
      {
        icon: 'menu',
        label: 'test',
        click: this.sheetClick
      }
    ],
    nav: [
      {
        icon: 'menu',
        label: 'test',
        to: 'test'
      }
    ],
    title: 'Home'
  };

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>