import { getUser } from '../users';
import {
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldResolver,
  GraphQLNonNull,
  GraphQLResolveInfo,
  GraphQLString
  } from 'graphql';

export function addAuth(args: GraphQLFieldConfigArgumentMap = {}): GraphQLFieldConfigArgumentMap {
  args.authToken = {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Authentifizierungs-Token',
  }
  return args
}

export function handleAuth(cb: GraphQLFieldResolver<any, any>): GraphQLFieldResolver<any, any> {
  return function(parent: any, args: any, context: any, info: GraphQLResolveInfo) {
    context.user = getUser(args.authToken)
    return cb(parent, args, context, info)
  }
}

export function handleAllowed(cb: GraphQLFieldResolver<any, any>, queryName: string): GraphQLFieldResolver<any, any> {
  return function(parent: any, args: any, context: any, info: GraphQLResolveInfo) {
    const myUserGroup = getUser(args.authToken).userGroup

    if (myUserGroup.mutationRechte.indexOf(queryName) !== -1) {
      return cb(parent, args, context, info)
    } else {
      throw 'Not allowed'
    }
  }
}

export function checkAuth(authToken: string): boolean {
  return getUser(authToken) !== undefined
}
