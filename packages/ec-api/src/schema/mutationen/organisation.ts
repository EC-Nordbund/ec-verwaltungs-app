import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
  } from 'graphql';


export default {
  addOrganisation: {
    type: GraphQLBoolean,
    args: addAuth({
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO organisationen (bezeichnung) VALUES ('${args.bezeichnung}')`)
    }, 'organisation'),
  },
  editOrganisation: {
    type: GraphQLBoolean,
    args: addAuth({
      organisationsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      bezeichnung: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ansprechpartner: {
        type: GraphQLString,
      },
      strasse: {
        type: GraphQLString,
      },
      plz: {
        type: GraphQLString,
      },
      ort: {
        type: GraphQLString,
      },
      land: {
        type: GraphQLString,
      },
      telefon: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      notizen: {
        type: GraphQLString,
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE organisationen SET bezeichnung="${args.bezeichnung}",ansprechpartner="${args.ansprechpartner}",strasse="${args.strasse}",plz="${args.plz}",ort="${args.plz}",land="${
          args.land
        }",telefon="${args.telefon}",email="${args.email}",notizen="${args.notizen}" WHERE organisationsID = ${args.organisationsID}`,
      )
    }, 'organisation'),
  },
}
