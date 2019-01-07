<template>
  <ec-simple-page
    :items="[
      {
        title: data.vort.strasse,
        subTitle:`${data.vort.plz} ${data.vort.ort} (${data.vort.land})`,
        iconA: 'home',
        iconB: 'edit',
        click: map
      },
      {
        divider: true
      },
      {
        title: `${(data.vort.organisation||{}).bezeichnung} (${(data.vort.organisation||{}).ort} ${(data.vort.organisation||{}).land})`,
        subTitle: 'Organisation bei der gebucht',
        iconA: 'home',
        click(){
          $router.push({path: `/organisationen/${data.vort.organisation.organisationsID}`, query: {prev: $route.fullPath}})
        }
      },
      {
        divider: true
      },
      {
        title: data.vort.anzahl_min,
        subTitle: 'Mindestzahl an TN',
        iconA: 'home'
      },
      {
        title: data.vort.anzahl_max,
        subTitle: 'Maximalzahl an TN',
        iconA: 'home'
      },
      ...(data.vort.vollverpflegung?[
        {
          title: 'Vollverpflegung möglich',
          iconA: 'home'
        }
      ]:[]),
      ...(data.vort.selbstversorger?[
        {
          title: 'Selbstversorger möglich',
          iconA: 'home'
        }
      ]:[]),
      {
        title: data.vort.notizen,
        subTitle: 'Notizen',
        iconA: 'home'
      }
    ]"
    :standard="{title: 'N/A', iconB: 'edit', clickB(){$refs.editVortAllg.show()}}"
    :countPerPage="countPerPage"
  > 
    <ec-form
      ref="editVortAllg"
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
            ]
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
            name: 'anzahl_min',
            label: 'Mindest Anzahl TN',
            component: 'v-text-field',
            mask: '###',
            counter: 3
          },
          {
            name: 'anzahl_max',
            label: 'Maximal Anzahl TN',
            component: 'v-text-field',
            mask: '###',
            counter: 3
          },
          {
            name: 'organisationsID',
            label: 'Organisation {comming soon...}',
            component:'v-text-field',
            value: 0,
            disabled: true
          },
          {
            name: 'notizen',
            label: 'Notizen',
            component: 'v-textarea'
          }
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
  </ec-simple-page>
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

  mail() {
    window.location.href = 'mailto:' + this.data.orga.email
  }
  
  map() {
    this.$util.map(this.data.vort.strasse,this.data.vort.plz,this.data.vort.ort,this.data.vort.land)
  }
}
</script>