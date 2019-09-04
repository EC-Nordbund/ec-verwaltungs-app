import { stringValidator, numberValidator, booleanValidator, builder, connectorBase, server as server_api, client as client_api } from "api-socket-io";
import { query as query_2 } from "./connector";
import compiler from "office-compiler";

const {useClass, inform, query, mutation, register} = 
  new builder<string, api>(
    query_2, 
    async (name:string, ...args: Array<any>) => {
      return await query_2(`SELECT ${name}(${args.map(v=>"'" + v + "'").join(',')}) AS r`).then(v=>v[0].r)
    }
  )

const comp = new compiler(process.env.GOTENBERG, query_2)

@useClass
export class api extends connectorBase {
  @register
  @inform('anmeldung', 0)
  @mutation('addAnmeldungPayment', [
    new stringValidator('Anmelede ID').required().maxLength(15).minLength(10),
    new numberValidator('Betrag').required().min(0).max(9999.99).dez(4,2),
    new stringValidator('Eingang').isDate()
  ])
  addAnmeldungPayment(anmeldeID: string, betrag: number, eingang: string):Promise<0> {return}

  @register
  @inform('arbeitskreise')
  @mutation('addArbeitskreis', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addArbeitskreis(bezeichnung:string):Promise<number> {return}

  @register
  @inform('organisationen')
  @mutation('addOrganisation', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addOrganisation(bezeichnung:string):Promise<number> {return}

  @register
  @inform('personen')
  @mutation('addPerson', [
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  addPerson(vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<number> {return}

  @register
  @inform('person', 0)
  @mutation('addPersonAdresse', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Strasse').required().maxLength(50).minLength(1),
    new stringValidator('Post Leit Zahl').required().exactLength(5).numeric(),
    new stringValidator('Ort').required().maxLength(50).minLength(1)
  ])
  addPersonAdresse(personID: number, strasse: string, plz: string, ort: string):Promise<number> {return}

  @register
  @inform('person', 0)
  @inform('arbeitskreis', 1)
  @mutation('addPersonArbeitskreisStatus', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),
    new stringValidator('Datum').isDate(),
    new numberValidator('Status').required().min(0).max(3).ganz()
  ])
  addPersonArbeitskreisStatus(personID: number, akID: number, date: string|null, status: number):Promise<0> {return}

  @register
  @inform('person', 0)
  @mutation('addPersonFZ', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gesehen Am').required().isDate(),
    new stringValidator('FZ Vom').required().isDate(),
    new stringValidator('Kommentar').maxLength(255).minLength(1)
  ])
  addPersonFZ(personID: number, gesehenAm: string, fzVom: string, kommentar: string):Promise<0>{return}

  @register
  @inform('person', 1)
  @mutation('addPersonJuLeiCa', [
    new stringValidator('JuLeiCaNr.').required().numeric().exactLength(11),
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gültig bis').required().isDate(),
  ])
  addPersonJuLeiCa(juLeiCaNr: string, personID:number, gueltigBis: string):Promise<0>{return}

  @register
  @inform('person', 0)
  @mutation('addPersonMail', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('E-Mail').required().maxLength(50).email()
  ])
  addPersonMail(personID: number, email: string):Promise<number> {return}

  @register
  @inform('person', 0)
  @mutation('addPersonTag', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Tag ID').required().ganz().min(1),
    new stringValidator('Notiz').required().maxLength(65535)
  ])
  addPersonTag(personID: number, tagID: number, notiz: string):Promise<number> {return}

  @register
  @inform('person', 0)
  @mutation('addPersonTelefon', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Telefon').required().maxLength(20).numeric()
  ])
  addPersonTelefon(personID: number, telefon: string):Promise<number> {return}

  @register 
  @inform('veranstaltungen')
  @mutation('addVeranstaltung', [
    new stringValidator('Bezeichnung').required().minLength(3).maxLength(100),
    new stringValidator('kurz Bezeichnung').required().minLength(1).maxLength(4),
    new stringValidator('Begin').isDate().required(),
    new stringValidator('Ende').isDate().required(),
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required()
  ])
  addVeranstaltung(bezeichnung: string, kurzbezeichnung: string, begin: string, ende: string, veranstaltungsortID: number):Promise<number> {return}

  @register
  @inform('veranstaltung', 0)
  @mutation('addVeranstaltungPreis', [
    new numberValidator('Veranstaltungs ID').ganz().min(1).required(),
    new numberValidator('Typ ID').required().ganz().min(1),
    new numberValidator('Preis').required().ganz().min(1),
    new stringValidator('Von').required().isDate(),
    new stringValidator('Bis').required().isDate(),
  ])
  addVeranstaltungPreis(veranstaltungsID: number, typID: number, preis: number, von: string, bis: string):Promise<0> {return}

  @register
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

  @register
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

  @register
  @inform('anmeldung', 0)
  @mutation('anmeldungAbmelden', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Weg der Abmeldung').minLength(1).required().maxLength(300),
    new stringValidator('Kommentar').required().minLength(1).maxLength(500),
    new numberValidator('Gebühr').required().ganz().min(0)
  ])
  anmeldungAbmelden(anmeldeID: string, weg:string, kommentar:string, gebuehr:number):Promise<0>{return}

  @register
  @inform('anmeldung', 0)
  @mutation('anmeldungNachruecken', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
  ])
  anmeldungNachruecken(anmeldeID: string):Promise<0>{return}
  
  @register
  @inform('veranstaltungen', 0)
  @mutation('anmeldungVerarbeiten', [
    //TODO: anmeldungVerarbeiten
    //(`i_veranstaltungsID` INT, `i_rollenID` INT, `i_geschlecht` ENUM('m','w'), `i_vorname` VARCHAR(50), `i_nachname` VARCHAR(50), `i_gebDat` DATE, `i_strasse` VARCHAR(50), `i_plz` VARCHAR(5), `i_ort` VARCHAR(50), `i_telefon` VARCHAR(20), `i_email` VARCHAR(50), `i_schwimmen` INT, `i_radfahren` BOOLEAN, `i_bootfahren` BOOLEAN, `i_klettern` BOOLEAN, `i_sichEntfernen` BOOLEAN, `i_fahrgemeinschaften` BOOLEAN, `i_extra` TEXT, `i_vegetarisch` BOOLEAN, `i_lebensmittelAllergien` VARCHAR(500), `i_gesundheitsinformationen` VARCHAR(5000), `i_bemerkungen` VARCHAR(5000), `i_anmeldeZeitpunkt` TIMESTAMP)
  ])
  anmeldungVerarbeiten(veranstaltungsID: number, rollenID: number, geschlecht: 'm'|'w', vorname: string, nachname: string, gebDat: string, strasse:string, plz:string, ort:string, telefon:string, email: string, schwimmen:number, radfahren:boolean, bootfahren: boolean, klettern: boolean, sichEntfernen: boolean, fahrgemeinschaften: boolean, extra: string, vegetarisch: boolean, lebensmittelallergien: string, gesundheitsinformationen: string, bemerkungen: string):Promise<0>{return}

  @register
  @inform('personen')
  @inform('person', 0)
  @mutation('anonymisieren', [
    new numberValidator('Person ID').required().ganz().min(1),
  ])
  anonymisieren(personID: number):Promise<0>{return}

  @register
  @inform('anmeldung', 0)
  @mutation('editAnmedungBemerkungen', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new booleanValidator('Vegetarisch').required(),
    new stringValidator('Lebensmittelallergien').required().maxLength(500),
    new stringValidator('Gesundheitsinformationen').required().maxLength(5000),
    new stringValidator('Bemerkungen').required().maxLength(5000)
  ])
  editAnmedungBemerkungen(anmeldeID: string, vegetarisch: boolean, lebensmittelallergien: string, gesundheitsinformationen: string, bemerkungen: string):Promise<0>{return}

  @register
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

  @register
  @inform('anmeldung', 0)
  @mutation('editAnmeldungExtra', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Extra').maxLength(65535).required()
  ])
  editAnmeldungExtra(anmeldeID: number, extra: string):Promise<0>{return}

  @register
  @inform('anmeldung', 0)
  @mutation('editAnmeldungKontakt', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new numberValidator('Adress ID').ganz().required().min(1),
    new numberValidator('Telefon ID').ganz().required().min(1),
    new numberValidator('Mail ID').ganz().required().min(1)
  ])
  editAnmeldungKontakt(anmeldeID: number, adressID: number, telefonID: number, mailID: number):Promise<0>{return}
  

  @register
  @inform('arbeitskreise')
  @inform('arbeitskreis', 0)
  @mutation('editArbeitskreis', [
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),   
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editArbeitskreis(akID: number, bezeichnung: string):Promise<0>{return}

  @register
  @inform('organisation', 0)
  @inform('organisationen')
  @mutation('editOrganisationMain', [
    new numberValidator('OrganisationsID').required().min(0).ganz(),
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editOrganisationMain(organisationsID: number, bezeichnung: string):Promise<0>{return}

  @register
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

  @register
  @inform('person', 0)
  @inform('personen')
  @mutation('editPersonMain', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  editPersonMain(personID: number, vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<0>{return}

  @register
  @inform('person', 0)
  @mutation('editPersonRest', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('EC-Kreis').ganz().min(1),
    new numberValidator('EC-Mitglied').ganz().min(0).max(2),
    new stringValidator('Notizen').required().minLength(0).maxLength(65535)
  ])
  editPersonRest(personID: number, ecKreis: number|null, ecMitglied: 0|1|2, notizen: string):Promise<0>{return}

  @register
  @mutation('editPersonTag', [
    new numberValidator('Tag-Person ID').required().ganz().min(1),
    new stringValidator('Notizen').required().minLength(0).maxLength(65535)
  ])
  editPersonTag(tagPersonID: number, notiz: string):Promise<0>{return}

  @register
  @inform('veranstaltung', 0)
  @mutation('editVeranstaltungMain', [
    new numberValidator('Veranstaltung ID').min(1).ganz().required(),
    new stringValidator('Bezeichnung').required().minLength(3).maxLength(100),
    new stringValidator('kurz Bezeichnung').required().minLength(1).maxLength(4),
    new stringValidator('Begin').isDate().required(),
    new stringValidator('Ende').isDate().required(),
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required()
  ])
  editVeranstaltungMain(veranstaltungsID: number, bezeichnung: string, kurzBezeichnung: string, begin: string, ende:string, veranstaltungsortID: number):Promise<0>{return}

  
  @register
  @inform('veranstaltung', 0)
  @mutation('editVeranstaltungRest', [
    //TODO: editVeranstaltungRest
    //(`i_veranstaltungsID` INT, `i_minTNAlter` INT, `i_maxTNAlter` INT, `i_vorortZahlung` BOOLEAN, `i_hatGeschlechterWarteliste` BOOLEAN, `i_anzahlPlaetze` INT, `i_anzahlPlaetzeWeiblich` INT, `i_anzahlPlaetzeMaennlich` INT) RETURNS int(11)
  ])
  editVeranstaltungRest(veranstaltungsID: number, minTNAlter: number, maxTNAlter: number, vorortZahlung: boolean, hatGeschlechterWarteliste: boolean, anzahlPlaetze: number, anzahlPlaetzeWeiblich: number, anzahlPlaetzeMaennlich: number):Promise<0>{return}

  @register
  @mutation('mergeAdresse', [
    new numberValidator('richtig').required().ganz().min(1),
    new numberValidator('falsch').required().ganz().min(1)
  ])
  mergeAdresse(richtig: number, falsch: number):Promise<0>{return}

  @register
  @inform('person', 0)
  @inform('person', 1)
  @mutation('mergePerson', [
    new numberValidator('richtig').required().ganz().min(1),
    new numberValidator('falsch').required().ganz().min(1)
  ])
  mergePerson(richtig: number, falsch: number):Promise<0>{return}

  @register
  @mutation('oldAdresse', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldAdresse(oldID: number):Promise<0>{return}

  @register
  @inform('', 0)
  @mutation('oldMail', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldMail(oldID: number):Promise<0>{return}

  @register
  @inform('', 0)
  @mutation('oldTelefon', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldTelefon(oldID: number):Promise<0>{return}

  @register
  @inform('', 0)
  @mutation('removePersonTag', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removePersonTag(removeID: number):Promise<0>{return}

  @register
  @inform('', 0)
  @mutation('removeVeranstaltungPreis', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removeVeranstaltungPreis(removeID: number):Promise<0>{return}

  @register
  @inform('', 0)
  @mutation('removeVeranstaltungsortKontakt', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removeVeranstaltungsortKontakt(removeID: number):Promise<0>{return}

  @register
  @mutation('useAdresse', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useAdresse(useID: number):Promise<0>{return}

  @register
  @mutation('useMail', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useMail(useID: number):Promise<0>{return}

  @register
  @mutation('usePerson', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  usePerson(useID: number):Promise<0>{return}

  @register
  @mutation('useTelefon', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useTelefon(useID: number):Promise<0>{return}
  
  @register
  @query([], [
    () => ({name: 'default', abfrage: 'SELECT * FROM arbeitskreise'})
  ])
  arbeitskreise():Promise<any> {return}

  @register
  @query([
    new numberValidator('Arbeitskreis ID').required().ganz().min(1)
  ], [
    (self, akID: number) => ({name: 'default', abfrage: `SELECT * FROM arbeitskreise WHERE ID = ${akID}`}),
    (self, akID: number) => ({name: 'mitglieder', abfrage: `SELECT a.personID, p.vorname, p.nachname, p.gebDat, p.geschlecht, a.date, a.neuerStatus, a.ID FROM person_arbeitskreis a, personen p WHERE p.ID = a.personID AND a.akID = ${akID} ORDER BY p.ID`})
  ])
  arbeitskreis(akID: number):Promise<any>{return}
  
  @register
  async excel(name:string, id?:number|string):Promise<Buffer>{
    return comp.pdfExcelTemplate(`./docs/${name}.xlsx`, id)
  }
  
  @register
  async word(name:string, id?:number|string):Promise<Buffer>{
    return comp.pdfWordTemplate(`./docs/${name}.docx`, id)
  }
}

export function server() {
  let servers = server_api(api, async (username:string, password:string)=>false, async ()=>[], 4000)
}

export function client() {
  return client_api<api>(api, 'localhost:4000')
}