export default {
  title: 'Anmeldung für FreizeitXY {Mitarbeiter}',
  schema: [
    {
      name: 'stepper',
      type: 'stepper',
      steps: [
        {
          name: 'person',
          label: 'Persöhnliche Daten',
          btns: [
            {
              content: 'Weiter',
              click: (cStep, valid, c,s, self) => {
                if(self.errors[cStep]) delete self.errors[cStep]
                if(valid && self.value.person.vorname && self.value.person.nachname && self.value.person.gebDat && self.value.person.geschlecht) return cStep + 1
                self.errors[cStep] = 'Es wurden nicht alle Felder korrekt ausgefüllt!'
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
              rule: '',
              required: true
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
              label: 'Lebensmittelunverträglichkeiten'
            },
            {
              type: 'text',
              name: 'gesundheitsinformationen',
              label: 'Gesundheitsinformationen',
              placeholder: 'z.B. Allergien, Medikamente etc.'
            },
            {
              type: 'text',
              name: 'bemerkungen',
              label: 'Sonstige Bemerkungen'
            }
          ]
        },
        {
          name: 'datenschutz',
          label: 'Datenschutz',
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