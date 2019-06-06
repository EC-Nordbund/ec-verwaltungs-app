import _user, { user } from '../../users/user';
import { query } from '../mysql';
import {
  adresse,
  anmeldung,
  date,
  ecKreis,
  email,
  fz,
  fzAntrag,
  personAK,
  telefon,
  timeStamp,
  juleica,
  personTag
  } from '.';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

export const _person = new GraphQLObjectType({
  name: 'person',
  fields: () => ({
    personID: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    vorname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    nachname: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gebDat: {
      type: new GraphQLNonNull(date),
    },
    geschlecht: {
      type: new GraphQLNonNull(GraphQLString),
    },
    alter: {
      type: new GraphQLNonNull(GraphQLInt),
      args: {
        wann: {
          type: GraphQLString,
        },
      },
      resolve(parent: { gebDat: Date }, args) {
        if (args.wann === null) {
          args.wann = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        }

        let older: Date = parent.gebDat
        let newer: Date = new Date(args.wann)

        let tmpDate = newer.getFullYear() - older.getFullYear()

        let tmpGebDatArr = args.wann.split('-')
        tmpGebDatArr[0] -= tmpDate

        let tmpGebDat = new Date(tmpGebDatArr.join('-'))

        if (tmpGebDat < older) {
          return tmpDate - 1
        } else {
          return tmpDate
        }
      },
    },
    adressen: {
      type: new GraphQLList(adresse),
      resolve(parent: { personID: number }) {
        return query(`SELECT * FROM adressen WHERE personID = ${parent.personID}`)
      },
    },
    emails: {
      type: new GraphQLList(email),
      resolve(parent: { personID: number }) {
        return query(`SELECT * FROM eMails WHERE personID = ${parent.personID}`)
      },
    },
    telefone: {
      type: new GraphQLList(telefon),
      resolve(parent: { personID: number }) {
        return query(`SELECT * FROM telefone WHERE personID = ${parent.personID}`)
      },
    },
    anmeldungen: {
      type: new GraphQLList(anmeldung),
      resolve(parent: { personID: number }, args, context: { user: any }) {
        return query(`SELECT * FROM anmeldungen WHERE personID = ${parent.personID}`)
      },
    },
    fzs: {
      type: new GraphQLList(fz),
      resolve(parent: { personID: number }, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'fz',
          })
        ) {
          return query(`SELECT * FROM fz WHERE personID = ${parent.personID}`)
        } else {
          return []
        }
      },
    },
    fzAntraege: {
      type: new GraphQLList(fzAntrag),
      resolve(parent: { personID: number }, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'fzAntrag',
          })
        ) {
          return query(`SELECT * FROM fzAntrag WHERE personID = ${parent.personID}`)
        } else {
          return []
        }
      },
    },
    datumDesLetztenFZ: {
      type: date,
      resolve(parent: { personID: number }, args, context: { user: any }) {
        return query(`SELECT fzVon FROM fz WHERE personID = ${parent.personID} ORDER BY gesehenAm DESC LIMIT 1`).then(rows => {
          if (rows.length === 0) {
            return null
          } else {
            return rows[0].fzVon
          }
        })
      },
    },
    hatFZ: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        wann: {
          type: GraphQLString,
        },
      },
      resolve(parent: { personID: number }, args) {
        if (args.wann === null) {
          args.wann = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
        }
        return query(`SELECT gesehenAm  FROM fz WHERE personID = ${parent.personID} ORDER BY gesehenAm DESC LIMIT 1`)
          .then(rows => {
            if (rows.length === 0) {
              return null
            } else {
              return rows[0].gesehenAm
            }
          })
          .then(fzDate => {
            let wannArr = args.wann.split('-')
            wannArr[0] -= 5
            return fzDate > new Date(wannArr.join('-'))
          })
      },
    },
    ecKreis: {
      type: ecKreis,
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'ecKreis',
          })
        ) {
          if (parent.ecKreis === null) {
            return null
          } else {
            return query(`SELECT * FROM ecKreis WHERE ecKreisID = ${parent.ecKreis}`).then(rows => rows[0])
          }
        } else {
          return null
        }
      },
    },
    ecMitglied: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'ecMitglied',
          })
        ) {
          return parent.ecMitglied
        } else {
          return -1
        }
      },
    },
    juleica: {
      type: new GraphQLList(juleica),
      resolve(parent, _, context: { user: user }) {
        return query(`SELECT * FROM juleica WHERE personID = ${parent.personID}`)
      },
    },
    tags: {
      type: new GraphQLList(personTag),
      resolve(parent, _, context: { user: user }) {
        return query(`SELECT * FROM tagsPersonen WHERE personID = ${parent.personID}`)
      },
    },
    ak: {
      type: new GraphQLList(personAK),
      resolve(parent, _, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'ak',
          })
        ) {
          return query(`SELECT akID FROM akPerson WHERE personID = ${parent.personID} GROUP BY akID`).then(v =>
            v.map(el => ({
              akID: el.akID,
              personID: parent.personID,
            })),
          )
        } else {
          return []
        }
      },
    },
    bisherigeRollen: {
      type: new GraphQLList(GraphQLInt),
      resolve(parent, _, context: { user: user }) {
        return query(`SELECT DISTINCT position FROM anmeldungen WHERE personID = ${parent.personID}`)
      },
    },
    Notizen: {
      type: new GraphQLNonNull(GraphQLString),
    },
    erstellt: {
      type: new GraphQLNonNull(timeStamp),
    },
    letzteAenderung: {
      type: new GraphQLNonNull(timeStamp),
    },
  }),
})
