import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

export const _alert = new GraphQLObjectType({
  name: 'alert',
  fields: () => ({
    alertID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    content: {
      type: new GraphQLNonNull(GraphQLString)
    },
    von: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
