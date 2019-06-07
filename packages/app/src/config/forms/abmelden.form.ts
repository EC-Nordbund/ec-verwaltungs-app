export default {
  title: 'Person abmelden',
  initval: {
    weg: '',
    kommentar: '',
    gebuehr: ''
  },
  schema: [
    {
      name: 'weg',
      type: 'input',
      label: 'Weg der Abmeldung',
      rule: 'required|max:100',
      required: true,
      counter: 100
    },
    {
      name: 'kommentar',
      type: 'input',
      label: 'Kommentar',
      rule: 'required|max:200',
      required: true,
      counter: 200
    },
    {
      name: 'gebuehr',
      type: 'input',
      label: 'Abmeldegebühr (Ganze Euros)',
      mask: '###',
      rule: 'required|max:3',
      required: true,
      counter: 3
    }
  ]
};
