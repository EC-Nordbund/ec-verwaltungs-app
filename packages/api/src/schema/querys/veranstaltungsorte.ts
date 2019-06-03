import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import { vorte } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  vorte: {
    description: 'Returnt Liste der vorteen',
    args: addAuth(),
    type: new GraphQLList(vorte),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM vOrte`)
    })
  },
  vort: {
    args: addAuth({
      vOrtID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der vorteen'
      }
    }),
    type: vorte,
    description: 'vorte mit einer bestimmten ID',
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM vOrte WHERE vOrtID = ${args.vOrtID}`
      ).then(res => res[0])
    })
  }
}
