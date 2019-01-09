import middleWare from "./middleware";
import {
  changePWD,
  getUser,
  login,
  logout
  } from "./users/index";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import * as cors from "cors";
import * as express from "express";
import * as fs from "fs";
import { v1 as neo4j } from "neo4j-driver";
import { makeAugmentedSchema } from "neo4j-graphql-js";

const typeDefs = fs.readFileSync("./schema.gql").toString();
const schema = makeAugmentedSchema({
  resolvers: {
    Query: {
      test() {
        return "Hallo Welt!";
      }
    }
  },
  typeDefs
});

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
      throw new AuthenticationError("Du bist nicht Angemeldet!");
    }
  },
  schema: middleWare(schema)
});

const app = express().use(cors());
app.post("/login", (req, res) => {
  const authToken = login(
    req.headers.username as string,
    req.headers.password as string
  );
  res.end(authToken);
});

app.post("/login", (req, res) => {
  res.end(logout(req.headers.authToken as string));
});

app.post("/changePassword", (req, res) => {
  res.end(
    changePWD(
      getUser(req.headers.authToken as string).userID,
      req.headers.oldPwd as string,
      req.headers.newPwd as string
    )
  );
});

server.applyMiddleware({app});

app.all("*", function(req, res) {
  res.redirect("https://ec-nordbund.de/?redirectFromAPI");
});

export default app;
