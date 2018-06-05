<template>
  <ec-table title="Personen" itemName="Personen" :items="data.personen" :config="tableConfig" suche @open="open">
    <template slot="handleOutside" slot-scope="slotProps">
      <!-- Handle Geschlecht Col -->
       <v-avatar :style="{ background: (slotProps.item.geschlecht === 'm' ? $vuetify.theme.male : $vuetify.theme.female) }" :size="32">
        <span class="white--text headline" style="font-size: 12pt !important">
          {{slotProps.item.vorname[0]}}{{slotProps.item.nachname[0]}}
        </span>
      </v-avatar>
    </template>
    <ec-button-add @click="addPerson_show = true"/>
    <ec-form v-model="addPerson_show" title="Person hinzufügen" :fieldConfig="addPerson_config" @save="save" v-if="auth.isMutationAllowed('addPerson')"/>
  </ec-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'

@Component({})
export default class PersonenListe extends reloaderBase {
  data = {
    personen: []
  }
  tableConfig = [
    { name: 'geschlecht', label: 'Geschl.', handleOutside: true, width: '30px' },
    { name: 'vorname', label: 'Vorname' },
    { name: 'nachname', label: 'Nachname' },
    { name: 'gebDat.german', label: 'Geburtsdatum', width: '175px' },
  ]
  addPerson_show = false
  addPerson_config = [
    {
      label: 'Vorname',
      name: 'vorname',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst einen Vornamen angeben!' : true),
        (v:string) => (v && v.length > 50 ? 'Der Vorname darf nicht länger als 50 Zeichen sein!' : true),
      ],
      counter: 50,
    },
    {
      label: 'Nachname',
      name: 'nachname',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst einen Nachname angeben!' : true),
        (v:string) => (v && v.length > 50 ? 'Der Nachname darf nicht länger als 50 Zeichen sein!' : true),
      ],
      counter: 50,
    },
    {
      label: 'Geburtsdatum',
      name: 'gebDat',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst ein Geburtsdatum angeben!' : true),
      ],
      componentName: 'ec-form-datePicker',
    },
    {
      label: "Geschecht",
      name: "geschlecht",
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst ein Geschlecht angeben!' : true),
      ],
      componentName: 'ec-radio-geschlecht'
    }
  ]

  save(value: any) {
    console.log('save', value, value.gebDat, value.geschlecht)
  }
  open(item: any) {
    this.$router.push(`/app/personen/${item.personID}`);
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = gql`
      query($authToken: String!){
        personen(authToken:$authToken){
          personID
          vorname
          nachname
          gebDat {
            german
          }
          geschlecht
        }
      }
    `
    super.created()
  }
}
</script>
