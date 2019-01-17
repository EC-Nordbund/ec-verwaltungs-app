import { handleMiddleware, resolvers } from './sonstiges';
import { getUser } from './users';
import { ApolloServer } from 'apollo-server-express';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import { v1 as neo4j } from 'neo4j-driver';
import { makeAugmentedSchema } from 'neo4j-graphql-js';
import * as path from 'path';

// GET Type-Definiton
const typeDefs = fs
  .readFileSync(path.join(__dirname, "../schema.gql"))
  .toString();

// Type Generierung soll folgende Typen unangetastet lassen
const excludeAll = ["User"];

// Creatte Schema
const schema = makeAugmentedSchema(
  {
    resolvers,
    typeDefs
  },
  {
    query: {
      exclude: [...excludeAll]
    },
    mutation: {
      exclude: [...excludeAll]
    }
  }
);

// Create Driver
const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pwd")
);

// Create Apollo Server
const server = new ApolloServer({
  context: ({req}) => {
    const authToken = req.headers.authtoken;
    if (authToken) {
      return {
        driver,
        user: getUser(authToken)
      };
    } else {
      return {driver};
    }
  },
  schema: handleMiddleware(schema)
});

// Create Express, use CORS
const app = express().use(cors());

// Apply Server
server.applyMiddleware({app});

// Redirect Pathes
app
  .all("/", (req, res) => res.redirect("/graphql"))
  .all("*", (req, res) => res.redirect("https://ec-nordbund.de/"));

// Export app
export default app;
