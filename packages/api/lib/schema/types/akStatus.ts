import { query } from '../mysql';
import { ak, date, person } from '.';
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';

export const _akStatus = new GraphQLObjectType({
  name: 'akStatus',
  fields: () => ({
    akPersonID: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    person: {
      type: new GraphQLNonNull(person),
      async resolve(parent) {
        const person = await query(`SELECT * FROM personen WHERE personID = ${parent.personID}`)
        return person[0]
      },
    },
    ak: {
      type: new GraphQLNonNull(ak),
      async resolve(parent) {
        const ak = await query(`SELECT * FROM ak WHERE akID = ${parent.akID}`)
        return ak[0]
      },
    },
    date: {
      type: new GraphQLNonNull(date),
    },
    neuerStatus: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  }),
})
