import generator, { IField } from './genTypes';
import { gql } from 'apollo-server';
import * as fs from 'fs';

const types: Array<{
  name: string;
  fields: Array<IField>;
  firstIsID: boolean;
  hasQuery: boolean;
}> = [
  {
    name: "AK",
    hasQuery: true,
    firstIsID: false,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        edit: true,
        add: true
      },
      {
        name: "personen",
        type: "[PersonAK]"
      }
    ]
  },
  {
    name: "Person",
    hasQuery: true,
    firstIsID: false,
    fields: [
      {
        name: "vorname",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        add: true
      },
      {
        name: "nachname",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        add: true
      },
      {
        name: "gebDat",
        type: "_date",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        object: true,
        add: true
      },
      {
        name: "geschlecht",
        type: "_geschlecht",
        required: true,
        filter: true,
        sort: true,
        add: true
      },
      {
        name: "juLeiCaNr",
        type: "String",
        filter: true,
        sort: true
      },
      {
        name: "aks",
        type: "[PersonAK]"
      },
      {
        name: "aktuelleAdresse",
        type: "Adresse"
      },
      {
        name: "adressen",
        type: "[PersonAdresse]"
      },
      {
        name: "aktuelleEmail",
        type: "Email"
      },
      {
        name: "emails",
        type: "[PersonEmail]"
      },
      {
        name: "fzs",
        type: "[FZ]"
      },
      {
        name: "aktuellesFZ",
        type: "FZ"
      },
      {
        name:"anmeldungen",
        type: "[Anmeldung]"
      },
      {
        name: "letzterFZAntrag",
        type: "_date",
        edit: true,
        object: true
      },
      {
        name: "ecKreis",
        type: "ECKreis",
        edit: true,
        object: true
      },
      {
        name: "ECMitgliedsStatus",
        type: "ecStatus",
        edit: true
      },
      {
        name: "kategorien",
        type: "[Kategorie]"
      }
    ]
  },
  {
    hasQuery: false,
    name: "Kategorie",
    firstIsID: true,
    fields: [
      {
        name: "label",
        type: "String",
        required: true,
        add: true
      },
      {
        name: "personen",
        type: "[Person]"
      }
    ]
  },
  {
    hasQuery: false,
    name: "PersonAK",
    firstIsID: false,
    fields: [
      {
        name: "Person",
        type: "Person",
        required: true,
        object: true
      },
      {
        name: "AK",
        type: "AK",
        required: true,
        object: true
      },
      {
        name: "currentStatus",
        type: "AKUpdate",
        required: true
      },
      {
        name: "updates",
        type: "[AKUpdate]",
        required: true
      }
    ]
  },
  {
    name: "AKUpdate",
    hasQuery: false,
    firstIsID: false,
    fields: [
      {
        name: "status",
        type: "AKStatus",
        required: true
      },
      {
        name: "date",
        type: "_date",
        required: true
      }
    ]
  },
  {
    name: "Adresse",
    firstIsID: false,
    hasQuery: true,
    fields: [
      {
        name: "strasse",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        add: true
      },
      {
        name: "plz",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        add: true
      },
      {
        name: "ort",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        edit: true,
        add: true
      },
      {
        name: "land",
        type: "String",
        required: false,
        filter: true,
        sort: true,
        edit: true,
        add: true
      }
    ]
  },
  {
    name: "PersonAdresse",
    firstIsID: false,
    hasQuery: false,
    fields: [
      {
        name: "adresse",
        type: "Adresse",
        required: true
      },
      {
        name: "veraltet",
        type: "Boolean",
        required: true,
        edit: true
      },
      {
        name: "letzteNutzung",
        type: "_date",
        required: true,
        edit: true,
        object: true
      }
    ]
  },
  {
    name: "Email",
    firstIsID: true,
    hasQuery: false,
    fields: [
      {
        name: "email",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        add: true
      }
    ]
  },
  {
    name: "PersonEmail",
    firstIsID: false,
    hasQuery: false,
    fields: [
      {
        name: "email",
        type: "Email",
        required: true
      },
      {
        name: "veraltet",
        type: "Boolean",
        required: true,
        edit: true
      },
      {
        name: "letzteNutzung",
        type: "_date",
        required: true,
        edit: true,
        object: true
      }
    ]
  },
  {
    name: "Telefon",
    firstIsID: false,
    hasQuery: true,
    fields: [
      {
        name: "telefon",
        type: "String",
        required: true,
        filter: true,
        sort: true,
        add: true
      }
    ]
  },
  {
    name: "PersonTelefon",
    firstIsID: false,
    hasQuery: false,
    fields: [
      {
        name: "telefon",
        type: "Telefon",
        required: true
      },
      {
        name: "veraltet",
        type: "Boolean",
        required: true,
        edit: true
      },
      {
        name: "letzteNutzung",
        type: "_date",
        required: true,
        edit: true,
        object: true
      }
    ]
  },
  {
    name: "ECKreis",
    hasQuery: true,
    firstIsID: false,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        edit: true,
        add: true
      },
      {
        name: "adresse",
        type: "Adresse",
        required: true,
        edit: true,
        object: true,
        add: true
      },
      {
        name: "website",
        type: "String",
        required: true,
        edit: true,
        add: true
      },
      {
        name: "personen",
        type: "[Person]"
      }
    ]
  },
  {
    name: "FZ",
    firstIsID: false,
    hasQuery: false,
    fields: [
      {
        name: "gesehenAm",
        type: "_date",
        object: true,
        required: true
      },
      {
        name: "gesehenVon",
        type: "Person",
        object: true,
        required: true
      }
    ]
  },
  {
    name: "Organisation",
    firstIsID: false,
    hasQuery: true,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        add: true,
        edit: true
      },
      {
        name: "anschrift",
        type: "Adresse",
        object: true,
        required: true,
        filter: true,
        add: true,
        edit: true
      },
      {
        name: "telefon",
        type: "[Telefon]"
      },
      {
        name: "email",
        type: "[Email]"
      },
      {
        name: "veranstaltungsorte",
        type: "[Veranstaltungsort]"
      },
      {
        name: "veranstaltungen",
        type: "[Veranstaltung]"
      }
    ]
  },
  {
    name: "Veranstaltungsort",
    hasQuery: true,
    firstIsID: false,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        add: true,
        edit: true
      },
      {
        name: "organisation",
        type: "Organisation",
        required: true,
        object: true,
        add: true,
        edit: true
      },
      {
        name: "anschrift",
        type: "Adresse",
        object: true,
        required: true,
        filter: true,
        add: true,
        edit: true
      },
      {
        name: "telefon",
        type: "[Telefon]"
      },
      {
        name: "email",
        type: "[Email]"
      },
      {
        name: "veranstaltungen",
        type: "[Veranstaltung]"
      }
    ]
  },
  {
    name: "Veranstaltung",
    firstIsID: false,
    hasQuery: true,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        edit: true,
        add: true
      },
      {
        name:"begin",
        type:"_date",
        object:true,
        required:true,
        sort: true,
        filter: true,
        edit:true,
        add:true
      },
      {
        name:"ende",
        type:"_date",
        object:true,
        required:true,
        sort: true,
        filter: true,
        edit:true,
        add:true
      }
    ]
  },
  {
    name: "Anmeldung",
    firstIsID: true,
    hasQuery: true,
    fields: [
      {
        name: "anmeldeID",
        type: "ID",
        required: true,
        sort: true,
        filter: true,
        edit: true
      },
      {
        name: "veranstaltung",
        type: "Veranstaltung",
        object: true,
        add: true,
        edit: true
      },
      {
        name: "person",
        type: "Person",
        object: true,
        add: true
      },
      {
        name: "role",
        type: "Role",
        object: true,
        add: true
      },
      {
        name: "finanzTrasaktionen",
        type: "[FinanzTransaktion]"
      },
      {
        name: "anmeldeStatus",
        type: "Int",
        required: true,
        add: true,
        edit: true
      }
    ]
  },
  {
    name: "FinanzTransaktion",
    hasQuery: false,
    firstIsID: false,
    fields: [
      {
        name: "betrag",
        type: "Int",
        required: true,
        sort: true,
        add: true
      },
      {
        name: "entryAt",
        type: "_date",
        object: true,
        required: true,
        sort: true,
        add: true
      }
    ]
  },
  {
    name: "Role",
    firstIsID: false,
    hasQuery: true,
    fields: [
      {
        name: "bezeichnung",
        type: "String",
        required: true,
        sort: true,
        filter: true,
        edit: true,
        add: true
      },
      {
        name: "anmeldungen",
        type: "[Anmeldung]"
      }
    ]
  }
];

const data = types.map(v =>
  generator(v.name, v.fields, v.firstIsID, v.hasQuery)
);

const i = data.map(v => v.general).join("\n");
const q = data.map(v => v.query).join("\n");
const m = data.map(v => v.mutation).join("\n");

const type = `
  input _pageInation {
    numberPerPage: Int!
    pageNumber: Int!
  }
  type _time {
    tag: Int!
    monat: Int!
    jahr: Int!
    h: Int!
    min: Int!
    s: Int!
    german: String!
    input: String!
  }
  type _date {
    tag: Int!
    monat: Int!
    jahr: Int!
    german: String!
    input: String!
  }
  input _date_i {
    tag: Int!
    monat: Int!
    jahr: Int!
  }
  input _date_id {
    tag: Int!
    monat: Int!
    jahr: Int!
  }
  enum AKStatus {
    AUSGETRETEN
    MITGLIED
    VERTRETER
    LEITER
  }
  enum ecStatus {
    KEIN_MITGLIED
    MITGLIED
    FOERDERER
  }
  enum ROLLE {
    TEILNEHMER
    MITARBEITER
    KUECHENHELFER
    KUECHENLEITER
    LEITER
    HAUPTLEITER
  }
  enum _geschlecht {
    MAENLICH
    WEIBLICH
  }
  type User {
    userID: ID!
    username: String!
    person: Person!
    salt: String!
    pwdHash: String!
    userGroup: uGroup!
    gueltigBis: _date!
  }
  enum uGroup {
    NONE
    ADMIN
    SUPERADMIN
  }
  ${i}
  type Query {
    ${q}
    users:[User]
    user(userID:ID!):User
  }
  type Mutation {
    ${m}
    login(username:String!, password: String!):User
    logOut:Boolean!
    User_changePWD(oldPWD: String!, newPWD: String!):Boolean!
    User_add(username:String!,person:Person_id!,userGroup:uGroup!,gueltigBis:_date_i):User
    User_edit(userID:ID!, userGroup: uGroup!, gueltigBis: _date_i!):User
  }
`;

const _type = type
  .split("\n")
  .filter(v => v !== "")
  .filter(v => v !== "  ")
  .filter(v => v !== "    ")
  .join("\n");

// DEBUG
console.log(_type);
fs.writeFileSync("./schema.gql", _type);
export const typeDefs = gql(_type);
