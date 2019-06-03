import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLList,
  GraphQLBoolean
} from 'graphql'

import { query } from '../mysql'

import { vortKontakt, organisation, veranstaltung } from '.'

export const _vorte = new GraphQLObjectType({
  name: 'vorteType',
  fields: () => ({
    vOrtID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    veranstaltungen: {
      type: new GraphQLList(veranstaltung),
      resolve(parent) {
        return query(
          `SELECT * FROM veranstaltungen WHERE veranstaltungsort = ${
            parent.vOrtID
          } `
        )
      }
    },
    organisation: {
      type: organisation,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return query(
            `SELECT * FROM organisationen WHERE organisationsID = ${
              parent.organisitationID
            }`
          ).then(v => v[0])
        } else {
          return null
        }
      }
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    strasse: {
      type: new GraphQLNonNull(GraphQLString)
    },
    plz: {
      type: new GraphQLNonNull(GraphQLString)
    },
    ort: {
      type: new GraphQLNonNull(GraphQLString)
    },
    land: {
      type: new GraphQLNonNull(GraphQLString)
    },
    notizen: {
      type: GraphQLString,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return parent.notizen
        } else {
          return null
        }
      }
    },
    anzahl_max: {
      type: GraphQLInt,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return parent.anzahl_max
        } else {
          return null
        }
      }
    },
    anzahl_min: {
      type: GraphQLInt,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return parent.anzahl_min
        } else {
          return null
        }
      }
    },
    vollverpflegung: {
      type: GraphQLBoolean,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return parent.vollverpflegung
        } else {
          return null
        }
      }
    },
    selbstversorger: {
      type: GraphQLBoolean,
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return parent.selbstversorger
        } else {
          return null
        }
      }
    },
    kontakte: {
      type: new GraphQLList(vortKontakt),
      resolve(parent, _, context) {
        if (
          context.user.checkAlowedFileds({
            table: 'vOrte',
            field: 'extended'
          })
        ) {
          return query(
            `SELECT * FROM vOrtKontakt WHERE vOrt=${
              parent.vOrtID
            }`
          )
        } else {
          return []
        }
      }
    }
  })
})
