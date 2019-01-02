import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql'

export const _userGroup = new GraphQLObjectType({
  name: 'userGroup',
  fields: () => ({
    userGroupID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    mutationRechte: {
      type: new GraphQLList(GraphQLString)
    },
    fieldAccess: {
      type: new GraphQLList(
        new GraphQLObjectType({
          name: 'field',
          fields: {
            table: {
              type: new GraphQLNonNull(GraphQLString)
            },
            field: {
              type: new GraphQLNonNull(GraphQLString)
            }
          }
        })
      )
    }
  })
})
