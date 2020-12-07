export default (self: any) => ({
  title: 'FZ Antrag',
  initval: {
    mail: null
  },
  schema: [
    {
      name: 'mail',
      type: 'autocomplete',
      label: 'E-Mail',
      rule: "required",
      required: true,
      items: self.data.emails.map((v: any) => v.eMail)
    }
  ]
})