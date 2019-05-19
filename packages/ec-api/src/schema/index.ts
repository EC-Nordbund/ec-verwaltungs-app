import akMutationen from './mutationen/ak';
import anmeldeMutationen from './mutationen/anmeldungen';
import kontaktMutationen from './mutationen/kontakt';
import orgaMutationen from './mutationen/organisation';
import personMutationen from './mutationen/personen';
import serienBriefMutationen from './mutationen/serienbriefe';
import sortMutationen from './mutationen/sonstiges';
import userMutationen from './mutationen/users';
import veranstaltungenMutationen from './mutationen/veranstaltungen';
import vOrteMutationen from './mutationen/veranstaltungsOrte';
import akQuery from './querys/ak';
import anmeldungsQuery from './querys/anmeldungen';
import dubQuery from './querys/dublikate';
import ecKreis from './querys/ecKreis';
import orgaQuery from './querys/organisationen';
import personenQuery from './querys/personen';
import serienbriefQuery from './querys/serienbriefe';
import sonstigesQuery from './querys/sonstiges';
import usersQuery from './querys/users';
import veranstaltungenQuery from './querys/veranstaltungen';
import vOrteQuery from './querys/veranstaltungsorte';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'rootQuery',
    description: 'Hauptabfrage Objekt',
    fields: {
      ...ecKreis,
      ...dubQuery,
      ...serienbriefQuery,
      ...sonstigesQuery,
      ...personenQuery,
      ...veranstaltungenQuery,
      ...akQuery,
      ...anmeldungsQuery,
      ...usersQuery,
      ...vOrteQuery,
      ...orgaQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'mutationRoot',
    description: 'Mutationen Objekt',
    fields: {
      ...userMutationen,
      ...sortMutationen,
      ...kontaktMutationen,
      ...personMutationen,
      ...akMutationen,
      ...orgaMutationen,
      ...veranstaltungenMutationen,
      ...vOrteMutationen,
      ...anmeldeMutationen,
      ...serienBriefMutationen,
    },
  }),
})
