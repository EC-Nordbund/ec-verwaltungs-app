import { createFZ } from '../../serienbrief/fz';
import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import * as Promise from 'bluebird';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
} from 'graphql';

export default {
  editPersonStamm: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      personID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      vorname: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      nachname: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      gebDat: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      geschlecht: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return new Promise((resolve, reject) => {
        query(`UPDATE personen SET vorname = '${args.vorname}', nachname = '${args.nachname}', gebDat = '${args.gebDat}', geschlecht = '${args.geschlecht}' WHERE personID = ${args.personID}`)
          .then(v => {
            return true
          })
          .then(resolve)
          .catch(reject)
      })
    }, 'editPersonStamm'),
  },
  addPerson: {
    description: 'Comming Soon...',
    type: new GraphQLNonNull(GraphQLInt),
    args: addAuth({
      vorname: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      nachname: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      gebDat: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      geschlecht: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return new Promise((resolve, reject) => {
        query(`INSERT INTO personen (vorname, nachname, gebDat, geschlecht) VALUES ('${args.vorname}', '${args.nachname}', '${args.gebDat}', '${args.geschlecht}')`)
          .then(v => {
            query(`SELECT personID FROM personen WHERE vorname = '${args.vorname}' AND nachname = '${args.nachname}' AND gebDat = '${args.gebDat}'`)
              .then(res => res[0].personID)
              .then(v => {
                return v
              })
              .then(resolve)
              .catch(reject)
          })
          .catch(reject)
      })
    }, 'addPerson'),
  },
  addFZ: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      personID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      gesehenAm: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      fzVon: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      gesehenVon: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      kommentar: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(`INSERT INTO fz (personID, gesehenAm, gesehenVon, kommentar, fzVon) VALUES (${args.personID}, '${args.gesehenAm}', ${args.gesehenVon}, '${args.kommentar}', '${args.fzVon}')`).then(v => {
        query(`DELETE FROM fzAntrag WHERE personID = ${args.personID}`)
      })
    }, 'addFZ'),
  },
  addFZAntrag: {
    type: GraphQLBoolean,
    args: addAuth({
      personID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      }
    }),
    resolve: handleAllowed(async (_, args) => {
      await createFZ(args.personID, args.email)
      await query(`INSERT INTO fzAntrag (personID) VALUES (${args.personID})`)
    }, 'addFZAntrag'),
  },
  editSonstiges: {
    type: GraphQLBoolean,
    args: addAuth({
      personID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      juLeiCaNr: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ecMitglied: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      ecKreis: {
        type: GraphQLInt,
      },
      Fuehrerschein: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      Rettungsschwimmer: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      ErsteHilfe: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      notizen: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(
        `UPDATE personen SET juLeiCaNr="${args.juLeiCaNr}",ecKreis=${args.ecKreis ? args.ecKreis : null},ecMitglied=${args.ecMitglied}, Fuehrerschein=${args.Fuehrerschein},Rettungsschwimmer=${
          args.Rettungsschwimmer
        },ErsteHilfe=${args.ErsteHilfe},Notizen="${args.notizen}" WHERE personID=${args.personID}`,
      )
    }, 'editPersonSonstiges'),
  },
  updateAKStatus: {
    type: GraphQLBoolean,
    args: addAuth({
      personID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      akID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      date: {
        type: new GraphQLNonNull(GraphQLString),
      },
      status: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(`INSERT INTO akPerson (personID, akID, date, neuerStatus) VALUES (${args.personID}, ${args.akID}, ${args.date}, ${args.status})`)
    }, 'updateAKStatus'),
  },
  mergePersons: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      personID_richtig: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      personID_falsch: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed(async (_, args: any) => {
      await mergePersonen(args)
    }, 'mergePersonen'),
  },  
  noMerge: {
    type: GraphQLBoolean,
    args: addAuth({
      personID_1: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      personID_2: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed(async (_, args) => {
      await query(`INSERT INTO keineDublikate (personID_1, personID_2) VALUES (${args.personID_1},${args.personID_2}), (${args.personID_2},${args.personID_1})`)
    }, 'mergePersonen'),
  },
  handleOldMerge: {
    type: GraphQLBoolean,
    args: addAuth({}),
    resolve: handleAllowed(async (_, args) => {
      let handle = await query(`SELECT d.zielPersonID as personID_richtig, p.personID as personID_falsch FROM dublikate d, personen p WHERE d.vorname = p.vorname AND d.nachname = p.nachname AND d.gebDat = p.gebDat`)
      await Promise.all(handle.map(mergePersonen));
    }, 'mergePersonen'),
  },
}


async function mergePersonen (args: {personID_richtig: number, personID_falsch: number}) {
  let mergeTabeles = ['adressen','akPerson','anmeldungen','eMails','fz','fzAntrag','telefone', 'juleica', 'tagsPersonen']
    .map(table=>`UPDATE IGNORE ${table} SET personID = ${args.personID_richtig} WHERE personID = ${args.personID_falsch}`)
    .map(sql=>query(sql));
  
  await Promise.all(mergeTabeles);
  let mergeTabeles2 = ['adressen','eMails','telefone']
    .map(table=>`DELETE IGNORE FROM ${table} WHERE personID = ${args.personID_falsch}`)
    .map(sql=>query(sql));
  
  await Promise.all(mergeTabeles2);
  
  let telefone = await query(`SELECT * FROM telefone WHERE personID = ${args.personID_falsch}`);
  let telProms = telefone.map(async tel => {
    let newTelID = await query(`SELECT telefonID FROM telefone WHERE telefon = '${tel.telefon}' AND personID = ${tel.personID}`);
    await query(`UPDATE anmeldungen SET telefonID = ${newTelID[0].telefonID} WHERE telefonID = ${args.personID_richtig}`)
  })
  
  await Promise.all(telProms);
  
  let emails = await query(`SELECT * FROM eMails WHERE personID = ${args.personID_falsch}`);
  let mailProms = emails.map(async mail => {
    let newMailID = await query(`SELECT eMailID FROM eMails WHERE eMail = '${mail.eMail}' AND personID = ${args.personID_richtig}`);
    await query(`UPDATE anmeldungen SET eMailID = ${newMailID[0].eMailID} WHERE eMailID = ${mail.eMailID}`)
  })
  
  await Promise.all(mailProms);
  
  
  let adressen = await query(`SELECT * FROM adressen WHERE personID = ${args.personID_falsch}`);
  let adressProms = adressen.map(async adresse => {
    let newAdressID = await query(`SELECT adressID FROM adressen WHERE strasse = '${adresse.strasse}' AND plz = '${adresse.plz}' AND ort = '${adresse.ort}' AND personID = ${args.personID_richtig}`);
    await query(`UPDATE anmeldungen SET adressID = ${newAdressID[0].adressID} WHERE adressID = ${adresse.adressID}`)
  })
  
  await Promise.all(adressProms);
  
  let mergeTabeles3 = ['adressen','eMails','telefone']
    .map(table=>`DELETE IGNORE FROM ${table} WHERE personID = ${args.personID_falsch}`)
    .map(sql=>query(sql));
  
  await Promise.all(mergeTabeles3);
  
  await query(`UPDATE fz SET gesehenVon = ${args.personID_richtig} WHERE gesehenVon = ${args.personID_falsch}`)
  await query(`UPDATE dublikate SET zielPersonID = ${args.personID_richtig} WHERE zielPersonID = ${args.personID_falsch}`)
  let wrongData = await query(`SELECT vorname, nachname, gebDat FROM personen WHERE personID = ${args.personID_falsch}`);
  await query(`DELETE FROM personen WHERE personID = ${args.personID_falsch}`);
  await query(`INSERT INTO dublikate (vorname, nachname, gebDat, zielPersonID) VALUES ('${wrongData[0].vorname}','${wrongData[0].nachname}','${wrongData[0].gebDat.toISOString().split('T')[0]}',${args.personID_richtig})`);
}