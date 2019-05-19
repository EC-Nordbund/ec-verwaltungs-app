import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import { GraphQLBoolean, GraphQLNonNull, GraphQLString } from 'graphql';

export default {
  addAlert: {
    type: GraphQLBoolean,
    description: 'Meldung in Dashboard hinzufügen',
    args: addAuth({
      msg: {
        description: 'Nachricht die angezeigt werden soll',
        type: new GraphQLNonNull(GraphQLString),
      },
      von: {
        description: 'Autor der Nachricht',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO alertWidget (content, von) VALUES ('${args.msg}', '${args.von}');`)
        .then(v => true)
        .catch(err => {
          throw err
        })
    }, 'addAlert'),
  },
}
