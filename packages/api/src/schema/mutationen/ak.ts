import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import * as Promise from 'bluebird';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
  } from 'graphql';

export default {
  addAK: {
    type: new GraphQLNonNull(GraphQLInt),
    description: 'Comming Soon...',
    args: addAuth({
      bezeichnung: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed(async function(_, args) {
      await query(`INSERT INTO ak (bezeichnung) VALUES ('${args.bezeichnung}')`)
      const ak = await query(`SELECT akID FROM ak WHERE bezeichnung = '${args.bezeichnung}'`)
      return ak[0].akID
    }, 'addAK'),
  },
  editAK: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: addAuth({
      akID: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      bezeichnung: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed(async function(_, args) {
      await query(`UPDATE ak SET bezeichnung = '${args.bezeichnung}' WHERE akID = ${args.akID}`)
      return true
    }, 'editAK'),
  },
  updateAKStatus: {
    type: GraphQLBoolean,
    args: addAuth({
      personID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      akID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      date: {
        type: new GraphQLNonNull(GraphQLString),
      },
      status: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO akPerson (personID, akID, date, neuerStatus) VALUES (${args.personID}, ${args.akID}, '${args.date}', ${args.status})`)
    }, 'updateAKStatus'),
  },
}
