<template>
  <v-card-text>
    <ec-list-new
      :items="[
        {
          title: data.orga.ansprechpartner,
          subTitle: 'Ansprechpartner',
          iconA: 'person',
          iconB: 'edit',
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.email,
          subTitle: 'E-Mail',
          iconA: 'mail',
          iconB: 'edit',
          click: mail,
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.telefon,
          subTitle: 'Telefon',
          iconA: 'phone',
          iconB: 'edit',
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.strasse,
          subTitle: `${data.orga.plz} ${data.orga.ort} (${data.orga.land})`,
          iconA: 'location_on',
          iconB: 'edit',
          click: map,
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.notizen || 'N/A',
          iconA: 'extension',
          iconB: 'edit',
          click: ()=>{},
          clickB: edit
        }
      ]"
      v-model="page"
      :standard="{}"
      :countPerPage="countPerPage"
    />
  </v-card-text>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class orgaDetailsAllgemein extends Vue {
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

  edit(){
    console.log("edit")
  }
  mail(){
    window.location.href="mailto:" + this.data.orga.email
  }
  map(){
    console.log('map')
  }
}
</script>