import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import { veranstaltung } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  veranstaltungen: {
    description: 'Returnt Liste der Veranstaltungen',
    args: addAuth(),
    type: new GraphQLList(veranstaltung),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM veranstaltungen`)
    })
  },
  veranstaltung: {
    args: addAuth({
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der Veranstaltungen'
      }
    }),
    type: veranstaltung,
    description: 'Veranstaltung mit einer bestimmten ID',
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM veranstaltungen WHERE veranstaltungsID = ${
          args.veranstaltungsID
        }`
      ).then(res => res[0])
    })
  }
}
