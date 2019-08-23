import { stringValidator, numberValidator, booleanValidator } from "./validatoren";
import { connectorBase, register, mutation, query, setAPIClass } from "./decorators";
import { Socket } from "socket.io";


class connector extends connectorBase{
  constructor(private username: string, socket: Socket, isClient:boolean = true) {
    super(isClient, socket)
  }

  @register()
  @mutation('addAnmeldungPayment', [
    new stringValidator('Anmelede ID').required().maxLength(15).minLength(10),
    new numberValidator('Betrag').required().min(0).max(9999.99).dez(4,2),
    new stringValidator('Eingang').isDate()
  ])
  addAnmeldungPayment(anmeldeID: string, betrag: number, eingang: string):Promise<0> {return}

  @register()
  @mutation('addArbeitskreis', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addArbeitskreis(bezeichnung:string):Promise<number> {return}

  @register()
  @mutation('addOrganisation', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addOrganisation(bezeichnung:string):Promise<number> {return}

  @register()
  @mutation('addPerson', [
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  addPerson(vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<number> {return}

  @register()
  @mutation('addPersonAdresse', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Strasse').required().maxLength(50).minLength(1),
    new stringValidator('Post Leit Zahl').required().exactLength(5).numeric(),
    new stringValidator('Ort').required().maxLength(50).minLength(1)
  ])
  addPersonAdresse(personID: number, strasse: string, plz: string, ort: string):Promise<number> {return}

  @register()
  @mutation('addPersonArbeitskreisStatus', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),
    new stringValidator('Datum').isDate(),
    new numberValidator('Status').required().min(0).max(3).ganz()
  ])
  addPersonArbeitskreisStatus(personID: number, akID: number, date: string|null, status: number):Promise<0> {return}

  @register()
  @mutation('addPersonFZ', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gesehen Am').required().isDate(),
    new stringValidator('FZ Vom').required().isDate(),
    new stringValidator('Kommentar').maxLength(255).minLength(1)
  ])
  addPersonFZ(personID: number, gesehenAm: string, fzVom: string, kommentar: string):Promise<0>{return}

  @register()
  @mutation('addPersonJuLeiCa', [
    new stringValidator('JuLeiCaNr.').required().numeric().exactLength(11),
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gültig bis').required().isDate(),
  ])
  addPersonJuLeiCa(juLeiCaNr: string, personID:number, gueltigBis: string):Promise<0>{return}

  @register()
  @mutation('addPersonMail', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('E-Mail').required().maxLength(50).email()
  ])
  addPersonMail(personID: number, email: string):Promise<number> {return}

  @register()
  @mutation('addPersonTag', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Tag ID').required().ganz().min(1),
    new stringValidator('Notiz').required().maxLength(65535)
  ])
  addPersonTag(personID: number, tagID: number, notiz: string):Promise<number> {return}

  @register()
  @mutation('addPersonTelefon', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Telefon').required().maxLength(20).numeric()
  ])
  addPersonTelefon(personID: number, telefon: string):Promise<number> {return}

}

setAPIClass(connector)