import { versions } from '../../nichtErlaubteVersionen';
import {
  addUser,
  changePWD,
  deleteUser,
  getUser,
  login,
  logout,
  updateUser,
  userReactivation
  } from '../../users';
import mail from '../mail';
import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString
  } from 'graphql';

export default {
  logOut: {
    type: new GraphQLNonNull(GraphQLBoolean),
    description: 'Abmelden',
    args: addAuth(),
    resolve(_, args) {
      return logout(args.authToken)
    },
  },
  logIn: {
    type: new GraphQLNonNull(GraphQLString),
    description: 'Anmelden',
    args: {
      username: {
        description: 'Benutzername',
        type: new GraphQLNonNull(GraphQLString),
      },
      password: {
        description: 'Passwort',
        type: new GraphQLNonNull(GraphQLString),
      },
      version: {
        description: 'Version der APP',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(_, args) {
      if (versions.includes(args.version)) {
        throw 'Version nicht erlaubt'
      }
      return login(args.username, args.password)
    },
  },
  addUser: {
    type: GraphQLBoolean,
    description: 'Benutzer hinzufügen',
    args: addAuth({
      username: {
        description: 'Benutzername',
        type: new GraphQLNonNull(GraphQLString),
      },
      email: {
        description: 'E-Mail an die das Passwort gesendet wird',
        type: new GraphQLNonNull(GraphQLString),
      },
      personID: {
        description: 'Person die dem User zugeordnet wird',
        type: new GraphQLNonNull(GraphQLInt),
      },
      userGroupID: {
        description: 'ID der Benutzergruppe (Rechte).',
        type: new GraphQLNonNull(GraphQLInt),
      },
      ablaufDatum: {
        description: 'Zeitpunkt an dem der User ungültig wird',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return addUser(args.personID, args.username, args.email, args.ablaufDatum, args.userGroupID)
    }, 'editUser'),
  },
  editUser: {
    type: GraphQLBoolean,
    description: 'Benutzer editieren',
    args: addAuth({
      userID: {
        description: 'Welcher Benutzer soll editiert werden',
        type: new GraphQLNonNull(GraphQLInt),
      },
      userGroupID: {
        description: 'ID der neuen Benutzergruppe',
        type: new GraphQLNonNull(GraphQLInt),
      },
      ablaufDatum: {
        description: 'Von Zeitpunkt an dem der User ungültig wird',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return updateUser(args.userID, args.ablaufDatum, args.userGroupID)
    }, 'editUser'),
  },
  deleteUser: {
    type: GraphQLBoolean,
    description: 'Benutzer löschen',
    args: addAuth({
      userID: {
        description: 'ID des Benutzer',
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return deleteUser(args.userID)
    }, 'editUser'),
  },
  passwordWechseln: {
    type: GraphQLBoolean,
    description: 'Passwort wechseln',
    args: addAuth({
      oldPWD: {
        description: 'Altes Passwort',
        type: new GraphQLNonNull(GraphQLString),
      },
      newPWD: {
        description: 'Neues Passwort',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve(_, args) {
      return changePWD(getUser(args.authToken).userID, args.oldPWD, args.newPWD)
    },
  },
  acceptsDSE: {
    type: GraphQLBoolean,
    description: 'Datenschutzhinweise akzeptieren',
    args: addAuth(),
    async resolve(_, args) {
      const dse = await query(`SELECT * FROM dse WHERE guelitgAb < CURRENT_TIMESTAMP ORDER BY guelitgAb DESC LIMIT 1`).then(v => v[0])

      await query(`INSERT INTO DSGVO_Person (personID, dseID) VALUES (${getUser(args.authToken).userID}, ${dse.DSEID});`)

      return true
    },
  },
  addDSE: {
    type: GraphQLBoolean,
    description: 'Neue Datenschutz',
    args: addAuth({
      text: {
        description: 'HTML der Datenschutzhinweise',
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`INSERT INTO dse (text) VALUES ("${args.text}")`).then(v => true)
    }, 'editDSE'),
  },
  feedback: {
    type: GraphQLBoolean,
    description: 'Comming Soon...',
    args: {
      gesamt: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      handhabung: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLInt),
      },
      funktionswunsch: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      bug: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
      sonstiges: {
        description: 'Comming Soon...',
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    resolve(_, args) {
      return mail(
        'feedback@ec-nordbund.de',
        { to: 'app@ec-nordbund.de' },
        'Feedback',
        `Gesamtbewertung: ${args.gesamt}/5<br/>
          Handhabung: ${args.handhabung}/5<br/>
          Funktionswunsch: ${args.funktionswunsch}<br/>
          Bug: ${args.bug}<br/>
          Sonstiges: ${args.sonstiges}`,
      )
    },
  },
  reActivate: {
    type: GraphQLBoolean,
    args: {
      authToken: {
        type: new GraphQLNonNull(GraphQLString)
      },
      pin: {
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve(_, args) {
      return userReactivation(args.authToken, args.pin)      
    },
  },
}
