<template lang="pug">
  ec-wrapper(hasXBtn hasNav hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    router-view(:data="data" @reload="loadData")
    template(#dialogs)
      //- ec-fz-antrag(ref="fzAntrag" :data="data" @reload="loadData")
      formular-dialog(v-bind="fzAntragConfig" ref="fzAntrag")
      formular-dialog(v-bind="fzAddConfig" ref="addFZ")
      formular-dialog(v-bind="mergePersonConfig" ref="mergePerson")
      formular-selector(name="addMail" ref="addMail")
      formular-selector(name="addTelefon" ref="addTelefon")
      formular-selector(name="addAdresse" ref="addAdresse")
      formular-selector(name="personStamm" ref="editStamm")
     
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private get mergePersonConfig() {
    return this.$ecForm['personMerge'](this)
  }

  private get fzAntragConfig() {
    return this.$ecForm['generateFZAntrag'](this)
  }

  private get fzAddConfig() {
    return this.$ecForm['addFZ'](this)
  }
  

  public allePersonen = []

  private loadPersons() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!) {
          personen(authToken: $authToken) {
            personID,
            vorname,
            nachname,
            gebDat {
              german
              input
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    })
      .then((res) => {
        this.allePersonen = res.data.personen;
      })
      .catch((err: any) => {
        this.$dialog.error({
          text: err.message,
          title: 'Laden fehlgeschlagen!'
        });
      });
  }

  private get config() {
    return {
      sheet: [
        {
          icon: 'home',
          id: 'pers_add_adresse',
          label: 'Adresse hinzufügen',
          click: () => {
            const self = this;
            (this.$refs.addAdresse as any)
              .show()
              .then((data: {adresse: {strasse: string, plz: string, ort: string}}) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation(
                      $authToken: String!,
                      $personID: Int!,
                      $strasse: String!,
                      $plz: String!,
                      $ort: String!
                    ) {
                      addAdresse(
                        personID: $personID,
                        strasse: $strasse,
                        plz: $plz,
                        ort: $ort,
                        authToken: $authToken
                      )
                    }
                  `,
                  variables: {
                    ...data.adresse,
                    authToken: this.$authToken(),
                    personID: this.data.personID
                  }
                }).then((res: any) => {
                  this.$notifikation('Neue Adresse', `Adresse erfolgreich hinzugefügt`);
                  self.loadData();
                }).catch((err: any) => {
                  this.$dialog.error({
                    text: err.message,
                    title: 'Speichern fehlgeschlagen!'
                  });
                });
              })
              .catch(this.$empty);
          }
        },
        {
          icon: 'mail',
          id: 'pers_add_email',
          label: 'Email hinzufügen',
          click: () => {
            const self = this;
            (this.$refs.addMail as any)
              .show()
              .then((data: {email: string}) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation($authToken: String!, $personID: Int!, $email: String!) {
                      addEmail(personID: $personID, email: $email, authToken: $authToken)
                    }
                  `,
                  variables: {
                    email: data.email,
                    authToken: this.$authToken(),
                    personID: this.data.personID
                  }
                })
                  .then((res: any) => {
                    this.$notifikation('Neue Email', `Email erfolgreich hinzugefügt`);
                    self.loadData();
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(this.$empty);
          }
        },
        {
          icon: 'phone',
          id: 'pers_add_telefon',
          label: 'Telefon hinzufügen',
          click: () => {
            const self = this;
            (this.$refs.addTelefon as any)
              .show()
              .then((data: {telefon: string}) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation(
                      $authToken: String!,
                      $personID: Int!,
                      $telefon: String!
                    ) {
                      addTelefon(
                        personID: $personID,
                        telefon: $telefon,
                        authToken: $authToken
                      )
                    }
                  `,
                  variables: {
                    telefon: data.telefon,
                    authToken: this.$authToken(),
                    personID: this.data.personID
                  }
                })
                  .then((res: any) => {
                    this.$notifikation('Neue Telefonnummer', `Telefonnummer erfolgreich hinzugefügt`);
                    self.loadData();
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(this.$empty);
          }
        },
        {
          icon: 'call_merge',
          id: 'pers_merge',
          label: 'Person mergen',
          click: () => {
            const self = this;
            (this.$refs.mergePerson as any)
              .show()
                .then((res:{falsch:number})=>{
                  console.log(res)
                  this.$apolloClient.mutate({
                    mutation: gql`
                      mutation($authToken: String!, $richtig: Int!, $falsch: Int!) {
                        mergePersons(authToken: $authToken, personID_richtig: $richtig, personID_falsch: $falsch)
                      }
                    `,
                    variables: {falsch: res.falsch, authToken: this.$authToken(), richtig: this.$route.params.id}
                  })
                    .then(() => {
                      this.$notifikation('Personen gemergt', `Du hast erfolgreich die Personen zusammengeführt.`);
                      self.loadData();
                    })
                    .catch((err: any) => {
                      this.$dialog.error({
                        text: err.message,
                        title: 'Speichern fehlgeschlagen!'
                      });
                    });
                })
                .catch(this.$empty)
          }
        },
        {
          icon: 'assignment',
          id: 'pers_create_fz_antrag',
          label: 'FZ-Antrag generieren',
          click: () => {
            const self = this;

            const generate = (mail:string) => {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation(
                    $personID: Int!
                    $authToken: String!
                    $email: String!
                  ) {
                    addFZAntrag(
                      personID: $personID
                      authToken: $authToken
                      email: $email
                    )
                  }
                `,
                variables: {
                  authToken: this.$authToken(),
                  personID: this.$route.params.id,
                  email: mail
                }
              })
                .then(() => {
                  this.$notifikation(
                    'Erfolgreich Generiert',
                    `Du hast erfolgreich den Antrag generiert. An fz@ec-nordbund.de wurde eine Kopie gesendet!`
                  );
                  self.loadData();
                })
                .catch((err) => {
                  this.$dialog.error({
                    text: err.message,
                    title: 'Speichern fehlgeschlagen!'
                  });
                });
            }

            switch (this.data.emails.length) {
              case 0:
                alert('Du musste eine Mail erst eintragen!');
                break;
              case 1:
                generate(this.data.emails[0].eMail);
                break;
              default:
                (this.$refs.fzAntrag as any)
                  .show()
                  .then((data: {mail: string})=>generate(data.mail))
                  .catch(this.$empty)
                break;
            }
          }
        },
        {
          icon: 'assignment',
          id: 'pers_add_fz',
          label: 'FZ Eintragen',
          click: () => {
            const self = this;
            (this.$refs.addFZ as any)
              .show()
              .then((data:{gesehenVon:number, fzVon:string, gesehenAm: string, kommentrar: string})=>{
                this.$apolloClient.mutate({
                  mutation:  gql`
                    mutation(
                      $personID: Int!
                      $authToken: String!
                      $gesehenAm: String!
                      $gesehenVon: Int!
                      $kommentar: String!
                      $fzVon: String!
                    ) {
                      addFZ(
                        personID: $personID
                        authToken: $authToken
                        gesehenAm: $gesehenAm
                        gesehenVon: $gesehenVon
                        kommentar: $kommentar
                        fzVon: $fzVon
                      )
                    }
                  `,
                  variables: {...data,  personID: this.$route.params.id, authToken: this.$authToken()}
                }).then(() => {
                  this.$notifikation('Neues FZ eingetragen', `Du hast erfolgreich ein neues FZ eingetragen.`);
                  self.loadData();
                }).catch((err: any) => {
                  this.$dialog.error({
                    text: err.message,
                    title: 'Speichern fehlgeschlagen!'
                  });
                });
              })
              .catch(this.$empty)
          }
        },
        {
          icon: 'edit',
          id: 'pers_edit_stamm',
          label: 'Stammdaten editieren',
          click: () => {
            const self = this;
            (this.$refs.editStamm as any)
              .show({
                vorname: this.data.vorname,
                nachname: this.data.nachname,
                gebDat: this.data.gebDat.input,
                geschlecht: this.data.geschlecht
              })
              .then((data: {vorname: string, nachname: string, gebDat: string, geschlecht: string}) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation(
                      $vorname: String!,
                      $nachname: String!,
                      $gebDat: String!,
                      $geschlecht: String!,
                      $authToken: String!,
                      $personID: Int!
                    ) {
                      editPersonStamm(
                        vorname: $vorname,
                        nachname: $nachname,
                        gebDat: $gebDat,
                        geschlecht: $geschlecht,
                        authToken: $authToken,
                        personID: $personID
                      )
                    }
                  `,
                  variables: {
                    ...data,
                    personID: this.$route.params.id,
                    authToken: this.$authToken()
                  }
                })
                  .then((res: any) => {
                    this.$notifikation('Stammdaten editiert', `Du hast erfolgreich die Person editiert.`);
                    self.loadData();
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(this.$empty);
          }
        },
        {
          disabled: true,
          icon: 'local_offer',
          id: 'pers_edit_kategor',
          label: 'Kategorien editieren',
          click: () => {alert('Comming later...'); }
        },
        {
          icon: 'extension',
          id: 'pers_edit_sonstiges',
          label: 'Sonstiges editieren',
          click: () => {alert('Comming Soon...'); }
        },
        {
          disabled: true,
          icon: 'assignment',
          id: 'pers_report',
          label: 'Report erzeugen',
          click: () => {alert('Kommt nach Bedarf...'); }
        }
      ],
      nav: [
        {
          icon: 'home',
          label: 'Allgemein',
          to: 'home'
        },
        {
          icon: 'event',
          label: 'Veranstaltungen',
          to: 'veranstaltungen'
        },
        {
          icon: 'extension',
          label: 'Sonstiges',
          to: 'sonstiges'
        }
      ],
      title: `${this.data.vorname} ${this.data.nachname} (${this.data.gebDat.german})`,
      subTitle: 'Person'
    };
  }

  public data: any = {
    gebDat: {},
    adressen: [],
    telefone: [],
    emails: [],
    fzs: [],
    fzAntraege: [],
    ak: []
  };

  private loadData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!, $personID: Int!) {
          person(personID: $personID, authToken: $authToken) {
            personID
            vorname
            nachname
            gebDat {
              german
              input
            }
            geschlecht
            alter(wann: null)
            Notizen
            adressen {
              adressID
              strasse
              plz
              ort
              isOld
              lastUsed {
                german
              }
            }
            emails {
              eMailID
              eMail
              isOld
              lastUsed {
                german
              }
            }
            telefone {
              telefonID
              telefon
              isOld
              lastUsed {
                german
              }
            }
            anmeldungen {
              anmeldeID
              position
              veranstaltung {
                bezeichnung
                begin {
                  german
                }
                ende {
                  german
                }
              }
            }
            fzs {
              fzID
              gesehenAm {
                german
              }
              fzVon {
                german
              }
              kommentar
              gesehenVon {
                personID
                vorname
                nachname
                gebDat {
                  german
                }
              }
            }
            fzAntraege {
              fzAntragID
              erzeugt {
                german
              }
            }
            # datumDesLetztenFZ {
            #   german
            # }
            # hatFZ(wann: null)
            ecKreis {
              ecKreisID
              bezeichnung
              website
            }
            ecMitglied
            juleica {
              juleicanummer
              gueltig_bis {
                german
                input
              }
            }
            tags {
              tag {
                tagID
                bezeichnung
              }
              notiz
            }
            ak {
              ak {
                akID
                bezeichnung
              }
              currentStatus
              # allUpdates {
              #   akPersonID
              #   date {
              #     german
              #   }
              #   neuerStatus
              # }
            }
            erstellt {
              german
            }
            letzteAenderung {
              german
            }
          }
        }
      `,
      variables: {
        authToken: this.$authToken(),
        personID: this.$route.params.id
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.person;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private created() {
    this.loadData();
    this.loadPersons();
  }
}
</script>
