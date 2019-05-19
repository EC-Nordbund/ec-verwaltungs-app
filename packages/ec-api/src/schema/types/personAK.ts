import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList
} from 'graphql'
import { ak, akStatus, person } from '.'

import { query } from '../mysql'

export const _personAK = new GraphQLObjectType({
  name: 'personenAK',
  fields: () => ({
    ak: {
      type: ak,
      resolve(parent: { akID: number; personID: number }) {
        return query(
          `SELECT * FROM ak WHERE akID = ${parent.akID}`
        ).then(v => v[0])
      }
    },
    person: {
      type: person,
      resolve(parent: { akID: number; personID: number }) {
        return query(
          `SELECT * FROM personen WHERE personID = ${
            parent.personID
          }`
        ).then(v => v[0])
      }
    },
    currentStatus: {
      type: new GraphQLNonNull(GraphQLInt),
      resolve(parent) {
        return query(
          `SELECT neuerStatus FROM akPerson WHERE akID = ${
            parent.akID
          } AND personID = ${
            parent.personID
          } ORDER BY date DESC LIMIT 1`
        ).then(v => v[0].neuerStatus)
      }
    },
    allUpdates: {
      type: new GraphQLList(akStatus),
      resolve(parent) {
        return query(
          `SELECT * FROM akPerson WHERE akID = ${
            parent.akID
          } AND personID = ${parent.personID}`
        )
      }
    }
  })
})
