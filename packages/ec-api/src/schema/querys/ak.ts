import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import { ak } from '../types'
import { query } from '../mysql'

import { addAuth, handleAuth } from '../sonstiges'

export default {
  aks: {
    args: addAuth(),
    description: 'Comming Soon...',
    type: new GraphQLList(ak),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM ak`)
    })
  },
  ak: {
    args: addAuth({
      akID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt)
      }
    }),
    description: 'Comming Soon...',
    type: ak,
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM ak WHERE akID = ${args.akID}`
      ).then(res => res[0])
    })
  }
}
