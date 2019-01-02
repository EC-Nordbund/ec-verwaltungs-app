import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

export const _ecKreis = new GraphQLObjectType({
  name: 'ecKreis',
  fields: () => ({
    ecKreisID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    website: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
