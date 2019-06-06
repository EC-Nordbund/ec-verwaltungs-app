import { user } from '../../users/user';
import { query } from '../mysql';
import {
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';

  import {
    date
    } from '.';

export const _juleica = new GraphQLObjectType({
  name: 'juleica',
  fields: () => ({
    juleicanummer: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gueltig_bis: {
      type: date,
    },
  }),
})
