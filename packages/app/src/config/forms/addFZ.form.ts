export default (self:any)=>({
  title: 'FZ Eintragen',
  initval: {
    gesehenVon: null,
    fzVon: '',
    gesehenAm: '',
    kommentar: 'Es spricht nichts gegen ein Engagement bei uns.'
  },
  schema: [
    {
      name: 'gesehenVon',
      type: 'autocomplete',
      rule: 'required',
      'prepend-icon': 'person',
      items: self
        .allePersonen
        .filter((pers:any)=>pers.personID!==self.$route.params.id) 
        .map((pers:any)=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
      label: 'Gesehen von',
      required: true
    },
    {
      name: 'fzVon',
      rule: 'required',
      type: 'date',
      label: 'FZ vom',
      required: true
    },
    {
      name: 'gesehenAm',
      rule: 'required',
      type: 'date',
      label: 'Gesehen am',
      required: true
    },
    {
      name: 'kommentar',
      type: 'text',
      label: 'Kommentar',
      rule: 'required',
      required: true
    }
  ]
})