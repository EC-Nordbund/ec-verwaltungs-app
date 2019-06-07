export default {
  title: 'Bemerkungen editieren',
  initval: {
    vergetarisch: false,
    gesundheitsinformationen: '',
    bemerkungen: '',
    lebensmittelAllergien: ''
  },
  schema: [
    {
      name: 'vegetarisch',
      type: 'switch',
      label: 'Vegetarisch'
    },
    {
      name: 'gesundheitsinformationen',
      type: 'text',
      label: 'Gesundheitsinformationen'
    },
    {
      name: 'bemerkungen',
      type: 'text',
      label: 'Bemerkungen'
    },
    {
      name: 'lebensmittelAllergien',
      type: 'text',
      label: 'Lebensmittelallergien'
    }
  ]
};
