<template>
  <ec-list-view
    :query="require('@/graphql/organisationen/loadList.gql')"
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
      }
    ]"
    title="Organisationen"
    :getItems="data=>data.orgas"
    :addFormConfig="{
      title: 'Hinzufügen einer Organisation',
      value: {},
      config: { 
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
            mutation: require('@/graphql/organisationen/addOrga.gql')
          }
        ]
      }
    }"
  >
    <template slot="row" slot-scope="{item}">
      <tr
        @click="$router.push({ path: `/organisationen/${item.organisationsID}/allgemein`, query: {prev: $route.fullPath}})"
      >
        <td>{{ item.bezeichnung }}</td>
        <td>{{item.plz}} {{item.ort}} ({{item.land}})</td>
      </tr>
    </template>
  </ec-list-view>
</template>