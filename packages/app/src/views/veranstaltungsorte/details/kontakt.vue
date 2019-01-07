<template>
  <v-card-text>
    <ec-liste
      :items="data.vort.kontakte.length>0?data.vort.kontakte.map(v=>([
        {
          title: kontakt.ansprechpartner,
          subTitle: 'Ansprechpartner'
        },
        {
          title: kontakt.typ,
          subTitle: 'Typ'
        },
        {
          title: kontakt.telefon,
          subTitle: 'Telefon'
        },
        {
          title: kontakt.email,
          subTitle: 'E-Mail'
        },
        {
          title: kontakt.notizen,
          subTitle: 'Notizen'
        },
        {
          divider: true
        }
      ])).flat():[{title: 'Keine Kontakte vorhanden!'}]"
      v-model="page"
      :standard="data.vort.kontakte.length>0?{title: 'N/A', iconB: 'edit', clickB(){$refs.editVortAllg.show()}}:{}"
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
  valid = false

  value = {
    bezeichnung: '',
    ansprechpartner: '',
    email: '',
    telefon: '',
    strasse: '',
    plz: '',
    ort: '',
    land: '',
    notizen: ''
  }

  @Prop({ type: Object })
  data!: any

  @Prop({ type: Number })
  countPerPage!: number

  @Watch('data', {immediate: true})
  onDataChange(){
    this.value = <any>{}
    this.value = <any>{
      ...this.data
    }
  }

  page: any = 1

  created() {
    this.page = this.$route.query.page || 1
  }

  @Watch('page')
  onPageChange() {
    this.$router.replace({
      path: this.$route.path,
      query: {
        page: this.page,
        prev: this.$route.query.prev
      }
    })
  }

  mail() {
    window.location.href = 'mailto:' + this.data.orga.email
  }
  
  map() {
    // TODO:
    alert('Hier folgt in Kürze eine Karte!')
  }
}
</script>