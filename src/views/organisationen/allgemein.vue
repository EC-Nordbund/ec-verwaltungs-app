<template>
  <v-card-text>
    <ec-list-new
      :items="[
        {
          title: data.orga.ansprechpartner,
          subTitle: 'Ansprechpartner',
          iconA: 'person',
          iconB: 'edit',
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.email,
          subTitle: 'E-Mail',
          iconA: 'mail',
          iconB: 'edit',
          click: mail,
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.telefon,
          subTitle: 'Telefon',
          iconA: 'phone',
          iconB: 'edit',
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.strasse,
          subTitle: `${data.orga.plz} ${data.orga.ort} (${data.orga.land})`,
          iconA: 'location_on',
          iconB: 'edit',
          click: map,
          clickB: edit
        },
        {
          divider: true
        },
        {
          title: data.orga.notizen,
          iconA: 'extension',
          iconB: 'edit',
          clickB: edit
        }
      ]"
      v-model="page"
      :standard="{title: 'N/A'}"
      :countPerPage="countPerPage"
    />
    <v-dialog v-model="editShow" persistend max-width="500px">
      <v-card>
        <v-card-title>
          <h1 v-font v-primary>Editieren der Organisation</h1>
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field v-bind="$formConfig.bezeichnungConfig" v-model="value.bezeichnung"/>
            <v-text-field
              v-bind="$formConfig.ansprechpartnerConfig"
              v-model="value.ansprechpartner"
            />
            <v-text-field v-bind="$formConfig.eMailConfig" v-model="value.email"/>
            <v-text-field v-bind="$formConfig.telefonConfig" v-model="value.telefon"/>
            <v-text-field v-bind="$formConfig.strasseConfig" v-model="value.strasse"/>
            <v-text-field v-bind="$formConfig.plzConfig" v-model="value.plz"/>
            <v-text-field v-bind="$formConfig.ortConfig" v-model="value.ort"/>
            <v-text-field v-bind="$formConfig.landConfig" v-model="value.land"/>
            <v-textarea v-bind="$formConfig.notizConfig" v-model="value.notizen"/>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="editShow=false">Abbrechen</v-btn>
          <div style="margin: 0px 3px;"/>
          <gql-mutate :variables="value" @done="refetch">
            <v-btn
              slot="activation"
              slot-scope="{mutate}"
              @click="mutate();editShow=false"
              :disabled="!valid"
              color="primary"
            >Speichern</v-btn>
            <template slot="query">
              mutation ($organisationsID: Int!, $authToken: String!, $bezeichnung: String!, $ansprechpartner: String!, $strasse: String!, $plz: String!, $ort: String!, $land: String!, $telefon: String!, $email: String!, $notizen: String) {
              editOrganisation(authToken: $authToken, organisationsID: $organisationsID, bezeichnung: $bezeichnung, ansprechpartner: $ansprechpartner, strasse: $strasse, plz: $plz, ort: $ort, land: $land, telefon: $telefon, email: $email, notizen: $notizen)
              }
            </template>
          </gql-mutate>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card-text>
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
  valid = false
  editShow = false

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

  @Prop({ type: Function })
  refetch!: Function

  @Prop({ type: Number })
  countPerPage!: number

  page: any = 1

  created() {
    this.page = this.$route.query.page || 1
  }

  @Watch('page')
  onPageChange() {
    this.$router.replace({
      path: this.$route.path,
      query: {
        page: this.page,
        prev: this.$route.query.prev
      }
    })
  }

  edit() {
    this.value = <any>{
      ...this.data.orga
    }
    this.editShow = true
  }
  mail() {
    window.location.href = 'mailto:' + this.data.orga.email
  }
  map() {
    // TODO:
    alert('Hier folgt in Kürze eine Karte!')
  }
}
</script>