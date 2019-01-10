import middleWare from "./middleware";
import {
  changePWD,
  getUser,
  login,
  logout
  } from "./users/index";
import { ApolloServer } from "apollo-server-express";
import * as cors from "cors";
import * as express from "express";
import * as fs from "fs";
import { v1 as neo4j } from "neo4j-driver";
import { makeAugmentedSchema } from "neo4j-graphql-js";
import { join } from "path";

const typeDefs = fs.readFileSync(join(__dirname, "../schema.gql")).toString();
const schema = makeAugmentedSchema(
  {
    resolvers: {
      Query: {
        getAnmeldung(parent, args) {
          return;
        }
      },
      Mutation: {
        login(parent, args) {
          return login(args.username, args.password);
        },
        logout(parent, args) {
          return logout(args.authToken);
        },
        changePassword(parent, args) {
          return changePWD(
            getUser(args.authToken).userID,
            args.oldPWD,
            args.newPWD
          );
        }
        // CreateUser
        // DeleteUser
        // UpdateUser
      }
    },
    typeDefs
  },
  {
    query: {
      exclude: ["User"]
    },
    mutation: {
      exclude: ["User"]
    }
  }
);

const driver = neo4j.driver(
  "bolt://localhost",
  neo4j.auth.basic("neo4j", "pwd")
);

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
  schema: middleWare(schema)
});

const app = express().use(cors());

server.applyMiddleware({app});

app.all("/", function(req, res) {
  res.redirect("/graphql");
});

app.all("*", function(req, res) {
  res.redirect("https://ec-nordbund.de/?redirectFromAPI");
});

export default app;
