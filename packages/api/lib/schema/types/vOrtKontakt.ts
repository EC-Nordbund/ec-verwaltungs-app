import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql'

export const _vortKontakt = new GraphQLObjectType({
  name: 'vOrtKontakt',
  fields: () => ({
    vOrtKontaktID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    ansprechpartner: {
      type: new GraphQLNonNull(GraphQLString)
    },
    typ: {
      type: GraphQLString
    },
    telefon: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    },
    notizen: {
      type: GraphQLString
    }
  })
})
