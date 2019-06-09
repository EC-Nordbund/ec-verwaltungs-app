export default (self: any)=>{
  return {
    title: 'Person mergen',
    initval: {
      falsch: null
    },
    schema: [
      {
        name: 'falsch',
        type: 'autocomplete',
        rule: 'required',
        'prepend-icon': 'person',
        items: self
          .allePersonen
          .filter((pers:any)=>pers.personID!==self.$route.params.id) 
          .map((pers:any)=>({value: pers.personID, text: pers.vorname + ' ' + pers.nachname + ' (' + pers.gebDat.german + ')'})),
        label: 'Falsche Person'
      }
    ]
  }
}