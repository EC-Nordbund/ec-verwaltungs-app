import { stringValidator, numberValidator, booleanValidator, builder, connectorBase, server as server_api, client as client_api } from "api-socket-io";
import { query as query_2 } from "./connector";
import compiler from "office-compiler";
import { Socket } from "socket.io";

const DEMO: boolean = true
const f:any = async (...a) => {
  console.log(...a)
  return a
}
 
const single = true

const build = DEMO ? new builder<string, api>(f,f) : new builder<string, api>(
  query_2, 
  async (name:string, ...args: Array<any>) => {
    return await query_2(`SELECT ${name}(${args.map(v=>"'" + v + "'").join(',')}) AS r`).then(v=>v[0].r)
  }
)

const comp = new compiler(process.env.GOTENBERG, query_2)


interface IAK_small {
  ID: number,
  bezeichnung: string
}


interface IVeranstaltung_small {
  ID: number,
  bezeichnung: string,
  kurzBezeichnung: string, 
  begin: string, 
  ende: string
}

interface IVOrt_small {ID: number, bezeichnung: string, ort: string, land: string}

interface IAK extends IAK_small {
  default: IAK_small,
  mitglieder: Array<{
    ID: number
    personID: number
    vorname: string, 
    nachname: string,
    gebDat: string, 
    geschlecht: 'm'|'w', 
    date: string, 
    neuerStatus: number
  }>
}


@build.useClass()
export class api extends connectorBase {
  constructor(isClient:boolean, socket:Socket) {
    super(isClient, socket)
  }

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('addAnmeldungPayment', [
    new stringValidator('Anmelede ID').required().maxLength(15).minLength(10),
    new numberValidator('Betrag').required().min(0).max(9999.99).dez(4,2),
    new stringValidator('Eingang').isDate()
  ])
  addAnmeldungPayment(anmeldeID: string, betrag: number, eingang: string):Promise<0> {return}

  @build.register()
  @build.inform('arbeitskreise')
  @build.mutation('addArbeitskreis', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addArbeitskreis(bezeichnung:string):Promise<number> {return}

  @build.register()
  @build.inform('organisationen')
  @build.mutation('addOrganisation', [
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  addOrganisation(bezeichnung:string):Promise<number> {return}

  @build.register()
  @build.inform('personen')
  @build.mutation('addPerson', [
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  addPerson(vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<number> {return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('addPersonAdresse', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Strasse').required().maxLength(50).minLength(1),
    new stringValidator('Post Leit Zahl').required().exactLength(5).numeric(),
    new stringValidator('Ort').required().maxLength(50).minLength(1)
  ])
  addPersonAdresse(personID: number, strasse: string, plz: string, ort: string):Promise<number> {return}

  @build.register()
  @build.inform('person', 0)
  @build.inform('arbeitskreis', 1)
  @build.mutation('addPersonArbeitskreisStatus', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),
    new stringValidator('Datum').isDate(),
    new numberValidator('Status').required().min(0).max(3).ganz()
  ])
  addPersonArbeitskreisStatus(personID: number, akID: number, date: string|null, status: number):Promise<0> {return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('addPersonFZ', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gesehen Am').required().isDate(),
    new stringValidator('FZ Vom').required().isDate(),
    new stringValidator('Kommentar').maxLength(255).minLength(1)
  ])
  addPersonFZ(personID: number, gesehenAm: string, fzVom: string, kommentar: string):Promise<0>{return}

  @build.register()
  @build.inform('person', 1)
  @build.mutation('addPersonJuLeiCa', [
    new stringValidator('JuLeiCaNr.').required().numeric().exactLength(11),
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Gültig bis').required().isDate(),
  ])
  addPersonJuLeiCa(juLeiCaNr: string, personID:number, gueltigBis: string):Promise<0>{return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('addPersonMail', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('E-Mail').required().maxLength(50).email()
  ])
  addPersonMail(personID: number, email: string):Promise<number> {return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('addPersonTag', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('Tag ID').required().ganz().min(1),
    new stringValidator('Notiz').required().maxLength(65535)
  ])
  addPersonTag(personID: number, tagID: number, notiz: string):Promise<number> {return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('addPersonTelefon', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Telefon').required().maxLength(20).numeric()
  ])
  addPersonTelefon(personID: number, telefon: string):Promise<number> {return}

  @build.register() 
  @build.inform('veranstaltungen')
  @build.mutation('addVeranstaltung', [
    new stringValidator('Bezeichnung').required().minLength(3).maxLength(100),
    new stringValidator('kurz Bezeichnung').required().minLength(1).maxLength(4),
    new stringValidator('Begin').isDate().required(),
    new stringValidator('Ende').isDate().required(),
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required()
  ])
  addVeranstaltung(bezeichnung: string, kurzbezeichnung: string, begin: string, ende: string, veranstaltungsortID: number):Promise<number> {return}

  @build.register()
  @build.inform('veranstaltung', 0)
  @build.mutation('addVeranstaltungPreis', [
    new numberValidator('Veranstaltungs ID').ganz().min(1).required(),
    new numberValidator('Typ ID').required().ganz().min(1),
    new numberValidator('Preis').required().ganz().min(1),
    new stringValidator('Von').required().isDate(),
    new stringValidator('Bis').required().isDate(),
  ])
  addVeranstaltungPreis(veranstaltungsID: number, typID: number, preis: number, von: string, bis: string):Promise<0> {return}

  @build.register()
  @build.inform('veranstaltungsorte')
  @build.mutation('addVeranstaltungsort', [
    new stringValidator('Bezeichnung').required().minLength(1).maxLength(100),
    new stringValidator('Strasse').required().minLength(1).maxLength(50),
    new stringValidator('PLZ').required().minLength(1).maxLength(10),
    new stringValidator('Ort').required().minLength(1).maxLength(50),
    new stringValidator('Land').required().minLength(1).maxLength(50),
    new stringValidator('TN-List-Info').required().maxLength(100)
  ])
  addVeranstaltungsort(bezeichnung: string, strasse:string, plz:string, ort:string, land:string, tnlistinfo:string) {return}

  @build.register()
  @build.inform('veranstaltungsort', 0)
  @build.mutation('addVeranstaltungsortKontakt', [
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required(),
    new stringValidator('Ansprechpartner').required().minLength(1).maxLength(100),
    new stringValidator('Typ').required().minLength(1).maxLength(100),
    new stringValidator('Telefon').required().minLength(1).maxLength(50),
    new stringValidator('Email').required().minLength(1).maxLength(50).email(),
    new stringValidator('Notizen').required().maxLength(65535)
  ])
  addVeranstaltungsortKontakt(veranstaltungsortID:number, ansprechpartner:string, typ:string, telefon:string, email:string, notizen:string):Promise<0> {return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('anmeldungAbmelden', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Weg der Abmeldung').minLength(1).required().maxLength(300),
    new stringValidator('Kommentar').required().minLength(1).maxLength(500),
    new numberValidator('Gebühr').required().ganz().min(0)
  ])
  anmeldungAbmelden(anmeldeID: string, weg:string, kommentar:string, gebuehr:number):Promise<0>{return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('anmeldungNachruecken', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
  ])
  anmeldungNachruecken(anmeldeID: string):Promise<0>{return}
  
  @build.register()
  @build.inform('veranstaltungen', 0)
  @build.mutation('anmeldungVerarbeiten', [
    new numberValidator('Veranstaltungs ID').ganz().min(1).required(),
    new numberValidator('Rollen ID').ganz().min(1).required().max(5),
    new stringValidator('Geschlecht').required().enum(['m','w']),
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Strasse').required().maxLength(50).minLength(1),
    new stringValidator('Post Leit Zahl').required().exactLength(5).numeric(),
    new stringValidator('Ort').required().maxLength(50).minLength(1),
    new stringValidator('Telefon').required().maxLength(20).numeric(),
    new stringValidator('Email').required().minLength(1).maxLength(50).email(),
    new numberValidator('Schwimmen').ganz().required().max(3).min(0),
    new booleanValidator('Rad fahren').required(),
    new booleanValidator('Boot fahren').required(),
    new booleanValidator('Klettern').required(),
    new booleanValidator('Sich entfernen').required(),
    new booleanValidator('Fahrgemeinschaften').required(),
    new stringValidator('Extra').maxLength(65535).required(),
    new booleanValidator('Vegetarisch').required(),
    new stringValidator('Lebensmittelallergien').required().maxLength(500),
    new stringValidator('Gesundheitsinformationen').required().maxLength(5000),
    new stringValidator('Bemerkungen').required().maxLength(5000),
    new stringValidator('anmelde Zeitpunkt').required().minLength(5),
  ])
  anmeldungVerarbeiten(veranstaltungsID: number, rollenID: number, geschlecht: 'm'|'w', vorname: string, nachname: string, gebDat: string, strasse:string, plz:string, ort:string, telefon:string, email: string, schwimmen:number, radfahren:boolean, bootfahren: boolean, klettern: boolean, sichEntfernen: boolean, fahrgemeinschaften: boolean, extra: string, vegetarisch: boolean, lebensmittelallergien: string, gesundheitsinformationen: string, bemerkungen: string):Promise<0>{return}

  @build.register()
  @build.inform('personen')
  @build.inform('person', 0)
  @build.mutation('anonymisieren', [
    new numberValidator('Person ID').required().ganz().min(1),
  ])
  anonymisieren(personID: number):Promise<0>{return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('editAnmedungBemerkungen', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new booleanValidator('Vegetarisch').required(),
    new stringValidator('Lebensmittelallergien').required().maxLength(500),
    new stringValidator('Gesundheitsinformationen').required().maxLength(5000),
    new stringValidator('Bemerkungen').required().maxLength(5000)
  ])
  editAnmedungBemerkungen(anmeldeID: string, vegetarisch: boolean, lebensmittelallergien: string, gesundheitsinformationen: string, bemerkungen: string):Promise<0>{return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('editAnmeldungErlaubnisse', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new booleanValidator('Rad fahren').required(),
    new numberValidator('Schwimmen').ganz().required().max(3).min(0),
    new booleanValidator('Fahrgemeinschaften').required(),
    new booleanValidator('Klettern').required(),
    new booleanValidator('Sich entfernen').required(),
    new booleanValidator('Boot fahren').required(),
  ])
  editAnmeldungErlaubnisse(anmeldeID: string, radfahren: boolean, schwimmen: number, fahrgemeinschaften: boolean, klettern: boolean, sichEntfernen: boolean, bootFahren: boolean):Promise<0>{return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('editAnmeldungExtra', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new stringValidator('Extra').maxLength(65535).required()
  ])
  editAnmeldungExtra(anmeldeID: number, extra: string):Promise<0>{return}

  @build.register()
  @build.inform('anmeldung', 0)
  @build.mutation('editAnmeldungKontakt', [
    new stringValidator('Anmelde ID').minLength(10).maxLength(20).required(),
    new numberValidator('Adress ID').ganz().required().min(1),
    new numberValidator('Telefon ID').ganz().required().min(1),
    new numberValidator('Mail ID').ganz().required().min(1)
  ])
  editAnmeldungKontakt(anmeldeID: number, adressID: number, telefonID: number, mailID: number):Promise<0>{return}
  

  @build.register()
  @build.inform('arbeitskreise')
  @build.inform('arbeitskreis', 0)
  @build.mutation('editArbeitskreis', [
    new numberValidator('Arbeitskreis ID').required().ganz().min(1),   
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editArbeitskreis(akID: number, bezeichnung: string):Promise<0>{return}

  @build.register()
  @build.inform('organisation', 0)
  @build.inform('organisationen')
  @build.mutation('editOrganisationMain', [
    new numberValidator('OrganisationsID').required().min(0).ganz(),
    new stringValidator('Bezeichnung').required().maxLength(100).minLength(3)
  ])
  editOrganisationMain(organisationsID: number, bezeichnung: string):Promise<0>{return}

  @build.register()
  @build.inform('organisation', 0)
  @build.inform('organisationen')
  @build.mutation('editOrganisationRest', [
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

  @build.register()
  @build.inform('person', 0)
  @build.inform('personen')
  @build.mutation('editPersonMain', [
    new numberValidator('Person ID').required().ganz().min(1),
    new stringValidator('Vorname').required().maxLength(50),
    new stringValidator('Nachname').required().maxLength(50),
    new stringValidator('Geburtsdatum').required().isDate(),
    new stringValidator('Geschlecht').required().enum(['m','w'])
  ])
  editPersonMain(personID: number, vorname: string, nachname: string, gebDat: string, geschlecht: 'm'|'w'):Promise<0>{return}

  @build.register()
  @build.inform('person', 0)
  @build.mutation('editPersonRest', [
    new numberValidator('Person ID').required().ganz().min(1),
    new numberValidator('EC-Kreis').ganz().min(1),
    new numberValidator('EC-Mitglied').ganz().min(0).max(2),
    new stringValidator('Notizen').required().minLength(0).maxLength(65535)
  ])
  editPersonRest(personID: number, ecKreis: number|null, ecMitglied: 0|1|2, notizen: string):Promise<0>{return}

  @build.register()
  @build.mutation('editPersonTag', [
    new numberValidator('Tag-Person ID').required().ganz().min(1),
    new stringValidator('Notizen').required().minLength(0).maxLength(65535)
  ])
  editPersonTag(tagPersonID: number, notiz: string):Promise<0>{return}

  @build.register()
  @build.inform('veranstaltung', 0)
  @build.mutation('editVeranstaltungMain', [
    new numberValidator('Veranstaltung ID').min(1).ganz().required(),
    new stringValidator('Bezeichnung').required().minLength(3).maxLength(100),
    new stringValidator('kurz Bezeichnung').required().minLength(1).maxLength(4),
    new stringValidator('Begin').isDate().required(),
    new stringValidator('Ende').isDate().required(),
    new numberValidator('Veranstaltungsort ID').min(1).ganz().required()
  ])
  editVeranstaltungMain(veranstaltungsID: number, bezeichnung: string, kurzBezeichnung: string, begin: string, ende:string, veranstaltungsortID: number):Promise<0>{return}

  
  @build.register()
  @build.inform('veranstaltung', 0)
  @build.mutation('editVeranstaltungRest', [
    new numberValidator('Veranstaltung ID').min(1).ganz().required(),
    new numberValidator('Min TN Alter').min(0).ganz().required(),
    new numberValidator('Max TN Alter').min(0).ganz().required(),
    new booleanValidator('vorort Zahlung möglich').required(),
    new booleanValidator('hat Geschlechter Warteliste'),
    new numberValidator('Anzahl Plätze').min(0).ganz().required(),
    new numberValidator('Anzahl Plätze Weiblich').min(0).ganz().required(),
    new numberValidator('Anzahl Plätze Männlich').min(0).ganz().required()
  ])
  editVeranstaltungRest(veranstaltungsID: number, minTNAlter: number, maxTNAlter: number, vorortZahlung: boolean, hatGeschlechterWarteliste: boolean, anzahlPlaetze: number, anzahlPlaetzeWeiblich: number, anzahlPlaetzeMaennlich: number):Promise<0>{return}

  @build.register()
  @build.mutation('mergeAdresse', [
    new numberValidator('richtig').required().ganz().min(1),
    new numberValidator('falsch').required().ganz().min(1)
  ])
  mergeAdresse(richtig: number, falsch: number):Promise<0>{return}

  @build.register()
  @build.inform('person', 0)
  @build.inform('person', 1)
  @build.mutation('mergePerson', [
    new numberValidator('richtig').required().ganz().min(1),
    new numberValidator('falsch').required().ganz().min(1)
  ])
  mergePerson(richtig: number, falsch: number):Promise<0>{return}

  @build.register()
  @build.mutation('oldAdresse', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldAdresse(oldID: number):Promise<0>{return}

  @build.register()
  @build.inform('', 0)
  @build.mutation('oldMail', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldMail(oldID: number):Promise<0>{return}

  @build.register()
  @build.inform('', 0)
  @build.mutation('oldTelefon', [
    new numberValidator('old ID').required().ganz().min(1)
  ])
  oldTelefon(oldID: number):Promise<0>{return}

  @build.register()
  @build.inform('', 0)
  @build.mutation('removePersonTag', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removePersonTag(removeID: number):Promise<0>{return}

  @build.register()
  @build.inform('', 0)
  @build.mutation('removeVeranstaltungPreis', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removeVeranstaltungPreis(removeID: number):Promise<0>{return}

  @build.register()
  @build.inform('', 0)
  @build.mutation('removeVeranstaltungsortKontakt', [
    new numberValidator('Remove ID').required().ganz().min(1)
  ])
  removeVeranstaltungsortKontakt(removeID: number):Promise<0>{return}

  @build.register()
  @build.mutation('useAdresse', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useAdresse(useID: number):Promise<0>{return}

  @build.register()
  @build.mutation('useMail', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useMail(useID: number):Promise<0>{return}

  @build.register()
  @build.mutation('usePerson', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  usePerson(useID: number):Promise<0>{return}

  @build.register()
  @build.mutation('useTelefon', [
    new numberValidator('Use ID').required().ganz().min(1)
  ])
  useTelefon(useID: number):Promise<0>{return}
  
  @build.register()
  @build.query([], [
    () => ({name: 'default', abfrage: 'SELECT * FROM arbeitskreise'})
  ])
  getArbeitskreise():Promise<{ default: Array<IAK_small> }> {return}

  @build.register()
  @build.query([
    new numberValidator('Arbeitskreis ID').required().ganz().min(1)
  ], [
    (self, akID: number) => ({name: 'default', abfrage: `SELECT * FROM arbeitskreise WHERE ID = ${akID}`, single}),
    (self, akID: number) => ({name: 'mitglieder', abfrage: `SELECT a.personID, p.vorname, p.nachname, p.gebDat, p.geschlecht, a.date, a.neuerStatus, a.ID FROM person_arbeitskreis a, personen p WHERE p.ID = a.personID AND a.akID = ${akID} ORDER BY p.ID`})
  ])
  getArbeitskreis(akID: number):Promise<IAK>{return}

  @build.register()
  @build.query([], [
    () => ({name: 'default', abfrage: `SELECT ID, vorname, nachname, gebDat, geschlecht FROM personen ORDER BY vorname, nachname`})
  ])
  getPersonen():Promise<any> {return}

  @build.register()
  @build.query([], [
    (self, personID: number) => ({name: 'default', abfrage: `SELECT * FROM personen_admin WHERE ID = ${personID} ORDER BY vorname, nachname`, single}),
    (self, personID: number) => ({name: 'anmeldungen', abfrage: `SELECT a.anmeldeID, a.rollenID, v.bezeichnung, v.kurzBezeichnung, v.begin, v.ende FROM anmeldungen_admin a, veranstaltung v WHERE a.veranstaltungsID = v.ID AND a.personID = ${personID}`}),
    (self, personID: number) => ({name: 'adressen', abfrage: `SELECT * FROM person_adresse WHERE ID = ${personID} ORDER BY plz`}),
    (self, personID: number) => ({name: 'email', abfrage: `SELECT * FROM person_email WHERE ID = ${personID} ORDER BY email`}),
    (self, personID: number) => ({name: 'fzAntrag', abfrage: `SELECT * FROM person_fz_antrag WHERE ID = ${personID}`}),
    (self, personID: number) => ({name: 'juleica', abfrage: `SELECT * FROM person_juleica WHERE ID = ${personID} ORDER BY juLeiCaNr`}),
    (self, personID: number) => ({name: 'telefon', abfrage: `SELECT * FROM person_telefon WHERE ID = ${personID} ORDER BY telefon`}),
    (self, personID: number) => ({name: 'tags', abfrage: `SELECT p.ID, p.notiz, t.ID, t.bezeichnung FROM person_tag p, stamm_tags t WHERE personID = ${personID} ORDER BY t.bezeichnung`}),
    (self, personID: number) => ({name: 'fz', abfrage: `SELECT f.ID, f.gesehenAm, f.kommentar, p.vorname, p.nachname, p.ID AS gesehenVonID, p.gebDat FROM personen p, person_fz f WHERE f.gesehenVon = p.ID AND f.personID = ${personID}`}),
    (self, personID: number) => ({name: 'ak', abfrage: `SELECT p.ID, p.date, p.neuerStatus, p.akID, s.bezeichnung, a.bezeichnung FROM person_arbeitskreis p, arbeitskreise a, stamm_arbeitskreis_stadien s WHERE p.personID = ${personID} ORDER BY p.date`})
  ])
  getPerson(personID: number):Promise<any> {return}

  //TODO:
  @build.register()
  getAnmeldungen() {}

  @build.register()
  @build.query([], [
    (self, anmeldeID: number) => ({name: 'default', abfrage: `SELECT an.*, b.telefon, e.email, a.strasse, a.plz, a.ort, r.bezeichnung FROM anmeldungen_admin an, person_telefon b, person_email e, person_adresse a, stamm_rollen r WHERE an.ID = ${anmeldeID} AND an.rollenID = r.ID AND an.adressID = a.ID AND an.eMailID = e.ID AND an.telefonID = b.ID`, single})
  ])
  getAnmeldung(anmeldeID: string):Promise<any> {return}

  @build.register()
  @build.query([], [
    () => ({name: 'default', abfrage: `SELECT ID, bezeichnung, kurzBezeichnung, begin, ende FROM veranstaltung ORDER BY begin DESC`})
  ])
  getVeranstaltungen():Promise<{default: Array<IVeranstaltung_small>}> {return}

  //TODO:
  @build.register()
  getVeranstaltung(veranstaltungsID:number):Promise<any> {return}

  @build.register()
  @build.query([], [
    () => ({name: 'default', abfrage: `SELECT ID, bezeichnung, ort, land FROM veranstaltungsorte ORDER BY bezeichnung`})
  ])
  getVeranstaltungsorte():Promise<{default: Array<IVOrt_small>}> {return}

  //TODO:
  @build.register()
  getVeranstaltungsort(veranstaltungsortID: number):Promise<any> {return}

  @build.register()
  @build.query([], [
    () => ({name: 'default', abfrage: `SELECT ID, bezeichnung FROM organisationen ORDER BY bezeichnung`})
  ])
  getOrganisationen():Promise<any> {return}

  @build.register()
  @build.query([
    new numberValidator('Organisation ID').required().ganz().min(0)
  ], [
    (self, orgID: number) => ({name: 'default', abfrage: `SELECT * FROM organisationen WHERE ID = ${orgID}`, single}),
    (self, orgID: number) => ({name: 'veranstaltungen', abfrage: `SELECT v.ID, v.bezeichnung, v.kurzBezeichnung, l.ID, l.organisitationID FROM veranstaltung v, veranstaltungsorte l WHERE l.organisitationID = ${orgID} AND v.veranstaltungsortID = l.ID ORDER BY v.begin DESC`}),
    (self, orgID:number) => ({name: 'veranstaltungsorte', abfrage: `SELECT ID, bezeichnung, anzahl_min, anzahl_max, organisitationID FROM veranstaltungsorte WHERE organisitationID = ${orgID} ORDER BY bezeichnung`})
  ])
  getOrganisation(organisationsID: number):Promise<any> {return}

  @build.register()
  excel(name:string, id?:number|string):Promise<Buffer>{
    return comp.pdfExcelTemplate(`./docs/${name}.xlsx`, id)
  }
  
  @build.register()
  word(name:string, id?:number|string):Promise<Buffer>{
    return comp.pdfWordTemplate(`./docs/${name}.docx`, id)
  }
}

export function server() {
  let servers = server_api(api, async (username:string, password:string)=>true, async ()=>[], 4000)

  // CRON
  setInterval(() => {
    // TODO: Mail handler
  }, 1000)

  setInterval(() => {
    
  }, 10 * 1000)

  setInterval(() => {
    // TODO: FZ Anrang handler
  }, 60 * 1000)

  setInterval(() => {
    
  }, 60 * 60 * 1000)

  setInterval(() => {
    
  }, 24 * 60 * 60 * 1000)
}

export function client() {
  return client_api<api>(api, 'http://localhost:4000')
}