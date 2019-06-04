export default {
  title: 'Du bist Inaktiv. Bitte gebe deine Pin ein.',
  initval: {},
  schema: [{
    name: 'pin',
    type: 'input',
    typ: 'password',
    label: 'PIN',
    rule: 'required|max:4',
    required: true,
    counter: 4
  }],
  persistend: true,
  noCancel: true,
  saveName: 'Reaktivieren'
};
