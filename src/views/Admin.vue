<template>
  <ec-wrapper title="Administration" mini @share="share">
    <template>
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
    </template>

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
    </template>

    <template slot="actions">
      <ec-button-add @click="addUser"/>
    </template>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import { query } from '@/graphql'

import auth from '@/plugins/auth'

import {
  eMailConfig,
  personConfig,
  usernameConfig,
  usergroupConfig
} from '@/plugins/formConfig/index'

import {
  required
} from '@/plugins/rules'

import event from '@/plugins/eventbus'
import { getClient } from '@/plugins/apollo'

@Component({
  beforeRouteEnter(to, from, next) {
    event.emit('showLoading')
    getClient()
      .query({
        query: query.admin.load,
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
    usernameConfig,
    personConfig,
    {
      label: 'Gültig bis',
      name: 'ablaufDatum',
      required: true,
      rules: [required('ein Ablaufdatum')],
      componentName: 'ec-form-datePicker'
    },
    usergroupConfig
  ]
  editUser_value:any = {
    username: '',
    email: '',
    usergroup: ''
  }

  created() {
    this.variabels = {
      authToken: auth.authToken
    }
    this.query = query.admin.load
    super.created()
  }
  addUser_value={
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
    // TODO: Mutation
    // TODO: Send Mail
    console.log(JSON.parse(JSON.stringify(value)))
  }
  updateUser(value: any) {
    // TODO: Mutation
    console.log(JSON.parse(JSON.stringify(value)))
  }
  deleteUser(value: any) {
    // TODO: Mutation
    console.log(JSON.parse(JSON.stringify(value)))
  }
  editUser(user: any) {
    this.editUser_value = {
      userID: user.userID,
      ablaufDatum: user.ablaufDatum.input,
      personID: user.person.personID,
      usergroup: user.userGroup.userGroupID,
      username: user.userName
    }
    this.editUser_show = true
  }

  share(share: (url: string) => void) {
    share(this.$route.fullPath)
  }
}
</script>