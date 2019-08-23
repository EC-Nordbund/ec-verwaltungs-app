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
  @inform('aks')
  @mutation('addArbeitskreis', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addArbeitskreis(bezeichnung:string):Promise<number> {return}

  @register(connector)
  @inform('orgas')
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
}