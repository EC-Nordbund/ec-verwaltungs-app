<template>
  <ec-wrapper
    title="Arbeitskreis Details"
    :label="data.ak.bezeichnung || ''"
    type="AK"
    @share="share">
    
    <template slot="label">
      <ec-headline>
        {{data.ak.bezeichnung}}
      </ec-headline>
      <ec-button-icon @click="editAKStamm_open" v-if="auth.isMutationAllowed('editAKStamm')"/>
    </template>

    <template>
      <ec-list v-if="data.ak.personen" :items="data.ak.personen" :mapper="mapper" :edit="auth.isMutationAllowed('editAKPerson')" @edit="edit" icon="person_pin_circle"/>
    </template>

    <template slot="actions">
      <ec-button-add v-if="auth.isMutationAllowed('addAKPerson')" @click="addAKPerson_show = true"/>
    </template>

    <template slot="forms">
      <!-- Edit AK-Stamm -->
      <ec-form
        title="Arbeitskreis editieren"
        v-model="editAKStamm_show"
        :fieldConfig="editAKStamm_config"
        :value="editAKStamm_value"
        @save="editAKStamm_save"
      />

      <!-- Edit AK-Person -->
      <ec-form
        title="Editiere Personenzuordnung"
        v-model="editAKPerson_show"
        :fieldConfig="editAKPerson_config"
        :value="editAKPerson_value"
        @save="editAKPerson_save"
      />

      <!-- ADD AK-Person -->
      <ec-form
        title="Person hinzufügen"
        v-model="addAKPerson_show"
        :fieldConfig="addAKPerson_config"
        @save="addPersonAK_save"
      />
    </template>
  </ec-wrapper>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import reloaderBase from '@/baseComponents/reloader';
import {personConfig,bezeichnungConfig} from '@/plugins/formConfig/index'
import {query} from '@/graphql/index';
import auth from '@/plugins/auth';

import {getClient} from '@/plugins/apollo'
import event from '@/plugins/eventbus'
@Component({
  beforeRouteEnter (to, from, next) {
    event.emit('showLoading')
    getClient().query(
      {
        query: query.ak.details.load,
        variables: {
          authToken: auth.authToken,
          akID: to.params.id
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
        query: query.ak.details.load,
        variables: {
          authToken: auth.authToken,
          akID: to.params.id
        }
      }
    ).then((v:any)=>{
      (<any>this).data = v.data
      (<any>this).variabels = {
        authToken: auth.authToken,
        akID: to.params.id
      }
      next()
      setTimeout(()=>{
        event.emit('hideLoading')
      }, 500)
    })
  }
})
export default class AKDetails extends reloaderBase {
  data: { ak: any } = { ak: {} }
  mapper = (item: any) => ({
    title: `${item.person.vorname} ${
      item.person.nachname
    } (${item.person.gebDat.german})`,
    subTitle: `${item.eintritt.german}${
      item.austritt ? ` ${item.austritt.german}` : ''
    }${item.leiter ? ' (Leiter)' : ''}`
  })
  editAKStamm_show = false
  editAKStamm_config = [bezeichnungConfig]
  editAKStamm_value = {}
  editAKPerson_show = false
  editAKPerson_config = [
    {
      ...personConfig,
      disabled: true
    },
    {
      label: 'Eintritt',
      name: 'eintritt',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst ein Eintrittsdatum angeben!' : true
      ],
      componentName: 'ec-form-datePicker'
    },
    {
      label: 'Austritt',
      name: 'austritt',
      required: false,
      rules: [],
      componentName: 'ec-form-datePicker'
    },
    {
      label: 'Leiter',
      name: 'leiter',
      type: 'checkbox',
      componentName: 'ec-form-checkbox'
    }
  ]
  editAKPerson_value = {}
  addAKPerson_show = false
  addAKPerson_config = [
    personConfig,
    {
      label: 'Eintritt',
      name: 'eintritt',
      required: true,
      rules: [
        (v: string) =>
          !v ? 'Du musst ein Eintrittsdatum angeben!' : true
      ],
      componentName: 'ec-form-datePicker'
    },
    {
      label: 'Leiter',
      name: 'leiter',
      type: 'checkbox',
      componentName: 'ec-form-checkbox'
    }
  ]
  edit(item: any) {
    this.editAKPerson_value = {
      personAKID: item.personAKID,
      personID: item.person.personID,
      eintritt: item.eintritt.input,
      austritt: (item.austritt || {}).input,
      leiter: item.leiter
    }
    this.editAKPerson_show = true
  }
  editAKStamm_open() {
    this.editAKStamm_value = {}
    this.editAKStamm_value = {
      bezeichnung: this.data.ak.bezeichnung
    }
    this.editAKStamm_show = true
  }
  editAKStamm_save(value: any) {
    this.$apollo.mutate({
      mutation: query.ak.details.editStamm,
      variables: {
        authToken: auth.authToken,
        akID: this.$route.params.id,
        ...value
      }
    })
  }
  editAKPerson_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.ak.details.editPerson,
        variables: {
          authToken: auth.authToken,
          akID: this.$route.params.id,
          ...value
        }
      })
      .then(this.refetch)
  }
  addPersonAK_save(value: any) {
    this.$apollo
      .mutate({
        mutation: query.ak.details.addPerson,
        variables: {
          authToken: auth.authToken,
          akID: this.$route.params.id,
          ...value
        }
      })
      .then(this.refetch)
  }

  created() {
    this.variabels = {
      authToken: auth.authToken,
      akID: this.$route.params.id
    }
    this.query = query.ak.details.load
    super.created()
  }
  share(share: (url:string)=>void) {
    share(this.$route.fullPath)
  }
}
</script>