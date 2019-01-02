import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import { serienbrief } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  serienbriefe: {
    description: 'Returnt Liste der serienbriefen',
    args: addAuth(),
    type: new GraphQLList(serienbrief),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM serienbriefe`)
    })
  },
  serienbrief: {
    args: addAuth({
      sbID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der serienbriefen'
      }
    }),
    type: serienbrief,
    description: 'serienbrief mit einer bestimmten ID',
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM serienbriefe WHERE sbID = ${
          args.sbID
        }`
      ).then(res => res[0])
    })
  }
}
