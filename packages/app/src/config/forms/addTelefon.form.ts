export default {
  title: 'Telefon hinzufügen',
  initval: {
    telefon: ''
  },
  schema: [
    {
      name: 'telefon',
      type: 'input',
      rule: 'required|max:20',
      label: 'Telefon',
      mask: '####################',
      counter: 20
    }
  ]
};
