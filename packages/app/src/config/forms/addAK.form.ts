export default {
  title: 'Neuen AK anlegen',
  initval: {bezeichnung: ''},
  schema: [
    {
      name: 'bezeichnung',
      type: 'input',
      label: 'Bezeichnung',
      rule: 'required|max:50',
      required: true,
      counter: 50
    }
  ]
};
