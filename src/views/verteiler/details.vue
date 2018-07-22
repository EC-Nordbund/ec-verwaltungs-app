<template>
  <ec-wrapper title="Verteiler Details" :label="data.verteiler.bezeichnung || ''" type="Verteiler" @share="share">    
    <template slot="label">
      <ec-headline>
        {{data.verteiler.bezeichnung}}
      </ec-headline>
      <ec-button-icon @click="verteilerStamm_open" v-if="auth.isMutationAllowed('editAKStamm')"/>
    </template>

    <template>
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
    </template>

    <template slot="actions">
      <ec-button-add v-if="auth.isMutationAllowed('addVerteilerPerson') && !data.verteiler.isAuto" @click="addPerson_show = true"/>
    </template>

    <template slot="forms">
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
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import gql from 'graphql-tag'

import auth from '@/plugins/auth'
import electron, { isElectron } from '@/plugins/electron'

import {personConfig,bezeichnungConfig,verteilerTypeConfig} from '@/plugins/formConfig/index'

import { query } from '@/graphql/index'

import {getClient} from '@/plugins/apollo'
import event from '@/plugins/eventbus'

@Component({
  beforeRouteEnter (to, from, next) {
    event.emit('showLoading')
    getClient().query(
      {
        query: query.verteiler.details.load,
        variables: {
          authToken: auth.authToken,
          verteilerID: to.params.id
        }
      }
    ).then((v:any)=>{
      next(vm=>{
        (<any>vm).data = v.data
        setTimeout(()=>{
          event.emit('hideLoading')
        }, 500)
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    event.emit('showLoading')
    getClient().query(
      {
        query: query.verteiler.details.load,
        variables: {
          authToken: auth.authToken,
          verteilerID: to.params.id
        }
      }
    ).then((v:any)=>{
      (<any>this).data = v.data
      (<any>this).variabels = {
        authToken: auth.authToken,
        verteilerID: to.params.id
      }
      next()
      setTimeout(()=>{
        event.emit('hideLoading')
      }, 500)
    })
  }
})
export default class verteilerDetails extends reloaderBase {
  data: { verteiler: any } = { verteiler: {} }
  verteilerStamm_show = false
  verteilerStamm_value = {}
  verteilerStamm_config = [
    bezeichnungConfig
  ]
  addPerson_show = false
  addPerson_config = [
    personConfig,
    verteilerTypeConfig
  ]
  editPerson_show = false
  editPerson_value = {}
  editPerson_config = [
    personConfig,
    verteilerTypeConfig
  ]
  verteilerStamm_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.verteiler.details.editStamm,
        variables: {
          verteilerID: this.data.verteiler.verteilerID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  verteilerStamm_open() {
    this.verteilerStamm_value = {}
    this.verteilerStamm_value = {
      bezeichnung: this.data.verteiler.bezeichnung
    }
    this.verteilerStamm_show = true
  }
  addPerson_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.verteiler.details.addPerson,
        variables: {
          verteilerID: this.data.verteiler.verteilerID,
          authToken: auth.authToken,
          type: value.type,
          personID: value.person
        }
      })
      .then(this.refetch)
  }
  editPerson_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.verteiler.details.editPerson,
        variables: {
          verteilerID: this.data.verteiler.verteilerID,
          authToken: auth.authToken,
          ...value
        }
      })
      .then(this.refetch)
  }
  editPerson_delete(value: any) {
    this.$apollo
      .mutate({
        mutation: query.verteiler.details.deletePerson,
        variables: {
          authToken: auth.authToken,
          verteilerPersonID: value.verteilerPersonenID
        }
      })
      .then(this.refetch)
  }
  editPerson_open(item: any) {
    this.editPerson_value = {}
    this.editPerson_value = {
      person: item.person.personID,
      type: item.type,
      verteilerPersonenID: item.verteilerPersonenID
    }
    this.editPerson_show = true
  }
  created() {
    this.variabels = {
      authToken: auth.authToken,
      verteilerID: this.$route.params.id
    }
    this.query = query.verteiler.details.load
    super.created()
  }
  share(share: (url:string)=>void) {
    share(this.$route.fullPath)
  }
}
</script>
