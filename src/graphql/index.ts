import gql from 'graphql-tag'

export const query = {
  personen: {
    liste: {
      load: gql`
        query($authToken: String!) {
          personen(authToken: $authToken) {
            personID
            vorname
            nachname
            gebDat {
              german
            }
            geschlecht
          }
        }
      `
    },
    details: {
      editTelefon: gql`
        mutation(
          $personID: Int!
          $telefon: String!
          $authToken: String!
          $telefonID: Int!
        ) {
          editTelefon(
            telefonID: $telefonID
            personID: $personID
            telefon: $telefon
            authToken: $authToken
          )
        }
      `,
      editAdresse: gql`
        mutation(
          $personID: Int!
          $strasse: String!
          $plz: String!
          $ort: String!
          $authToken: String!
          $adressID: Int!
        ) {
          editAdresse(
            adressID: $adressID
            personID: $personID
            strasse: $strasse
            plz: $plz
            ort: $ort
            authToken: $authToken
          )
        }
      `,
      addEmail: gql`
        mutation(
          $personID: Int!
          $email: String!
          $authToken: String!
        ) {
          addEmail(
            personID: $personID
            email: $email
            authToken: $authToken
          )
        }
      `,
      addTelefon: gql`
        mutation(
          $personID: Int!
          $telefon: String!
          $authToken: String!
        ) {
          addTelefon(
            personID: $personID
            telefon: $telefon
            authToken: $authToken
          )
        }
      `,
      addAdresse: gql`
        mutation(
          $personID: Int!
          $strasse: String!
          $plz: String!
          $ort: String!
          $authToken: String!
        ) {
          addAdresse(
            personID: $personID
            strasse: $strasse
            plz: $plz
            ort: $ort
            authToken: $authToken
          )
        }
      `,
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
      `,
      load: gql`
        query($authToken: String!, $personID: Int!) {
          person(
            authToken: $authToken
            personID: $personID
          ) {
            personID
            vorname
            nachname
            gebDat {
              german
              input
            }
            alter
            geschlecht
            juLeiCaNr
            adressen {
              adressID
              strasse
              plz
              ort
            }
            emails {
              emailID
              email
            }
            telefone {
              telefonID
              telefon
            }
            anmeldungen {
              anmeldeID
              veranstaltung {
                veranstaltungsID
                bezeichnung
                begin {
                  german
                  input
                }
                ende {
                  german
                  input
                }
              }
              position
            }
            fzs {
              fzID
              gesehenAm {
                german
                input
              }
              gesehenVon {
                personID
                vorname
                nachname
              }
              kommentar
            }
            aks {
              personAKID
              eintritt {
                german
                input
              }
              austritt {
                german
                input
              }
              leiter
              ak {
                akID
                bezeichnung
              }
            }
            verteiler {
              verteilerPersonenID
              type
              verteiler {
                verteilerID
                bezeichnung
                isAuto
              }
            }
          }
        }
      `,
      auskunft: gql`
        query($authToken: String!, $personID: Int!) {
          person(
            authToken: $authToken
            personID: $personID
          ) {
            vorname
            nachname
            gebDat {
              german
            }
            alter
            geschlecht
            juLeiCaNr
            adressen {
              strasse
              plz
              ort
              letzteAenderung {
                german
              }
              erstellt {
                german
              }
            }
            emails {
              email
              letzteAenderung {
                german
              }
              erstellt {
                german
              }
            }
            telefone {
              telefon
              letzteAenderung {
                german
              }
              erstellt {
                german
              }
            }
            anmeldungen {
              veranstaltung {
                bezeichnung
                begin {
                  german
                }
                ende {
                  german
                }
              }
              position
              #letzteAenderung {
              #  german
              #}
              #erstellt {
              #  german
              #}
            }
            fzs {
              gesehenAm {
                german
              }
              gesehenVon {
                vorname
                nachname
              }
              kommentar
              #letzteAenderung {
              #  german
              #}
              #erstellt {
              #  german
              #}
            }
            aks {
              eintritt {
                german
              }
              austritt {
                german
              }
              leiter
              ak {
                bezeichnung
              }
              letzteAenderung {
                german
              }
              erstellt {
                german
              }
            }
            verteiler {
              type
              verteiler {
                bezeichnung
                isAuto
              }
              #letzteAenderung {
              #  german
              #}
              #erstellt {
              #  german
              #}
            }
          }
        }
      `,
      editEmail: gql`
        mutation(
          $personID: Int!
          $email: String!
          $authToken: String!
          $emailID: Int!
        ) {
          editEmail(
            emailID: $emailID
            personID: $personID
            email: $email
            authToken: $authToken
          )
        }
      `
    }
  }
}
