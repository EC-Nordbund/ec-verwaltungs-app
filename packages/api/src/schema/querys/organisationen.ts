import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql'

import { organisation } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  orgas: {
    description: 'Returnt Liste der vorteen',
    args: addAuth(),
    type: new GraphQLList(organisation),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM organisationen`)
    })
  },
  orga: {
    args: addAuth({
      organisationsID: {
        type: new GraphQLNonNull(GraphQLInt),
        description: 'ID der vorteen'
      }
    }),
    type: organisation,
    description: 'vorte mit einer bestimmten ID',
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM organisationen WHERE organisationsID = ${
          args.organisationsID
        }`
      ).then(res => res[0])
    })
  }
}
