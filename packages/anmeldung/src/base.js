export default {
  title: 'Anmeldung für',
  schema: [
    {
      name: 'stepper',
      type: 'stepper',
      steps: [
        {
          name: 'person',
          label: 'Persöhnliche Daten',
          summerize: 'Name, Geburtsdatum, Geschlecht',
          btns: [
            {
              content: 'Weiter',
              click: (cStep, valid, c,s, self, set) => {
                if(self.error[cStep]) delete self.error[cStep]
                if(valid && self.value.person.vorname && self.value.person.nachname && self.value.person.gebDat && self.value.person.geschlecht) return cStep + 1
                self.error[cStep] = true
              }
            }
          ],
          schema: [
            {
              name: 'vorname',
              type: 'input',
              label: 'Vorname',
              rule: 'required|max:50',
              required: true,
              counter: 50
            },
            {
              name: 'nachname',
              type: 'input',
              label: 'Nachname',
              rule: 'required|max:50',
              required: true,
              counter: 50
            },
            {
              name: 'gebDat',
              type: 'date',
              label: 'Geburtsdatum',
              rule: 'required',
              required: true,
              max: new Date().toISOString().substr(0, 10),
              min: "1950-01-01"
            },
            {
              name: 'geschlecht',
              type: 'radio',
              required: true,
              rule: 'required',
              label: 'Geschlecht',
              radios: [
                {
                  value: 'm',
                  label: 'Männlich'
                },
                {
                  value: 'w',
                  label: 'Weiblich'
                }
              ]
            }
          ]
        },
        {
          name: 'kontakt',
          label: 'Kontaktdaten',
          summerize: 'Telefon, E-Mail, Adresse',
          btns: [
            {
              content: 'Zurück',
              click: (cStep) => cStep - 1
            },
            {
              content: 'Weiter',
              click: (cStep, valid, c,s, self, set) => {
                if(self.error[cStep]) delete self.error[cStep]
                if(valid && self.value.kontakt.telefon && self.value.kontakt.mail && self.value.kontakt.adresse.strasse && self.value.kontakt.adresse.ort && self.value.kontakt.adresse.plz) return cStep + 1
                self.error[cStep] = true
              }
            }
          ],
          schema: [
            {
              name: 'telefon',
              type: 'input',
              counter: 20,
              mask: '####################',
              rule: 'required|max:20',
              label: 'Telefon'
            },
            {
              name: 'mail',
              label: 'E-Mail',
              type: 'input',
              counter: 50,
              rule: 'required|max:50|email'
            },
            {
              name: 'adresse',
              type: 'adresse'
            }
          ]
        },
        {
          name: 'sonstiges',
          label: 'Sonstiges',
          summerize: 'Essen, Gesundheit, Bemerkungen',
          btns: [
            {
              content: 'Zurück',
              click: (cStep) => cStep - 1
            },
            {
              content: 'Weiter',
              click: (cStep, valid) => {
                if(valid) return cStep + 1
              }
            }
          ],
          schema: [
            {
              type: 'checkbox',
              name: 'vegetarisch',
              label: 'Ich möchte vegetarisch essen.'
            },
            {
              type: 'text',
              name: 'lebensmittelunvertraeglichkeiten',
              label: 'Lebensmittelunverträglichkeiten',
              counter: 500,
              rule: 'max:500'
            },
            {
              type: 'text',
              name: 'gesundheitsinformationen',
              label: 'Gesundheitsinformationen',
              placeholder: 'z.B. Allergien, Medikamente etc.',
              counter: 5000,
              rule: 'max:5000'
            },
            {
              type: 'text',
              name: 'bemerkungen',
              label: 'Sonstige Bemerkungen',
              counter: 5000,
              rule: 'max:5000'
            }
          ]
        },
        {
          name: 'datenschutz',
          label: 'Datenschutz',
          summerize: 'Verschiedene Erlaubnisse + Teilnahmebedingungen',
          btns: [
            {
              content: 'Zurück',
              click: (cStep) => cStep - 1
            },
            {
              content: 'Absenden',
              click: (cStep, valid, cancel, save) => {
                if(valid) save()
              }
            }
          ],
          schema: [
            {
              type: 'checkbox',
              name: 'dsgvo',
              label: 'Ich bin damit einverstanden, dass meine eingegebenen Daten für 24 Stunden zwischengespeichert werden und mir eine E-Mail zur Bestätigung der Anmeldung zugeschickt wird.',
              rule: 'required'
            }
          ]
        }
      ]
    }
  ],
  initval: {
    stepper: {
      person: {
        vorname: '',
        nachname: '',
        gebDat: '',
        geschlecht: ''
      },
      kontakt: {
        adresse: {
          strasse: '',
          plz: '',
          ort: ''
        },
        telefon: '',
        mail: ''
      },
      sonstiges: {
        vegetarisch: false,
        lebensmittelunvertraeglichkeiten: '',
        gesundheitsinformationen: '',
        bemerkungen: ''
      },
      datenschutz: {
        dsgvo: false
      }
    }
  }
}