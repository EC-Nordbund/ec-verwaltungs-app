export default {
  title: 'E-Mail hinzufügen',
  initval: {
    email: ''
  },
  schema: [
    {
      name: 'email',
      type: 'input',
      rule: 'required|max:50',
      label: 'E-Mail',
      counter: 50
    }
  ]
};
