import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { person, tag } from '.'

import { query } from '../mysql'

export const _personTag = new GraphQLObjectType({
  name: 'personenTag',
  fields: () => ({
    tag: {
      type: tag,
      resolve(parent: { tagID: number; personID: number }) {
        return query(
          `SELECT * FROM tag WHERE tagID = ${parent.tagID}`
        ).then(v => v[0])
      }
    },
    person: {
      type: person,
      resolve(parent: { tagID: number; personID: number }) {
        return query(
          `SELECT * FROM personen WHERE personID = ${
            parent.personID
          }`
        ).then(v => v[0])
      }
    },
    notiz: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
