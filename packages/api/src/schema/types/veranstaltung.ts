import { query } from '../mysql';
import { anmeldung, date, vorte } from '.';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

export const _veranstaltung = new GraphQLObjectType({
  name: 'veranstaltung',
  fields: () => ({
    veranstaltungsID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    kurzBezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    hauptleiter: {
      type: anmeldung,
      resolve(parent) {
        return query(
          `SELECT * FROM anmeldungen WHERE veranstaltungsID = ${
            parent.veranstaltungsID
          } AND position = 6`
        ).then((v:any)=>v[0]||null)
      }
    },
    anmeldungen: {
      type: new GraphQLList(anmeldung),
      resolve(parent) {
        return query(
          `SELECT * FROM anmeldungen WHERE veranstaltungsID = ${
            parent.veranstaltungsID
          } ORDER BY anmeldeZeitpunkt`
        )
      }
    },
    veranstaltungsort: {
      type: new GraphQLNonNull(vorte),
      resolve(parent) {
        return query(
          `SELECT * FROM vOrte WHERE vOrtID = ${
            parent.veranstaltungsort
          }`
        ).then(v => v[0])
      }
    },
    begin: {
      type: new GraphQLNonNull(date)
    },
    ende: {
      type: date
    },
    minTNAlter: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    maxTNAlter: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    anzahlPlaetze: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent) {
        return parent.anzahlPlätze
      }
    },
    anzahlPlaetzeW: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent) {
        return parent.anzahlPlätzeWeiblich
      }
    },
    anzahlPlaetzeM: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent) {
        return parent.anzahlPlätzeMännlich
      }
    },
    preisFruehbucher: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    preisNormal: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    preisLastMinute: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    preisAnzahlungNormal: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    preisAnzahlungFruehbucher: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    preisAnzahlungLastMinute: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    fruehbucherBis: {
      type: date
    },
    lastMinuteAb: {
      type: date
    },
    kannVorortBezahltWerden: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    hatGWarteliste: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    xlsxZuschuesse: {
      type: new GraphQLNonNull(GraphQLString)
    },
    xlsxLeiter: {
      type: new GraphQLNonNull(GraphQLString)
    },
    xlsxMitarbeiter: {
      type: new GraphQLNonNull(GraphQLString)
    },
    xlsxKueche: {
      type: new GraphQLNonNull(GraphQLString)
    },
    infoBrief: {
      type: new GraphQLNonNull(GraphQLString)
    },
    infoBriefGeschlecht: {
      type: new GraphQLNonNull(GraphQLString)
    },
    bestaetigungsBrief: {
      type: new GraphQLNonNull(GraphQLString)
    },
    bestaetigungsBriefGeschlecht: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
