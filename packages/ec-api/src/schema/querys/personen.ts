import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

import { person } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  personen: {
    description: 'Returnt Liste von Personen',
    args: addAuth(),
    type: new GraphQLList(person),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM personen`)
    })
  },
  person: {
    description:
      'Returnt gewählte Person anhand der genannten ID',
    args: addAuth({
      personID: {
        description: 'ID der abgefragten Person.',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }),
    type: person,
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM personen WHERE personID = ${
          args.personID
        }`
      ).then(res => res[0])
    })
  },
  moeglicheDublikate: {
    args: addAuth(),
    type: new GraphQLList(
      new GraphQLObjectType({
        name: 'dublikate',
        fields: {
          personA: {
            type: person
          },
          personB: {
            type: person
          }
        }
      })
    ),
    resolve: handleAuth((_, args) => {
      // Check for pos Dubs
      // remove all nodubs
      // Order Persons
      return []
    })
  }
}
