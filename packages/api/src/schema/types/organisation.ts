import { query } from '../mysql';
import { vorte } from '.';
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from 'constants';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';



export const _organisationen = new GraphQLObjectType({
  name: 'oraType',
  fields: () => ({
    organisationsID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ansprechpartner: {
      type: GraphQLString
    },
    vOrte: {
      type: new GraphQLList(vorte),
      async resolve(parent) {
        return await query(
          `SELECT * FROM vOrte WHERE organisitationID = ${
            parent.organisationsID
          }`
        )
      }
    },
    strasse: {
      type: GraphQLString
    },
    plz: {
      type: GraphQLString
    },
    ort: {
      type: GraphQLString
    },
    land: {
      type: GraphQLString
    },
    telefon: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    notizen: {
      type: GraphQLString
    }
  })
})
