<template>
  <ec-wrapper title="Administration" mini @share="share">
    <!-- Main Content -->
    <ec-list
      :items="data.users"
      :mapper="(item)=>({
        title: `${item.userName} (${item.person.vorname} ${item.person.nachname})`,
        subTitle: `${item.userGroup.bezeichnung} (bis ${item.ablaufDatum.german})`
      })"
      edit
      icon="person"
      @edit="editUser"
    />

    <!-- Froms -->
    <template slot="forms">
      <ec-form
        title="User editieren"
        deleteBtn
        @delete="deleteUser"
        v-model="editUser_show"
        @save="updateUser"
        :fieldConfig="editUser_config"
        :value="editUser_value"
      />
      <ec-form
        title="User hinzufügen"
        v-model="addUser_show"
        @save="saveNewUser"
        :fieldConfig="addUser_config"
        :value="addUser_value"
      />
      <ec-form
        title="Nachricht hinzufügen"
        v-model="addNachricht_show"
        @save="addNachricht_save"
        :fieldConfig="addNachricht_config"
        :value="addNachricht_value"
      />
    </template>

    <!-- Actions in Bottom -->
    <template slot="actions">
      <v-dialog persistent max-width="800px" v-model="dse_show">
        <v-btn slot="activator">
          <v-icon>edit</v-icon>
          Datenschutz editieren
        </v-btn>
        <v-card>
          <v-card-title>
            <h1 v-font v-primary>
              Datenschutzerklärung
            </h1>
          </v-card-title>
          <v-card-text>
            <v-textarea label="HTML-Code für Infotext" v-model="htmlCode"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="dse_show = false">
              Abbrechen
            </v-btn>
            <v-btn @click="dse_save">
              Speichern
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn @click="addNachricht_show = true">
        <v-icon>add</v-icon>
        Nachricht
      </v-btn>
      <ec-button-add @click="addUser"/>
    </template>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'

import auth from '@/plugins/auth'

import gql from 'graphql-tag'

import {
  eMailConfig,
  personConfig,
  usernameConfig,
  usergroupConfig
} from '@/realPlugins/formConfig'

import { required } from '@/config/rules'

import event from '@/plugins/eventbus'

import {getClient} from '@/realPlugins/apollo'

const loadGQL = gql`
  query($authToken: String!) {
    users(authToken: $authToken) {
      userID
      userName
      person {
        personID
        vorname
        nachname
      }
      ablaufDatum {
        german
        input
      }
      userGroup {
        userGroupID
        bezeichnung
      }
    }
  }
`

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: loadGQL,
        variables: {
          authToken: auth.authToken
        }
      })
      .then((v: any) => {
        next(vm => {
          ;(<admin>vm).data = v.data
          setTimeout(() => {
            event.emit('hideLoading')
          }, 500)
        })
      })
  }
})
export default class admin extends reloaderBase {
  dse_show = false
  htmlCode = ''
  addNachricht_show = false
  addNachricht_config = [
    {
      label: 'Nachricht',
      name: 'msg',
      required: true,
      rules: [required('eine Nachricht')],
      componentName: 'v-text-field'
    },
    {
      label: 'angezeigter Absender',
      name: 'von',
      required: true,
      rules: [required('einen Absender')],
      componentName: 'v-text-field'
    }
  ]
  addNachricht_value = {
    msg: '',
    von: ''
  }
  addNachricht_save(value: any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation(
          $authToken: String!
          $msg: String!
          $von: String!
        ) {
          addAlert(
            msg: $msg
            von: $von
            authToken: $authToken
          )
        }
      `,
      variables: {
        authToken: this.auth.authToken,
        ...value
      }
    })
  }
  data = {
    users: []
  }
  addUser_show = false
  addUser_config = [
    personConfig,
    usernameConfig,
    eMailConfig,
    {
      label: 'Gültig bis',
      name: 'ablaufDatum',
      required: true,
      rules: [required('ein Ablaufdatum')],
      componentName: 'ec-form-datePicker'
    },
    usergroupConfig
  ]
  editUser_show = false
  editUser_config = [
    { ...personConfig, 'menu-props': 'disabled', disabled: true},
    { ...usernameConfig, disabled: true },
    {
      label: 'Gültig bis',
      name: 'ablaufDatum',
      required: true,
      rules: [required('ein Ablaufdatum')],
      componentName: 'ec-form-datePicker'
    },
    usergroupConfig
  ]
  editUser_value: any = {
    username: '',
    email: '',
    usergroup: ''
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = loadGQL
    super.created()
  }
  addUser_value = {
    personID: '',
    username: '',
    email: '',
    ablaufDatum: '',
    usergroup: ''
  }
  addUser() {
    this.addUser_show = true
  }
  saveNewUser(value: any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation($authToken: String!, $userGroupID: Int!, $ablaufDatum: String!, $personID: Int!, $username: String!, $email: String!){
          addUser(authToken: $authToken, userGroupID: $userGroupID, ablaufDatum: $ablaufDatum, personID: $personID, username: $username, email: $email)
        }
      `,
      variables: {
        userGroupID: value.usergroup,
        ablaufDatum: value.ablaufDatum,
        authToken: auth.authToken,
        personID: value.personID,
        username: value.username,
        email: value.email
      }
    }).then(this.refetch)
  }
  updateUser(value: any) {
    this.$apollo.mutate({
      mutation: gql`
        mutation($userID: Int!, $authToken: String!, $userGroupID: Int!, $ablaufDatum: String!){
          editUser(userID: $userID, authToken: $authToken, userGroupID: $userGroupID, ablaufDatum: $ablaufDatum)
        }
      `,
      variables: {
        userID: value.userID,
        userGroupID: value.userGroup,
        ablaufDatum: value.ablaufDatum,
        authToken: auth.authToken
      }
    }).then(this.refetch)
  }
  deleteUser(value: {userID: number}) {
    this.$apollo.mutate({
      mutation: gql`
        mutation($userID: Int!, $authToken: String!){
          deleteUser(userID: $userID, authToken: $authToken)
        }
      `,
      variables: {
        userID: value.userID,
        authToken: auth.authToken
      }
    }).then(this.refetch)
  }
  editUser(user: any) {
    this.editUser_value = {
      userID: user.userID,
      personID: user.person.personID,
      username: user.userName,
      ablaufDatum: user.ablaufDatum.input,
      usergroup: user.userGroup.userGroupID
    }
    this.editUser_show = true
  }

  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
  dse_save() {
    this.dse_show = false
    this.$apollo
      .mutate({
        mutation: gql`
          mutation($text: String!, $authToken: String!) {
            addDSE(text: $text, authToken: $authToken)
          }
        `,
        variables: {
          authToken: auth.authToken,
          text: this.htmlCode
        }
      })
      .then(() => {
        this.htmlCode = ''
      })
  }
}
</script>