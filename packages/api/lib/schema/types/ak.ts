import { user } from '../../users/user';
import { query } from '../mysql';
import { personAK } from '.';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

export const _ak = new GraphQLObjectType({
  name: 'ak',
  fields: () => ({
    akID: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    bezeichnung: {
      type: new GraphQLNonNull(GraphQLString),
    },
    personen: {
      type: new GraphQLList(personAK),
      async resolve(parent, _, context: { user: user }) {
        if (
          context.user.checkAlowedFileds({
            table: 'personen',
            field: 'ak',
          })
        ) {
          const persons = await query(`SELECT personID FROM akPerson WHERE akID = ${parent.akID} GROUP BY personID`)
          return persons.map(person => ({
            personID: person.personID,
            akID: parent.akID,
          }))
        } else {
          return []
        }
      },
    },
  }),
})
