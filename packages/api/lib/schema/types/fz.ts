import { query } from '../mysql';
import { date, person } from '.';
import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

export const _fz = new GraphQLObjectType({
  name: 'fz',
  fields: () => ({
    fzID: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    gesehenVon: {
      type: new GraphQLNonNull(person),
      async resolve(parent) {
        const person = await query(`SELECT * FROM personen WHERE personID = ${parent.gesehenVon}`)
        return person[0]
      },
    },
    fzVon: {
      type: new GraphQLNonNull(date),
    },
    gesehenAm: {
      type: new GraphQLNonNull(date),
    },
    kommentar: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
})
