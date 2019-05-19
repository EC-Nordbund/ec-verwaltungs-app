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
  useAdresse: {
    type: GraphQLBoolean,
    description: 'Update last Used of Adress',
    args: addAuth({
      adressID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Adresse',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE adressen SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE adressID = ${args.adressID}`)
    }, 'oldStatusKontakt'),
  },
  markAdressAsOld: {
    type: GraphQLBoolean,
    description: 'Set Adress as OLD',
    args: addAuth({
      adressID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Adresse',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE adressen SET isOld=1, lastUsed=CURRENT_TIMESTAMP WHERE adressID = ${args.adressID}`)
    }, 'oldStatusKontakt'),
  },
  useEmail: {
    type: GraphQLBoolean,
    description: 'Update last Used of Email',
    args: addAuth({
      emailID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Email',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE eMails SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE eMailID = ${args.emailID}`)
    }, 'oldStatusKontakt'),
  },
  markEmailAsOld: {
    type: GraphQLBoolean,
    description: 'Set Email as OLD',
    args: addAuth({
      emailID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Email',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE eMails SET isOld=1, lastUsed=CURRENT_TIMESTAMP WHERE eMailID = ${args.emailID}`)
    }, 'oldStatusKontakt'),
  },
  useTelefon: {
    type: GraphQLBoolean,
    description: 'Update last Used of Telefon',
    args: addAuth({
      telefonID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Telfonnummer',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE telefone SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE telefonID = ${args.telefonID}`)
    }, 'oldStatusKontakt'),
  },
  markTelefonAsOld: {
    type: GraphQLBoolean,
    description: 'Set Telefon as OLD',
    args: addAuth({
      telefonID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der benutzen Telfonnummer',
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE telefone SET isOld=1, lastUsed=CURRENT_TIMESTAMP WHERE telefonID = ${args.telefonID}`)
    }, 'oldStatusKontakt'),
  },
  addAdresse: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      personID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      strasse: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      plz: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      ort: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return new Promise((resolve, reject) => {
        query(`INSERT INTO adressen (personID, strasse, plz, ort) VALUES (${args.personID}, '${args.strasse}', '${args.plz}', '${args.ort}')`)
          .then(v => {
            query(`SELECT adressID FROM adressen WHERE personID = ${args.personID} AND strasse = '${args.strasse}' AND plz = '${args.plz}' AND ort = '${args.ort}'`)
              .then(res => res[0].adressID)
              .then(resolve)
              .catch(reject)
          })
          .catch(reject)
      })
    }, 'addKontakt'),
  },
  addEmail: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      personID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      email: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return new Promise((resolve, reject) => {
        query(`INSERT INTO eMails (personID, eMail) VALUES (${args.personID}, '${args.email}')`)
          .then(v => {
            query(`SELECT eMailID FROM eMails WHERE personID = ${args.personID} AND eMail = '${args.email}'`)
              .then(res => res[0].eMailID)
              .then(resolve)
              .catch(reject)
          })
          .catch(reject)
      })
    }, 'addKontakt'),
  },
  addTelefon: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      personID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      telefon: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return new Promise((resolve, reject) => {
        query(`INSERT INTO telefone (personID, telefon) VALUES (${args.personID}, '${args.telefon}')`)
          .then(v => {
            query(`SELECT telefonID FROM telefone WHERE personID = ${args.personID} AND telefon = '${args.telefon}'`)
              .then(res => res[0].telefonID)
              .then(resolve)
              .catch(reject)
          })
          .catch(reject)
      })
    }, 'addKontakt'),
  },
  editAdresse: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      adressID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      strasse: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      plz: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      ort: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE adressen SET strasse = '${args.strasse}', plz = '${args.plz}', ort = '${args.ort}' WHERE adressID = ${args.adressID}`).then(v => {
        return true
      })
    }, 'editKontakt'),
  },
  editEmail: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      emailID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      email: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE eMails SET eMail = '${args.email}' WHERE eMailID=${args.emailID}`).then(v => {
        return true
      })
    }, 'editKontakt'),
  },
  editTelefon: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      telefonID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      telefon: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE telefone SET telefon = '${args.telefon}' WHERE telefonID=${args.telefonID}`).then(v => true)
    }, 'editKontakt'),
  },
  deleteAdresse: {
    type: GraphQLBoolean,
    description: 'Löschen einer Adresse',
    args: addAuth({
      adressID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`DELETE FROM adressen WHERE adressID = ${args.adressID}`)
    }, 'deleteKontakt'),
  },
  deleteEMail: {
    type: GraphQLBoolean,
    description: 'Löschen einer Adresse',
    args: addAuth({
      emailID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`DELETE FROM eMails WHERE eMailID = ${args.emailID}`)
    }, 'deleteKontakt'),
  },
  deleteTelefon: {
    type: GraphQLBoolean,
    description: 'Löschen einer Adresse',
    args: addAuth({
      telefonID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`DELETE FROM telefone WHERE telefonID = ${args.telefonID}`)
    }, 'deleteKontakt'),
  },
  mergeAdresse: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      adressID_richtig: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      adressID_falsch: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed(async (_, args) => {
      await query(`UPDATE anmeldungen SET adressID = ${args.adressID_richtig} WHERE adressID = ${args.adressID_falsch}`);
      await query(`DELETE adresse WHERE adressID = ${args.adressID_falsch}`);
    }, 'mergePersonen'),
  },
  mergeTelefon: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      telefonID_richtig: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      telefonID_falsch: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed(async (_, args) => {
      await query(`UPDATE anmeldungen SET telefonID = ${args.telefonID_richtig} WHERE telefonID = ${args.telefonID_falsch}`);
      await query(`DELETE telefone WHERE telefonID = ${args.telefonID_falsch}`);
    }, 'mergePersonen'),
  },
}
