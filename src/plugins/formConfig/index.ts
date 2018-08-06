import {
  rule,
  required,
  maxLength,
  inArray,
  exactLength
} from '@/plugins/rules'

interface IConfig {
  label?: string
  name: string
  required?: boolean
  rules?: rule
  componentName?: string
  counter?: number
  disabeled?: boolean
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
  rules: [
    required('einen Usergroup'),
    maxLength('einen Usergroup', 'der', 50)
  ],
  counter: 50,
  componentName: 'v-text-field'
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

export const verteilerConfig: IConfig = {
  name: 'verteilerID',
  label: 'Wähle einen Verteiler',
  required: true,
  rules: [required('einen Verteiler')],
  componentName: 'ec-select-verteiler'
}

export const verteilerTypeConfig: IConfig = {
  name: 'type',
  required: true,
  rules: [
    required('ein Verteilertyp'),
    inArray('einen Verteilertyp', 'An', 'CC', 'BCC')
  ]
}

export const bezeichnungConfig: IConfig = {
  name: 'bezeichnung',
  label: 'Bezeichnung',
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
