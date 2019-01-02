import { schema } from './schema';
import { appVersion } from './version';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';

export const getApp = (dev: boolean) => {
  const app = express()
    .use(cors())
    .use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress({
        schema,
      }),
    )
    .use('/check', (req, res) => {
      res.end('{online: true}')
    })
  if (dev) {
    return app.use(
      '/graphiql',
      graphiqlExpress({
        endpointURL: '/graphql',
      }),
    )
  } else {
    return app.use('/version', (req, res) => {
      res.end(`{"version": "${appVersion}"}`)
    })
  }
}
