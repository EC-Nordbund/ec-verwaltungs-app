<template>
  <v-card-text>
    <ec-liste
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
          title: data.orga.notizen,
          iconA: 'extension',
          iconB: 'edit',
          clickB: edit
        }
      ]"
      v-model="page"
      :standard="{title: 'N/A'}"
      :countPerPage="countPerPage"
    />
    <ec-form
      ref="editOrga"
      title="Editieren der Organisation"
      :value="value"
      :config="{
        form: [
          {
            name: 'bezeichnung',
            label: 'Bezeichnungen',
            component: 'v-text-field',
            counter:50,
            rules:[
              v=>!v?'Du musst eine Bezeichnung angeben!':true,
              v=>(v&&v.length > 50)?'Die Bezeichnung darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'ansprechpartner',
            label: 'Ansprechpartner',
            component: 'v-text-field',
            counter: 50,
            rules:[
              v=>!v?'Du musst einen Ansprechpartner angeben!':true,
              v=>(v&&v.length > 50)?'Der Ansprechpartner darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'email',
            label: 'E-Mail',
            component: 'v-text-field',
            counter: 50,
            rules:[
              v=>!v?'Du musst eine E-Mail angeben!':true,
              v=>(v&&v.length > 50)?'Die E-Mail Adresse darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'telefon',
            label: 'Telefon',
            component: 'v-text-field',
            counter: 20,
            rules:[
              v=>!v?'Du musst eine Telefonnummer angeben!':true,
              v=>(v&&v.length > 50)?'Die Telefonnummer darf maximal 20 Zeichen lang sein.':true
            ],
            mask: '####################'
          },
          {
            name: 'strasse',
            label: 'Strasse',
            component: 'v-text-field',
            counter: 50,
            rules:[
              v=>!v?'Du musst eine Strasse angeben!':true,
              v=>(v&&v.length > 50)?'Die Strasse darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'plz',
            label: 'PLZ',
            component: 'v-text-field',
            counter: 8,
            rules:[
              v=>!v?'Du musst eine PLZ angeben!':true,
              v=>(v&&v.length > 8)?'Die PLZ darf maximal 8 Zeichen lang sein.':true
            ],
            mask: '#####'
          },
          {
            name: 'ort',
            label: 'Ort',
            component: 'v-text-field',
            counter: 50,
            rules:[
              v=>!v?'Du musst einen Ort angeben!':true,
              v=>(v&&v.length > 50)?'Der Ort darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'land',
            label: 'Land',
            component: 'v-text-field',
            counter: 50,
            rules:[
              v=>!v?'Du musst ein Land angeben!':true,
              v=>(v&&v.length > 50)?'Das Land darf maximal 50 Zeichen lang sein.':true
            ]
          },
          {
            name: 'notizen',
            label: 'Notizen',
            component: 'v-textarea'
          },
        ],
        buttons: [
          {
            onDone(){},
            label:'Abbrechen',
            needValid:false
          },
          {
            onDone(){},
            label:'Speichern',
            needValid:true,
            color:'primary',
            mutation: require('@/graphql/organisationen/editOrga.gql')
          }
        ]
      }"
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

  edit() {
    this.value = <any>{}
    this.value = <any>{
      ...this.data.orga
    }
    (<any>this.$refs.editOrga).show()
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