import { Role } from "./users/user";
import { applyMiddleware } from "graphql-middleware";
import {
  and,
  not,
  or,
  rule,
  shield
  } from "graphql-shield";

const isRole = (role: Role) =>
  rule({cache: "contextual"})(async (parent, args, ctx, info) => {
    return ctx.user.role === role;
  });

const permissions = shield({
  Adresse: {
    strasse: isRole(Role.none)
  },
  Mutation: {
    CreateAdresse: isRole(Role.none)
  }
});

export default (schema: any) => {
  const schemaAfterPermissions = applyMiddleware(schema, permissions);
  return schemaAfterPermissions;
};
