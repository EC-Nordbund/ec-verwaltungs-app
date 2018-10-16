import gql from 'graphql-tag'

export const query = {
  anmeldungen: {
    details: {
      load: gql`
        query($authToken: String!, $anmeldeID: String!) {
          anmeldung(
            authToken: $authToken
            anmeldeID: $anmeldeID
          ) {
            anmeldeID
            person {
              vorname
              nachname
              gebDat {
                german
              }
              geschlecht
            }
            veranstaltung {
              bezeichnung
              begin {
                input
                german
                year
              }
              ende {
                input
                german
              }
            }
            position
            adresse {
              adressID
              strasse
              plz
              ort
            }
            email {
              emailID
              email
            }
            telefon {
              telefonID
              telefon
            }
            wartelistenPlatz
            bisherBezahlt
            anmeldeZeitpunkt {
              german
            }
            abmeldeZeitpunkt {
              german
            }
            abmeldeGebuehr
            wegDerAbmeldung
            rueckbezahlt
            kommentarAbmeldung
            vegetarisch
            lebensmittelAllergien
            gesundheitsinformationen
            bemerkungen
            radfahren
            fahrgemeinschaften
            klettern
            sichEntfernen
            bootFahren
            schwimmen
            DSGVO_einverstaendnis {
              german
            }
          }
        }
      `
    },
    liste: {
      load: gql`
        query($authToken: String!) {
          anmeldungen(authToken: $authToken) {
            anmeldeID
            person {
              vorname
              nachname
              gebDat {
                german
              }
              geschlecht
            }
            veranstaltung {
              bezeichnung
              begin {
                input
                german
              }
              ende {
                input
                german
              }
            }
            position
            anmeldeZeitpunkt {
              german
            }
          }
        }
      `
    }
  },
  veranstaltungen: {
    liste: {
      load: gql`
        query($authToken: String!) {
          veranstaltungen(authToken: $authToken) {
            veranstaltungsID
            bezeichnung
            begin {
              german
            }
            ende {
              german
            }
          }
        }
      `
    },
    details: {
      load: gql`
        query(
          $authToken: String!
          $veranstaltungsID: Int!
        ) {
          veranstaltung(
            veranstaltungsID: $veranstaltungsID
            authToken: $authToken
          ) {
            veranstaltungsID
            bezeichnung
            begin {
              input
              german
            }
            ende {
              input
              german
            }
            anmeldungen {
              anmeldeID
              person {
                personID
                vorname
                nachname
                gebDat {
                  german
                }
                geschlecht
              }
              position
            }
            minTNAlter
            maxTNAlter
            maxTNAnzahl
            maxWeiblichTNAnzahl
            maxMaennlichTNAnzahl
            preisFruehbucher
            preisNormal
            preisLastMinute
            anzahlungFruehbucher
            anzahlungNormal
            anzahlungLastMinute
            preisFruehbucherBis {
              german
              input
            }
            preisLastMinuteAb {
              german
              input
            }
            kannVorortBezahltWerden
            hatGWarteliste
          }
        }
      `
    }
  },
  personen: {
    details: {
      addAK: gql`
        mutation(
          $akID: Int!
          $personID: Int!
          $eintritt: String!
          $leiter: Boolean!
          $authToken: String!
        ) {
          addAKPerson(
            authToken: $authToken
            akID: $akID
            personID: $personID
            eintritt: $eintritt
            leiter: $leiter
          )
        }
      `,
      editAK: gql`
        mutation(
          $akID: Int!
          $personAKID: Int!
          $personID: Int!
          $eintritt: String!
          $austritt: String
          $leiter: Boolean!
          $authToken: String!
        ) {
          editAKPerson(
            authToken: $authToken
            akID: $akID
            personAKID: $personAKID
            personID: $personID
            eintritt: $eintritt
            austritt: $austritt
            leiter: $leiter
          )
        }
      `,
      deleteVerteiler: gql`
        mutation(
          $authToken: String!
          $verteilerPersonID: Int!
        ) {
          deleteVerteilerPerson(
            authToken: $authToken
            verteilerPersonID: $verteilerPersonID
          )
        }
      `,
      addVerteiler: gql`
        mutation(
          $authToken: String!
          $bezeichnung: String!
        ) {
          addVerteiler(
            authToken: $authToken
            autoSql: ""
            bezeichnung: $bezeichnung
          )
        }
      `,
      editVerteiler: gql`
        mutation(
          $verteilerID: Int!
          $authToken: String!
          $personID: Int!
          $type: Int!
          $verteilerPersonID: Int!
        ) {
          editVerteilerPerson(
            verteilerPersonID: $verteilerPersonID
            personID: $personID
            verteilerID: $verteilerID
            type: $type
            authToken: $authToken
          )
        }
      `
    }
  }
}
