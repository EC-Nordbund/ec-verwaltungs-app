import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
  } from 'graphql';


export default {
  addVeranstaltungsort: {
    type: GraphQLBoolean,
    args: addAuth({
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      strasse: {
        type: new GraphQLNonNull(GraphQLString),
      },
      plz: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ort: {
        type: new GraphQLNonNull(GraphQLString),
      },
      land: {
        type: new GraphQLNonNull(GraphQLString),
      },
      organisationsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `INSERT INTO vOrte(bezeichnung, strasse, plz, ort, land, organisitationID) VALUES("${args.bezeichnung}", "${args.strasse}", "${args.plz}", "${args.ort}", "${args.land}", "${
          args.organisationsID
        }")`,
      )
    }, 'vorte'),
  },
  veranstaltungsortEditStamm: {
    type: GraphQLBoolean,
    args: addAuth({
      vOrtID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      strasse: {
        type: new GraphQLNonNull(GraphQLString),
      },
      plz: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ort: {
        type: new GraphQLNonNull(GraphQLString),
      },
      land: {
        type: new GraphQLNonNull(GraphQLString),
      },
      organisationsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE vOrte SET bezeichnung = "${args.bezeichnung}", strasse = "${args.strasse}",  plz= "${args.plz}", ort = "${args.ort}",land  = "${args.land}", organisitationID=${
          args.organisationsID
        } WHERE vOrtID = ${args.vOrtID}`,
      )
    }, 'vorte'),
  },
  veranstaltungsortEditSonstiges: {
    type: GraphQLBoolean,
    args: addAuth({
      vOrtID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      anzahl_min: {
        type: GraphQLInt,
      },
      anzahl_max: {
        type: GraphQLInt,
      },
      selbstversorger: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      vollverpflegung: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      notizen: {
        type: GraphQLString,
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE vOrte SET anzahl_min=${args.anzahl_min}, anzahl_max=${args.anzahl_max}, notizen = ${args.notizen ? '"' + args.notizen + '"' : null}, vollverpflegung=${
          args.vollverpflegung
        }, selbstversorger=${args.selbstversorger} WHERE vOrtID = ${args.vOrtID}`,
      )
    }, 'vorte'),
  },
  veranstaltungsortAddKontakt: {
    type: GraphQLBoolean,
    args: addAuth({
      vOrtID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      ansprechpartner: {
        type: new GraphQLNonNull(GraphQLString),
      },
      typ: {
        type: new GraphQLNonNull(GraphQLString),
      },
      telefon: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO vOrtKontakt (vOrt, ansprechpartner, typ, telefon, email) VALUES (${args.vOrtID}, "${args.ansprechpartner}", "${args.typ}", "${args.telefon}", "${args.email}")`)
    }, 'vorte'),
  },
  veranstaltungsortEditKontakt: {
    type: GraphQLBoolean,
    args: addAuth({
      vOrtKontaktID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      ansprechpartner: {
        type: new GraphQLNonNull(GraphQLString),
      },
      typ: {
        type: new GraphQLNonNull(GraphQLString),
      },
      telefon: {
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        type: new GraphQLNonNull(GraphQLString),
      },
      notizen: {
        type: GraphQLString,
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE vOrtKontakt SET ansprechpartner="${args.ansprechpartner}", typ="${args.typ}", telefon="${args.telefon}", email="${args.email}", notizen="${args.notizen}" WHERE vOrtKontaktID= ${
          args.vOrtKontaktID
        }`,
      )
    }, 'vorte'),
  },
  veranstaltungsortDeleteKontakt: {
    type: GraphQLBoolean,
    args: addAuth({
      vOrtKontaktID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`DELETE FROM vOrtKontakt WHERE vOrtKontaktID = ${args.vOrtKontaktID}`)
    }, 'vorte'),
  },
}
