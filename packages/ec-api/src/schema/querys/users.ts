import { GraphQLList } from 'graphql'

import { user, userGroup } from '../types'
import { users, userGroups, getUser } from '../../users'

import { addAuth, handleAuth } from '../sonstiges'

export default {
  users: {
    description: 'Comming Soon...',
    args: addAuth(),
    type: new GraphQLList(user),
    resolve: handleAuth((_, args) => {
      return getUser(args.authToken).userGroup
        .bezeichnung === 'admin'
        ? users
        : []
    })
  },
  userGroups: {
    description: 'Comming Soon...',
    type: new GraphQLList(userGroup),
    args: addAuth(),
    resolve: handleAuth((_, args) => {
      return getUser(args.authToken).userGroup
        .bezeichnung === 'admin'
        ? userGroups
        : []
    })
  },
  getMyUserData: {
    type: user,
    args: addAuth(),
    description: 'Comming Soon...',
    resolve: handleAuth((_, args) => {
      return getUser(args.authToken)
    })
  }
}
