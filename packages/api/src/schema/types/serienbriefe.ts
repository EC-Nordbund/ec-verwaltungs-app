import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from 'graphql'

export const _serienbrief = new GraphQLObjectType({
  name: 'Serienbrief',
  fields: () => ({
    sbID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString)
    },
    docxDocument: {
      type: new GraphQLNonNull(GraphQLString)
    },
    geschlechterspizifischeAttribute: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
})
