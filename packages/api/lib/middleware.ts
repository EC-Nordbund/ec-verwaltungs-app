import { user } from './users';
import { Role } from './users/user';
import { applyMiddleware } from 'graphql-middleware';
import { sentry } from 'graphql-middleware-sentry';
import {
  and,
  not,
  or,
  rule,
  shield
  } from 'graphql-shield';

const sentryMiddleware = sentry({
  config: {
    dsn: "https://b3b34064975846faa3a6757b52ea2168@sentry.io/1367817",
    environment: process.env.NODE_ENV,
    release: process.env.npm_package_version
  }
});

const isRole = (role: Role) =>
  rule({cache: "contextual"})(async (parent, args, ctx, info) => {
    return ctx.user.role === role;
  });

const permissions = shield({
  Adresse: {
    strasse: isRole(Role.none)
  }
});

export default (schema: any) =>
  applyMiddleware(schema, permissions, sentryMiddleware);
