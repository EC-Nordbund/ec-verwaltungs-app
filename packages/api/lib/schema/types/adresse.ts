import {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean
} from 'graphql'

import { timeStamp } from '.'

export const _adresse = new GraphQLObjectType({
  name: 'adresse',
  fields: () => ({
    adressID: {
      type: new GraphQLNonNull(GraphQLInt)
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
    isOld: {
      type: new GraphQLNonNull(GraphQLBoolean)
    },
    lastUsed: {
      type: new GraphQLNonNull(timeStamp)
    }
  })
})
