import { permissions } from "./permissions";
import { applyMiddleware } from "graphql-middleware";
import { sentry } from "graphql-middleware-sentry";

const sentryMiddleware = sentry({
  config: {
    dsn: "https://b3b34064975846faa3a6757b52ea2168@sentry.io/1367817",
    environment: process.env.NODE_ENV,
    release: process.env.npm_package_version
  }
});

export default (schema: any) =>
  applyMiddleware(schema, permissions, sentryMiddleware);
