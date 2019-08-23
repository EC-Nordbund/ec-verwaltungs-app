import { stringValidator, numberValidator, booleanValidator } from "./validatoren";
import { connectorBase, register, mutation, query, inform } from "./decorators";


export class connector extends connectorBase{
  constructor(private username: string, socket: any, isClient:boolean = true) {
    super(isClient, socket)
  }

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('addAnmeldungPayment', [
    new stringValidator('Anmelede ID').required().maxLength(15).minLength(10),
    new numberValidator('Betrag').required().min(0).max(9999.99).dez(4,2),
    new stringValidator('Eingang').isDate()
  ])
  addAnmeldungPayment(anmeldeID: string, betrag: number, eingang: string):Promise<0> {return}

  @register(connector)
  @inform('arbeitskreise')
  @mutation('addArbeitskreis', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addArbeitskreis(bezeichnung:string):Promise<number> {return}

  @register(connector)
  @inform('organisationen')
  @mutation('addOrganisation', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addOrganisation(bezeichnung:string):Promise<number> {return}

  @register(connector)
  @inform('personen')
  @mutation('addPerson', [
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  addPerson(vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<number> {return}

  @register(connector)
  @inform('person', 0)
  @mutation('addPersonAdresse', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Strasse').required().maxLength(50).minLength(1),
    new stringValidator('Post Leit Zahl').required().exactLength(5).numeric(),
    new stringValidator('Ort').required().maxLength(50).minLength(1)
  ])
  addPersonAdresse(personID: number, strasse: string, plz: string, ort: string):Promise<number> {return}

  @register(connector)
  @inform('person', 0)
  @inform('ak', 1)
  @mutation('addPersonArbeitskreisStatus', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),
    new stringValidator('Datum').isDate(),
    new numberValidator('Status').required().min(0).max(3).ganz()
  ])
  addPersonArbeitskreisStatus(personID: number, akID: number, date: string|null, status: number):Promise<0> {return}

  @register(connector)
  @inform('person', 0)
  @mutation('addPersonFZ', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gesehen Am').required().isDate(),
    new stringValidator('FZ Vom').required().isDate(),
    new stringValidator('Kommentar').maxLength(255).minLength(1)
  ])
  addPersonFZ(personID: number, gesehenAm: string, fzVom: string, kommentar: string):Promise<0>{return}

  @register(connector)
  @inform('person', 1)
  @mutation('addPersonJuLeiCa', [
    new stringValidator('JuLeiCaNr.').required().numeric().exactLength(11),
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gültig bis').required().isDate(),
  ])
  addPersonJuLeiCa(juLeiCaNr: string, personID:number, gueltigBis: string):Promise<0>{return}

  @register(connector)
  @inform('person', 0)
  @mutation('addPersonMail', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('E-Mail').required().maxLength(50).email()
  ])
  addPersonMail(personID: number, email: string):Promise<number> {return}

  @register(connector)
  @inform('person', 0)
  @mutation('addPersonTag', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Tag ID').required().ganz().min(1),
    new stringValidator('Notiz').required().maxLength(65535)
  ])
  addPersonTag(personID: number, tagID: number, notiz: string):Promise<number> {return}

  @register(connector)
  @inform('person', 0)
  @mutation('addPersonTelefon', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Telefon').required().maxLength(20).numeric()
  ])
  addPersonTelefon(personID: number, telefon: string):Promise<number> {return}

  @register(connector) 
  @inform('veranstaltungen')
  @mutation('addVeranstaltung', [
    new stringValidator('Bezeichnung').required().minLength(3).maxLength(100),
    new stringValidator('kurz Bezeichnung').required().minLength(1).maxLength(4),
    new stringValidator('Begin').isDate().required(),
    new stringValidator('Ende').isDate().required(),
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required()
  ])
  addVeranstaltung(bezeichnung: string, kurzbezeichnung: string, begin: string, ende: string, veranstaltungsortID: number):Promise<number> {return}

  @register(connector)
  @inform('veranstaltung', 0)
  @mutation('addVeranstaltungPreis', [
    new numberValidator('Veranstaltungs ID').ganz().min(1).required(),
    new numberValidator('Typ ID').required().ganz().min(1),
    new numberValidator('Preis').required().ganz().min(1),
    new stringValidator('Von').required().isDate(),
    new stringValidator('Bis').required().isDate(),
  ])
  addVeranstaltungPreis(veranstaltungsID: number, typID: number, preis: number, von: string, bis: string):Promise<0> {return}

  @register(connector)
  @inform('veranstaltungsorte')
  @mutation('addVeranstaltungsort', [
    new stringValidator('Bezeichnung').required().minLength(1).maxLength(100),
    new stringValidator('Strasse').required().minLength(1).maxLength(50),
    new stringValidator('PLZ').required().minLength(1).maxLength(10),
    new stringValidator('Ort').required().minLength(1).maxLength(50),
    new stringValidator('Land').required().minLength(1).maxLength(50),
    new stringValidator('TN-List-Info').required().maxLength(100)
  ])
  addVeranstaltungsort(bezeichnung: string, strasse:string, plz:string, ort:string, land:string, tnlistinfo:string) {return}

  @register(connector)
  @inform('veranstaltungsort', 0)
  @mutation('addVeranstaltungsortKontakt', [
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required(),
    new stringValidator('Ansprechpartner').required().minLength(1).maxLength(100),
    new stringValidator('Typ').required().minLength(1).maxLength(100),
    new stringValidator('Telefon').required().minLength(1).maxLength(50),
    new stringValidator('Email').required().minLength(1).maxLength(50).email(),
    new stringValidator('Notizen').required().maxLength(65535)
  ])
  addVeranstaltungsortKontakt(veranstaltungsortID:number, ansprechpartner:string, typ:string, telefon:string, email:string, notizen:string):Promise<0> {return}

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('anmeldungAbmelden', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Weg der Abmeldung').minLength(1).required().maxLength(300),
    new stringValidator('Kommentar').required().minLength(1).maxLength(500),
    new numberValidator('Gebühr').required().ganz().min(0)
  ])
  anmeldungAbmelden(anmeldeID: string, weg:string, kommentar:string, gebuehr:number):Promise<0>{return}

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('anmeldungNachruecken', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
  ])
  anmeldungNachruecken(anmeldeID: string):Promise<0>{return}

  //TODO: anmeldungVerarbeiten
  @register(connector)
  @inform('', 0)
  @mutation('anmeldungVerarbeiten', [])
  anmeldungVerarbeiten():Promise<0>{return}

  @register(connector)
  @inform('personen')
  @inform('person', 0)
  @mutation('anonymisieren', [
    new numberValidator('Person ID').required().ganz().min(1),
  ])
  anonymisieren(personID: number):Promise<0>{return}
 
  @register(connector)
  @inform('anmeldung', 0)
  @mutation('editAnmedungBemerkungen', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new booleanValidator('Vegetarisch').required(),
    new stringValidator('Lebensmittelallergien').required().maxLength(500),
    new stringValidator('Gesundheitsinformationen').required().maxLength(5000),
    new stringValidator('Bemerkungen').required().maxLength(5000)
  ])
  editAnmedungBemerkungen(anmeldeID: string, vegetarisch: boolean, lebensmittelallergien: string, gesundheitsinformationen: string, bemerkungen: string):Promise<0>{return}

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('editAnmeldungErlaubnisse', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new booleanValidator('Rad fahren').required(),
    new numberValidator('Schwimmen').ganz().required().max(3).min(0),
    new booleanValidator('Fahrgemeinschaften').required(),
    new booleanValidator('Klettern').required(),
    new booleanValidator('Sich entfernen').required(),
    new booleanValidator('Boot fahren').required(),
  ])
  editAnmeldungErlaubnisse(anmeldeID: string, radfahren: boolean, schwimmen: number, fahrgemeinschaften: boolean, klettern: boolean, sichEntfernen: boolean, bootFahren: boolean):Promise<0>{return}

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('editAnmeldungExtra', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Extra').maxLength(65535).required()
  ])
  editAnmeldungExtra(anmeldeID: number, extra: string):Promise<0>{return}

  @register(connector)
  @inform('anmeldung', 0)
  @mutation('editAnmeldungKontakt', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new numberValidator('Adress ID').ganz().required().min(1),
    new numberValidator('Telefon ID').ganz().required().min(1),
    new numberValidator('Mail ID').ganz().required().min(1)
  ])
  editAnmeldungKontakt(anmeldeID: number, adressID: number, telefonID: number, mailID: number):Promise<0>{return}
  

  @register(connector)
  @inform('arbeitskreise')
  @inform('arbeitskreis', 0)
  @mutation('editArbeitskreis', [
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),   
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editArbeitskreis(akID: number, bezeichnung: string):Promise<0>{return}

  @register(connector)
  @inform('organisation', 0)
  @inform('organisationen')
  @mutation('editOrganisationMain', [
    new numberValidator('OrganisationsID').required().min(0).ganz(),
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editOrganisationMain(organisationsID: number, bezeichnung: string):Promise<0>{return}

  @register(connector)
  @inform('organisation', 0)
  @inform('organisationen')
  @mutation('editOrganisationRest', [
    new numberValidator('OrganisationsID').required().min(0).ganz(),
    new stringValidator('Ansprechpartner').required().minLength(1).maxLength(255),   
    new stringValidator('Strasse').required().minLength(1).maxLength(50),
    new stringValidator('PLZ').required().minLength(1).maxLength(10),
    new stringValidator('Ort').required().minLength(1).maxLength(50),
    new stringValidator('Land').required().minLength(1).maxLength(50),
    new stringValidator('Telefon').required().minLength(1).maxLength(50).numeric(),
    new stringValidator('Email').required().minLength(1).maxLength(50).email(),
    new stringValidator('Notizen').required().maxLength(65535)
  ])
  editOrganisationRest(organisationsID: number, ansprechpartner: string, strasse: string, plz: string, ort: string,land: string, telefon: string,email: string,notizen: string):Promise<0>{return}

  //TODO: editPersonMain
  @register(connector)
  @inform('', 0)
  @mutation('editPersonMain', [])
  editPersonMain():Promise<0>{return}

  //TODO: editPersonRest
  @register(connector)
  @inform('', 0)
  @mutation('editPersonRest', [])
  editPersonRest():Promise<0>{return}

  //TODO: editPersonTag
  @register(connector)
  @inform('', 0)
  @mutation('editPersonTag', [])
  editPersonTag():Promise<0>{return}

  //TODO: editVeranstaltungMain
  @register(connector)
  @inform('', 0)
  @mutation('editVeranstaltungMain', [])
  editVeranstaltungMain():Promise<0>{return}

  //TODO: editVeranstaltungRest
  @register(connector)
  @inform('', 0)
  @mutation('editVeranstaltungRest', [])
  editVeranstaltungRest():Promise<0>{return}

  //TODO: mergeAdresse
  @register(connector)
  @inform('', 0)
  @mutation('mergeAdresse', [])
  mergeAdresse():Promise<0>{return}

  //TODO: mergePerson
  @register(connector)
  @inform('', 0)
  @mutation('mergePerson', [])
  mergePerson():Promise<0>{return}

  //TODO: oldAdresse
  @register(connector)
  @inform('', 0)
  @mutation('oldAdresse', [])
  oldAdresse():Promise<0>{return}

  //TODO: oldMail
  @register(connector)
  @inform('', 0)
  @mutation('oldMail', [])
  oldMail():Promise<0>{return}

  //TODO: oldTelefon
  @register(connector)
  @inform('', 0)
  @mutation('oldTelefon', [])
  oldTelefon():Promise<0>{return}

  //TODO: removePersonTag
  @register(connector)
  @inform('', 0)
  @mutation('removePersonTag', [])
  removePersonTag():Promise<0>{return}

  //TODO: removeVeranstaltungPreis
  @register(connector)
  @inform('', 0)
  @mutation('removeVeranstaltungPreis', [])
  removeVeranstaltungPreis():Promise<0>{return}

  //TODO: removeVeranstaltungsortKontakt
  @register(connector)
  @inform('', 0)
  @mutation('removeVeranstaltungsortKontakt', [])
  removeVeranstaltungsortKontakt():Promise<0>{return}

  //TODO: useAdresse
  @register(connector)
  @inform('', 0)
  @mutation('useAdresse', [])
  useAdresse():Promise<0>{return}

  //TODO: useMail
  @register(connector)
  @inform('', 0)
  @mutation('useMail', [])
  useMail():Promise<0>{return}

  //TODO: usePerson
  @register(connector)
  @inform('', 0)
  @mutation('usePerson', [])
  usePerson():Promise<0>{return}

  //TODO: useTelefon
  @register(connector)
  @inform('', 0)
  @mutation('useTelefon', [])
  useTelefon():Promise<0>{return}
}