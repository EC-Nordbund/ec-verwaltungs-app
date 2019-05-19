import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
  } from 'graphql';


export default {
  veranstaltungAdd: {
    type: GraphQLBoolean,
    args: addAuth({
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      begin: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ende: {
        type: GraphQLString,
      },
      veranstaltungsortID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      minTNAlter: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      maxTNAlter: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO veranstaltungen (bezeichnung, begin, ende, veranstaltungsort, minTNAlter, maxTNAlter) VALUES ("${args.bezeichnung}", "${args.begin}", ${
        args.ende ? '"' + args.ende + '"' : 'null'
      },
        ${args.veranstaltungsortID},
        ${args.minTNAlter},
        ${args.maxTNAlter})`)
    }, 'veranstaltungenAdd'),
  },
  veranstaltungenStamm: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      kurzBezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      begin: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ende: {
        type: GraphQLString,
      },
      veranstaltungsortID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      minTNAlter: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      maxTNAlter: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE veranstaltungen SET bezeichnung = "${args.bezeichnung}", kurzBezeichnung = ${args.kurzBezeichnung}, begin = "${args.begin}", ende=${
          args.ende ? '"' + args.ende + '"' : 'null'
        }, veranstaltungsort = ${args.veranstaltungsortID}, minTNAlter=${args.minTNAlter}, maxTNAlter=${args.maxTNAlter} WHERE veranstaltungsID= ${args.veranstaltungsID}`,
      )
    }, 'veranstaltungenStamm'),
  },
  veranstaltungenPreise: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisFruehbucher: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisAnzahlungFruehbucher: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisNormal: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisAnzahlungNormal: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisLastMinute: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      preisAnzahlungLastMinute: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      fruehbucherBis: {
        type: new GraphQLNonNull(GraphQLString),
      },
      lastMinuteAb: {
        type: new GraphQLNonNull(GraphQLString),
      },
      kannVorortBezahltWerden: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET preisFruehbucher=${args.preisFruehbucher}, preisAnzahlungFruehbucher=${args.preisAnzahlungFruehbucher}, preisNormal=${
        args.preisNormal
      }, preisAnzahlungNormal=${args.preisAnzahlungNormal}, preisLastMinute=${args.preisLastMinute}, preisAnzahlungLastMinute=${args.preisAnzahlungLastMinute},
      kannVorortBezahltWerden = ${args.kannVorortBezahltWerden},
      fruehbucherBis="${args.fruehbucherBis}", lastMinuteAb="${args.lastMinuteAb}" WHERE veranstaltungsID= ${args.veranstaltungsID}`)
    }, 'veranstaltungenPreise'),
  },
  veranstaltungenWarteliste: {
    type: GraphQLBoolean,
    args: {
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      hatGeschlechterSpezifischeWarteliste: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      anzahlPlaetze: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      anzahlPlaetzeM: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      anzahlPlaetzeW: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    },
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE veranstaltungen SET hatGWarteliste = ${args.hatGeschlechterSpezifischeWarteliste}, anzahlPlätze=${args.anzahlPlaetze}, anzahlPlätzeWeiblich=${
          args.anzahlPlaetzeW
        }, anzahlPlätzeMännlich=${args.anzahlPlaetzeM} WHERE veranstaltungsID=${args.veranstaltungsID}`,
      )
    }, 'veranstaltungenWarteliste'),
  },
  veranstaltungenTNListeZuschuesse: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      xlsx: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET xlsxZuschuesse="${args.xlsx}"  WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenTNListe'),
  },
  veranstaltungenTNListeLeiter: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      xlsx: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET xlsxLeiter="${args.xlsx}"  WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenTNListe'),
  },
  veranstaltungenTNListeMitarbeiter: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      xlsx: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET xlsxMitarbeiter="${args.xlsx}"  WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenTNListe'),
  },
  veranstaltungenTNListeKueche: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      xlsx: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET xlsxKueche="${args.xlsx}" WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenTNListe'),
  },
  veranstaltungBestaetigungsbrief: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      brief: {
        type: new GraphQLNonNull(GraphQLString),
      },
      geschlechter: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET bestaetigungsBrief="${args.brief}", bestaetigungsBriefGeschlecht="${args.geschlechter}" WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenBriefe'),
  },
  veranstaltunginfobrief: {
    type: GraphQLBoolean,
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      brief: {
        type: new GraphQLNonNull(GraphQLString),
      },
      geschlechter: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE veranstaltungen SET infoBrief="${args.brief}", infoBriefGeschlecht="${args.geschlechter}" WHERE veranstaltungsID=${args.veranstaltungsID}`)
    }, 'veranstaltungenBriefe'),
  },
}
