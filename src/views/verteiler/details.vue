<template>
    <div>
    <!-- Header -->
    <v-toolbar ripple tabs>
      <v-spacer/>
      <ec-headline>{{data.verteiler.bezeichnung}}{{data.verteiler.isAuto?' (automatisch)':''}}</ec-headline>
      <v-spacer/>
      <ec-button-icon @click="verteilerStamm_open" v-if="auth.isMutationAllowed('editVerteilerStamm')"/>
    </v-toolbar>
    <!-- Content -->
    <v-card>
      <ec-list
        :items="data.verteiler.personen || []"
        :mapper="item=>({
          title: `${item.person.vorname} ${item.person.nachname} (${item.person.gebDat.german})`,
          subTitle: `${item.type===1?'TO':''}${item.type===2?'CC':''}${item.type===3?'BCC':''}`  
        })"
        :edit="!data.verteiler.isAuto && auth.isMutationAllowed('editVerteilerPerson')"
        @edit="editPerson_open"
        icon="mail"
      />
      <v-card-actions v-if="auth.isMutationAllowed('addVerteilerPerson')">
        <ec-button-add v-if="!data.verteiler.isAuto" @click="addPerson_show = true"/>
      </v-card-actions>
    </v-card>
    <!-- editStamm -->
    <ec-form
      title="Editieren der Stammdaten"
      v-model="verteilerStamm_show"
      :fieldConfig="verteilerStamm_config"
      :value="verteilerStamm_value"
      @save="verteilerStamm_save"
    />
    <!-- addPerson -->
    <ec-form
      title="Person hinzufügen"
      v-model="addPerson_show"
      :fieldConfig="addPerson_config"
      @save="addPerson_save"
    />
    <!-- editPerson -->
    <ec-form
      title="Person editieren"
      v-model="editPerson_show"
      :fieldConfig="editPerson_config"
      deleteBtn
      :value="editPerson_value"
      @save="editPerson_save"
      @delete="editPerson_delete"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'

@Component({})
export default class verteilerDetails extends reloaderBase {
  data: {verteiler: any} = {verteiler: {}}
  verteilerStamm_show = false
  verteilerStamm_value = {}
  verteilerStamm_config = [
    {
      label: 'Bezeichnung',
      name: 'bezeichnung',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst eine Bezeichnung angeben!' : true),
        (v:string) => (v && v.length > 50 ? 'Die Bezeichnung darf nicht länger als 50 Zeichen sein!' : true),
      ],
      counter: 50,
    },
  ]
  addPerson_show = false
  addPerson_config = [
    {
      label: 'Person',
      name: 'person',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst eine Person auswählen!' : true),
      ],
      componentName: 'ec-select-person',
    },
    {
      label: 'Type',
      name: 'type',
      required: true,
      rules: [
        (v:number) => (!v ? 'Du musst einen Typ auswählen!' : true),
      ],
      componentName: 'ec-radio-type',
    },
  ]
  editPerson_show = false
  editPerson_value = {}
  editPerson_config = [
    {
      label: 'Person',
      name: 'person',
      required: true,
      rules: [
        (v:string) => (!v ? 'Du musst eine Person auswählen!' : true),
      ],
      componentName: 'ec-select-person',
      disabled: true,
    },
    {
      label: 'Type',
      name: 'type',
      required: true,
      rules: [
        (v:number) => (!v ? 'Du musst einen Typ auswählen!' : true),
      ],
      componentName: 'ec-radio-type',
    }
  ]
  verteilerStamm_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($verteilerID:Int!, $authToken:String!, $bezeichnung:String!) {
          editVerteilerStamm(
            verteilerID: $verteilerID,
            authToken: $authToken,
            bezeichnung: $bezeichnung
          )
        }
      `,
      variables: {
        verteilerID: this.data.verteiler.verteilerID,
        bezeichnung: value.bezeichnung,
        authToken: auth.authToken,
      },
    }).then(this.refetch);
  }
  verteilerStamm_open() {
    this.verteilerStamm_value = {};
    this.verteilerStamm_value = {
      bezeichnung: this.data.verteiler.bezeichnung,
    };
    this.verteilerStamm_show = true;
  }
  addPerson_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($verteilerID:Int!, $authToken:String!, $personID:Int!, $type:Int!) {
          addVerteilerPerson(
            verteilerID: $verteilerID,
            authToken: $authToken,
            personID: $personID,
            type: $type
          )
        }
      `,
      variables: {
        verteilerID: this.data.verteiler.verteilerID,
        authToken: auth.authToken,
        type: value.type,
        personID: value.person,
      },
    }).then(this.refetch);
  }
  editPerson_save(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($verteilerID:Int!, $authToken:String!, $personID:Int!, $type:Int!, $verteilerPersonID:Int!) {
          editVerteilerPerson(
            verteilerPersonID: $verteilerPersonID,
            personID: $personID,
            verteilerID: $verteilerID,
            type: $type,
            authToken: $authToken
          )
        }
      `,
      variables: {
        verteilerID: this.data.verteiler.verteilerID,
        authToken: auth.authToken,
        type: value.type,
        personID: value.person,
        verteilerPersonID: value.verteilerPersonenID,
      },
    }).then(this.refetch);
  }
  editPerson_delete(value:any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation ($authToken:String!, $verteilerPersonID:Int!) {
          deleteVerteilerPerson(
            authToken: $authToken,
            verteilerPersonID: $verteilerPersonID
          )
        }
      `,
      variables: {
        authToken: auth.authToken,
        verteilerPersonID: value.verteilerPersonenID,
      },
    }).then(this.refetch);
  }
  editPerson_open(item:any) {
    this.editPerson_value = {};
    this.editPerson_value = {
      person: item.person.personID,
      type: item.type,
      verteilerPersonenID: item.verteilerPersonenID,
    };
    this.editPerson_show = true;
  }
  created() {
    this.variabels = {
      authToken: auth.authToken,
      verteilerID: this.$route.params.id
    }
    this.query = gql`
      query($authToken: String!, $verteilerID: Int!){
        verteiler(verteilerID: $verteilerID, authToken: $authToken) {
          verteilerID
          bezeichnung
          autoSQL
          isAuto
          personen {
            verteilerPersonenID
            type
            person {
              personID
              vorname
              nachname
              gebDat {
                german
              }
            }
          }
        }
      }
    `
    super.created()
  }
}
</script>
