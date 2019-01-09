import {
  addUser,
  authKey,
  changePWD,
  getUser,
  login,
  logout,
  user,
  userGroup
  } from './users/index';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
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
    const authToken = req.headers.authtoken;
    if (authToken) {
      return {
        driver,
        user: getUser(authToken)
      };
    } else {
      throw new AuthenticationError("Du bist nicht Angemeldet!");
    }
  },
  schemaDirectives: {}
});

const app = express().use(cors());
app.post("/login", bodyParser.json(), (req, res) => {
  console.log(req.body);
  const authToken = login(
    <string>req.headers.username,
    <string>req.headers.password
  );
  res.end(authToken);
});

server.applyMiddleware({app});

export default app;
