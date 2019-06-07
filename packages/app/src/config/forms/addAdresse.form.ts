export default {
  title: 'Adresse hinzufügen',
  initval: {
    adresse: {
      strasse: '',
      plz: '',
      ort: ''
    }
  },
  schema: [
    {
      name: 'adresse',
      type: 'adresse'
    }
  ]
};
