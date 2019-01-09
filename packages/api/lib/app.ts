import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as greenlock from 'greenlock-express';
import * as http from 'http';
import { v1 as neo4j } from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';

const typeDefs = fs.readFileSync("./schema.gql").toString();
const schema = makeAugmentedSchema({typeDefs});

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pwd")
);

const server = new ApolloServer({
  schema,
  context: ({req}) => {
    return {
      driver
    };
  },
  schemaDirectives: {}
});

const app = express().use(cors());

server.applyMiddleware({app});

export default app;
// http
//   .createServer(app)
//   .listen(31415, () =>
//     console.log(
//       `🚀 Server ready at http://localhost:31415${server.graphqlPath}`
//     )
//   );

greenlock
  .create({
    email: "datenschutz@ec-nordbund.de",
    agreeTos: true,
    configDir: "./.config/",
    app: app
  })
  .listen(80, 443);
