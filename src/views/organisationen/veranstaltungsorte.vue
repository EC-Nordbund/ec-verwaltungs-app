<template>
  <v-card-text>
    <ec-list-new 
      :items="data.orga.vOrte.map((v)=>({iconA: 'place', title: v.bezeichnung, subTitle: `${v.plz} ${v.ort} (${v.land})`, click: ()=>{$router.push({path: '/app/vOrte/' + v.vOrtID, query: {prev: $route.fullPath}})}}))"
      :standard="{}"
      v-model="page"
      :countPerPage="countPerPage"/>
  </v-card-text>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component({})
export default class orgaDetailsVeranstaltungsOrte extends Vue {
  @Prop({ type: Object })
  data!: any
  
  @Prop({ type: Number })
  countPerPage!: number

  page: any = 1

  created(){
    this.page=this.$route.query.page || 1
  }

  @Watch('page')
  onPageChange(){
    this.$router.replace({path: this.$route.path, query: {page: this.page, prev: this.$route.query.prev}})
  }
}
</script>