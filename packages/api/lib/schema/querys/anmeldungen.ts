import { getUser } from "../../users";
import { query } from "../mysql";
import { addAuth, handleAuth } from "../sonstiges";
import { anmeldung } from "../types";
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
  } from "graphql";

const wpTokens: string[] = require("../../../wpTokens.json");

export default {
  anmeldungen: {
    description: "Comming Soon...",
    args: addAuth({}),
    type: new GraphQLList(anmeldung),
    resolve: handleAuth(() => {
      return query(`SELECT * FROM anmeldungen`);
    })
  },
  anmeldung: {
    description: "Comming Soon...",
    args: addAuth({
      anmeldeID: {
        description: "Comming Soon...",
        type: new GraphQLNonNull(GraphQLString)
      }
    }),
    type: anmeldung,
    resolve: handleAuth((_, args) => {
      return query(
        `SELECT * FROM anmeldungen WHERE anmeldeID = '${args.anmeldeID}'`
      ).then(res => res[0]);
    })
  },
  anmeldeStatus: {
    type: new GraphQLNonNull(GraphQLInt),
    args: addAuth({
      anmeldeID: {
        description: "Comming Soon...",
        type: new GraphQLNonNull(GraphQLString)
      },
      isWP: {
        type: new GraphQLNonNull(GraphQLBoolean)
      }
    }),
    resolve(_, args) {
      let allowed = false;
      if (args.isWP) {
        allowed = wpTokens.indexOf(args.token) !== -1;
      } else {
        allowed =
          getUser(args.token).userGroup.mutationRechte.indexOf("anmelden") !==
          -1;
      }

      if (allowed) {
        return query(
          `SELECT wartelistenPlatz, abmeldeZeitpunkt FROM anmeldungen WHERE anmeldeID='${
            args.anmeldeID
          }'`
        )
          .then(row => row[0])
          .then(row => {
            if (row.abmeldeZeitpunkt) {
              return -2;
            } else {
              return row.wartelistenPlatz;
            }
          });
      } else {
        return -1;
      }
    }
  }
};
