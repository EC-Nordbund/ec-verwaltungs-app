import { person, date, userGroup } from '.'
import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

import { query } from '../mysql'

export const _user = new GraphQLObjectType({
  name: 'user',
  fields: () => ({
    userID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    userName: {
      type: new GraphQLNonNull(GraphQLString)
    },
    person: {
      type: new GraphQLNonNull(person),
      resolve(_) {
        return query(
          `SELECT * FROM personen WHERE personID = ${
            _.personID
          }`
        ).then(v => v[0])
      }
    },
    ablaufDatum: {
      type: new GraphQLNonNull(date),
      resolve(_) {
        return new Date(_.ablaufDatum)
      }
    },
    userGroup: {
      type: new GraphQLNonNull(userGroup)
    }
  })
})
