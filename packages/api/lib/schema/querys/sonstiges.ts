import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLNonNull } from 'graphql'

import { alert } from '../types'
import { query } from '../mysql'

import { addAuth } from '../sonstiges'
import { getUser } from '../../users'

export default {
  alerts: {
    type: new GraphQLList(alert),
    description: 'Gibt liste der Letzten 10 Alerts aus.',
    resolve() {
      return query(
        'SELECT * from alertWidget ORDER BY alertID DESC LIMIT 10'
      )
    }
  },
  getDSE: {
    type: GraphQLString,
    args: addAuth({
      force: {
        type: new GraphQLNonNull(GraphQLBoolean),
        description: 'Zwingen die aktuelle DSE anzuzeigen'
      }
    }),
    description: 'Ausgabe der DSE für eine bestimmten User',
    async resolve(parent, args) {
      const userID = getUser(args.authToken).userID
      const currVersion = await query(
        `SELECT * FROM DSGVO_Person WHERE personID = ${userID} ORDER BY ts DESC LIMIT 1`
      )
      const dse = await query(
        `SELECT * FROM dse WHERE guelitgAb < CURRENT_TIMESTAMP ORDER BY guelitgAb DESC LIMIT 1`
      ).then(v => v[0])

      if (args.force) {
        return dse.text
      } else {
        if (currVersion.length === 0) {
          return dse.text
        } else {
          if (currVersion[0].dseID < dse.DSEID) {
            return dse.text
          } else {
            if (
              new Date().getTime() -
              currVersion[0].ts.getTime() >=
              24 * 60 * 60 * 1000 * 6 * 30.5
            ) {
              return dse.text
            } else {
              return null
            }
          }
        }
      }
    }
  }
}
