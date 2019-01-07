<template>
  <ec-list-view
    :query="require('@/graphql/veranstaltungsOrte/loadList.gql')"
    :headers="[
      {
        text: 'Bezeichnung',
        align: 'center',
        value: 'bezeichnung'
      },
      {
        text: 'Anschrift',
        align: 'center',
        value: 'plz'
      },
      {
        text: 'Organisationen',
        align: 'center',
        value: 'organisation.bezeichnung'
      }
    ]"
    title="Veranstaltungsorte"
    :getItems="data=>data.vorte"
    :addFormConfig="{
      title: 'Hinzufügen eines Veranstaltungsort',
      value:{},
      config:{
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
            name: 'organisationsID',
            label: 'Organisation {comming soon...}',
            component:'v-text-field',
            value: 0,
            disabled: true
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
            mutation: require('@/graphql/veranstaltungsOrte/addVort.gql')
          }
        ]
      }      
    }"
  >
    <template slot="row" slot-scope="{item}">
      <tr
        @click="$router.push({ path: `/veranstaltungsorte/${item.vOrtID}/allgemein`, query: {prev: $route.fullPath}})"
      >
        <td>{{item.bezeichnung}}</td>
        <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
        <td>{{item.organisation.bezeichnung}}</td>
      </tr>
    </template>
  </ec-list-view>
</template>