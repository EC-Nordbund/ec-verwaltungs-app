import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'
import { timeStamp } from '.'

export const _telefon = new GraphQLObjectType({
  name: 'telefon',
  description: 'Telefonnummer',
  fields: () => ({
    telefonID: {
      description: 'ID der Telefonnummer',
      type: new GraphQLNonNull(GraphQLInt)
    },
    telefon: {
      description: 'Telefonnummer',
      type: new GraphQLNonNull(GraphQLString)
    },
    isOld: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    lastUsed: {
      type: new GraphQLNonNull(timeStamp)
    }
  })
})
