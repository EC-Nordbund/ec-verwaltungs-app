import { user } from '../../users/user';
import { query } from '../mysql';
import {
  adresse,
  email,
  person,
  telefon,
  timeStamp,
  veranstaltung
  } from '.';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

export const _anmeldung = new GraphQLObjectType({
  name: 'anmeldung',
  fields: () => ({
    anmeldeID: {
      type: new GraphQLNonNull(GraphQLString),
    },
    person: {
      type: new GraphQLNonNull(person),
      async resolve(parent) {
        const person = await query(`SELECT * FROM personen WHERE personID = ${parent.personID}`)
        return person[0]
      },
    },
    veranstaltung: {
      type: new GraphQLNonNull(veranstaltung),
      async resolve(parent) {
        const veranstaltung = await query(`SELECT * FROM veranstaltungen WHERE veranstaltungsID = ${parent.veranstaltungsID}`)
        return veranstaltung[0]
      },
    },
    position: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    adresse: {
      type: new GraphQLNonNull(adresse),
      async resolve(parent) {
        const adresse = await query(`SELECT * FROM adressen WHERE adressID = ${parent.adressID}`)
        return adresse[0]
      },
    },
    email: {
      type: new GraphQLNonNull(email),
      async resolve(parent) {
        const email = await query(`SELECT * FROM eMails WHERE eMailID = ${parent.eMailID}`)
        return email[0]
      },
    },
    telefon: {
      type: new GraphQLNonNull(telefon),
      async resolve(parent) {
        const telefon = await query(`SELECT * FROM telefone WHERE telefonID = ${parent.telefonID}`)
        return telefon[0]
      },
    },
    wartelistenPlatz: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    bisherBezahlt: {
      type: new GraphQLNonNull(GraphQLFloat),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'finanzen',
          })
        ) {
          return parent.bisherBezahlt
        } else {
          return null
        }
      },
    },
    anmeldeZeitpunkt: {
      type: new GraphQLNonNull(timeStamp),
    },
    abmeldeZeitpunkt: {
      type: timeStamp,
    },
    abmeldeGebuehr: {
      type: GraphQLInt,
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'finanzen',
          })
        ) {
          return parent.abmeldeGebuehr
        } else {
          return null
        }
      },
    },
    wegDerAbmeldung: {
      type: GraphQLString,
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'abmeldung',
          })
        ) {
          return parent.wegDerAbmeldung
        } else {
          return null
        }
      },
    },
    rueckbezahlt: {
      type: GraphQLFloat,
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'finanzen',
          })
        ) {
          return parent.rueckbezahlt
        } else {
          return null
        }
      },
    },
    kommentarAbmeldung: {
      type: GraphQLString,
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'abmeldung',
          })
        ) {
          return parent.kommentarAbmeldung
        } else {
          return null
        }
      },
    },
    vegetarisch: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'bemerkungen',
          })
        ) {
          return parent.vegetarisch
        } else {
          return null
        }
      },
    },
    lebensmittelAllergien: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'bemerkungen',
          })
        ) {
          return parent.lebensmittelAllergien
        } else {
          return null
        }
      },
    },
    gesundheitsinformationen: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'bemerkungen',
          })
        ) {
          return parent.gesundheitsinformationen
        } else {
          return null
        }
      },
    },
    bemerkungen: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'bemerkungen',
          })
        ) {
          return parent.bemerkungen
        } else {
          return null
        }
      },
    },
    radfahren: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.radfahren
        } else {
          return null
        }
      },
    },
    fahrgemeinschaften: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.fahrgemeinschaften
        } else {
          return null
        }
      },
    },
    klettern: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.klettern
        } else {
          return null
        }
      },
    },
    sichEntfernen: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.sichEntfernen
        } else {
          return null
        }
      },
    },
    bootFahren: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.bootFahren
        } else {
          return null
        }
      },
    },
    schwimmen: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent, args, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'anmeldungen',
            field: 'erlaubnisse',
          })
        ) {
          return parent.schwimmen
        } else {
          return null
        }
      },
    },
    DSGVO_einverstaendnis: {
      type: new GraphQLNonNull(timeStamp),
    },
    infoBrief: {
      type: timeStamp,
    },
    bestaetigungsBrief: {
      type: timeStamp,
    },
    extra_json: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})
