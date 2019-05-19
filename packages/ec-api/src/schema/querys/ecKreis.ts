import { GraphQLList } from 'graphql'

import { ecKreis } from '../types'
import { query } from '../mysql'
import { addAuth, handleAuth } from '../sonstiges'

export default {
  ecKreise: {
    description: 'Comming Soon...',
    args: addAuth({}),
    type: new GraphQLList(ecKreis),
    resolve: handleAuth(() =>
      query(`SELECT * FROM ecKreis`)
    )
  }
}
