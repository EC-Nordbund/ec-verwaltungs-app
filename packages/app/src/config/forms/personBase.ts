export default [
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
    required: true
  },
  {
    name: 'geschlecht',
    type: 'radio',
    required: true,
    rule: 'required',
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
];
