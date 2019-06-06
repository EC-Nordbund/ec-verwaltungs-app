import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

export const _tag = new GraphQLObjectType({
  name: 'tag',
  fields: () => ({
    tagID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
