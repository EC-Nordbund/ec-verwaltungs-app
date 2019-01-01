import {
  exactLength,
  inArray,
  maxLength,
  required,
  rule
  } from '@/config/rules';
import Vue from 'vue';

export interface IConfig {
  label?: string
  name: string
  required?: boolean
  rules?: rule
  componentName?: string
  counter?: number
  disabeled?: boolean
  [name: string]: any
}

// const required = true

export const vornameConfig: IConfig = {
  name: 'vorname',
  label: 'Vorname',
  required: true,
  rules: [
    required('einen Vornamen'),
    maxLength('einen Vorname', 'der', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const usernameConfig: IConfig = {
  name: 'username',
  label: 'Username',
  required: true,
  rules: [
    required('einen Usernamen'),
    maxLength('einen Usernamen', 'der', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const usergroupConfig: IConfig = {
  name: 'usergroup',
  label: 'User Group',
  required: true,
  rules: [required('eine Usergroup')],
  componentName: 'ec-select-userGroup'
}

export const nachnameConfig: IConfig = {
  name: 'nachname',
  label: 'Nachname',
  required: true,
  rules: [
    required('einen Nachnamen'),
    maxLength('einen Nachname', 'der', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const gebDatConfig = {
  label: 'Geburtsdatum',
  name: 'gebDat',
  required: true,
  rules: [required('ein Geburtsdatum')],
  componentName: 'ec-form-datePicker'
}

export const geschlechtConfig = {
  label: 'Geschlecht',
  name: 'geschlecht',
  required: true,
  rules: [
    required('ein Geschlecht'),
    inArray('Das Geschlecht', 'm', 'w')
  ],
  componentName: 'ec-radio-geschlecht'
}

export const strasseConfig: IConfig = {
  name: 'strasse',
  label: 'Straße',
  required: true,
  rules: [
    required('eine Straße'),
    maxLength('eine Straße', 'die', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const plzConfig: IConfig = {
  name: 'plz',
  label: 'PLZ',
  required: true,
  rules: [
    required('eine PostLeitZahl'),
    exactLength('eine PostLeitZahl', 'die', 5)
  ],
  counter: 5,
  componentName: 'v-text-field'
}

export const juLeiCaConfig: IConfig = {
  name: 'juLeiCaNr',
  label: 'JuLeiCaNr',
  required: false,
  rules: [exactLength('JuLeiCaNr', 'die', 11)],
  counter: 11,
  componentName: 'v-text-field'
}

export const ortConfig: IConfig = {
  name: 'ort',
  label: 'Ort',
  required: true,
  rules: [
    required('einen Ort'),
    maxLength('einen Ort', 'der', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const landConfig: IConfig = {
  name: 'land',
  label: 'Land',
  required: true,
  rules: [
    required('ein Land'),
    maxLength('ein Land', 'das', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const ansprechpartnerConfig: IConfig = {
  name: 'ansprechpartner',
  label: 'Ansprechpartner',
  required: true,
  rules: [
    required('ein Ansprechpartner'),
    maxLength('ein Ansprechpartner', 'der', 200)
  ],
  counter: 200,
  componentName: 'v-text-field'
}

export const notizConfig: IConfig = {
  name: 'notizen',
  label: 'Notizen',
  componentName: 'v-textarea'
}

export const eMailConfig: IConfig = {
  name: 'email',
  label: 'E-Mail',
  required: true,
  rules: [
    required('eine E-Mail'),
    maxLength('eine E-Mail', 'die', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
}

export const telefonConfig: IConfig = {
  name: 'telefon',
  label: 'Telefonnummer',
  required: true,
  rules: [
    required('eine Telefonnummer'),
    maxLength('eine Telefonnummer', 'die', 20)
  ],
  counter: 20,
  componentName: 'v-text-field'
}

export const akConfig: IConfig = {
  name: 'akID',
  label: 'Wähle einen Arbeitskreis',
  required: true,
  rules: [required('einen Arbeitskreis')],
  componentName: 'ec-select-ak'
}

export const ecKreisConfig: IConfig = {
  name: 'ecKreis',
  label: 'Wähle einen EC-Kreis',
  componentName: 'ec-select-ecKreis',
  clearable: true
}

export const orgaConfig: IConfig = {
  name: 'organisationsID',
  label: 'Wähle eine Organisation',
  required: true,
  rules: [required('eine Organisation')],
  componentName: 'ec-select-orga'
}

export const verteilerConfig: IConfig = {
  name: 'verteilerID',
  label: 'Wähle einen Verteiler',
  required: true,
  rules: [required('einen Verteiler')],
  componentName: 'ec-select-verteiler'
}

export const akStatusConfig: IConfig = {
  name: 'status',
  label: 'Bitte Wähle einen Status',
  required: true,
  rules: [required('einen Status')],
  componentName: 'v-autocomplete',
  items: [
    'Ausgetreten',
    'Mitglied',
    'GV-Vertreter',
    'Leiter'
  ].map((item, index) => ({
    id: index + 1,
    beschreibung: item
  })),
  'item-text': 'beschreibung',
  'item-value': 'id'
}

export const ecMitgliedConfig: IConfig = {
  name: 'ecMitglied',
  label: 'Bitte Wähle einen Status',
  required: true,
  rules: [required('einen Mitgliedsstatus')],
  componentName: 'v-autocomplete',
  items: ['Kein Mitglied', 'Mitglied', 'Förderer'].map(
    (item, index) => ({
      id: index + 1,
      beschreibung: item
    })
  ),
  'item-text': 'beschreibung',
  'item-value': 'id'
}

export const statusUpdateDate: IConfig = {
  name: 'date',
  label: 'Update-Datum',
  required: true,
  rules: [required('ein Datum')],
  componentName: 'ec-form-datePicker'
}

export const verteilerTypeConfig: IConfig = {
  name: 'type',
  required: true,
  rules: [required('ein Verteilertyp')],
  componentName: 'ec-radio-type'
}

export const bezeichnungConfig: IConfig = {
  name: 'bezeichnung',
  label: 'Bezeichnung',
  counter: 50,
  required: true,
  rules: [
    required('eine Bezeichnung'),
    maxLength('eine Bezeichnung', 'die', 50)
  ]
}

export const personConfig: IConfig = {
  name: 'personID',
  label: 'Person wählen',
  required: true,
  rules: [required('eine Person')],
  componentName: 'ec-select-person'
}

export const beginConfig: IConfig = {
  name: 'begin',
  label: 'Begin',
  required: true,
  rules: [required('ein Datum')],
  componentName: 'ec-form-datePicker'
}

export const endeConfig: IConfig = {
  name: 'ende',
  label: 'Ende',
  required: true,
  rules: [required('ein Datum')],
  componentName: 'ec-form-datePicker'
}

export const vOrtConfig: IConfig = {
  name: 'vOrtID',
  label: 'Veranstaltungsort',
  required: true,
  rules: [required('ein Veranstaltungsort')],
  componentName: 'ec-select-vort'
}

export const minTNConfig: IConfig = {
  name: 'minTNAlter',
  label: 'Minimales TN Alter',
  componentName: 'v-slider',
  min: 0,
  max: 300,
  step: 1,
  'thumb-label': true,
  required: true
}

export const maxTNConfig: IConfig = {
  name: 'maxTNAlter',
  label: 'Maximale TN Alter',
  componentName: 'v-slider',
  min: 0,
  max: 300,
  step: 1,
  'thumb-label': true,
  required: true
}

export default {
  install(vue: typeof Vue) {
    vue.prototype.$formConfig = {
      vornameConfig,
      usernameConfig,
      usergroupConfig,
      nachnameConfig,
      gebDatConfig,
      geschlechtConfig,
      strasseConfig,
      plzConfig,
      ortConfig,
      landConfig,
      juLeiCaConfig,
      notizConfig,
      eMailConfig,
      telefonConfig,
      akConfig,
      ecKreisConfig,
      orgaConfig,
      verteilerConfig,
      akStatusConfig,
      ecMitgliedConfig,
      statusUpdateDate,
      verteilerTypeConfig,
      bezeichnungConfig,
      personConfig,
      beginConfig,
      endeConfig,
      vOrtConfig,
      minTNConfig,
      maxTNConfig,
      ansprechpartnerConfig
    }
  }
}
