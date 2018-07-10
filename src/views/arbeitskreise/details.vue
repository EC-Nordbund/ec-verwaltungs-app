<template>
  <div>
    <!-- Header -->
    <v-toolbar ripple extension-height="72px">
      <ec-button-router-back/>
      <v-spacer/>
      <ec-headline>{{data.ak.bezeichnung}}</ec-headline>
      <v-spacer/>
      <ec-button-icon @click="editAKStamm_open" v-if="auth.isMutationAllowed('editAKStamm')"/>
    </v-toolbar>
    <!-- Content -->
    <v-card>
      <!-- Liste -->
      <ec-list v-if="data.ak.personen" :items="data.ak.personen" :mapper="mapper" :edit="auth.isMutationAllowed('editAKPerson')" @edit="edit" icon="person_pin_circle"/>
      <!-- ADD-Button -->
      <v-card-actions>
        <ec-button-add v-if="auth.isMutationAllowed('addAKPerson')" @click="addAKPerson_show = true"/>
      </v-card-actions>
    </v-card>

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
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import reloaderBase from '@/baseComponents/reloader'
import {
  personConfig,
  bezeichnungConfig
} from '@/plugins/formConfig/index'
import { query } from '@/graphql/index'
import auth from '@/plugins/auth'
@Component({})
export default class AKDetails extends reloaderBase {
  data: { ak: any } = {
    ak: {}
  }
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
}
</script>