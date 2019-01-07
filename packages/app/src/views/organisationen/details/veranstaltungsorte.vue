<template>
  <ec-simple-page
    :items="data.orga.vOrte
      .map((v)=>({
        title: v.bezeichnung, 
        subTitle: `${v.plz} ${v.ort} (${v.land})`, 
        click: ()=>{$router.push({path: '/app/vOrte/' + v.vOrtID, query: {prev: $route.fullPath}})}
      }))"
    :standard="{iconA: 'place'}"
    :countPerPage="countPerPage"
  />
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class orgaDetailsVeranstaltungsOrte extends Vue {
  @Prop({ type: Object })
  data!: any
  
  @Prop({ type: Number })
  countPerPage!: number
}
</script>