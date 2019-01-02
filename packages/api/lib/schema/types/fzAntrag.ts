import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'
import { date } from '.'

export const _fzAntrag = new GraphQLObjectType({
  name: 'fzAntrag',
  fields: () => ({
    fzAntragID: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    erzeugt: {
      type: date
    }
  })
})
