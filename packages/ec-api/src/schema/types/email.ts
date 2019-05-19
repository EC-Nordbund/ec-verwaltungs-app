import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString
} from 'graphql'
import { timeStamp } from '.'

export const _email = new GraphQLObjectType({
  name: 'email',
  fields: () => ({
    eMailID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    eMail: {
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
