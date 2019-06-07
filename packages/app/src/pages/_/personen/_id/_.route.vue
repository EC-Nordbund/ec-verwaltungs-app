<template lang="pug">
  ec-wrapper(hasXBtn hasNav hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    router-view(:data="data" @reload="loadData")
    template(#dialogs)
      ec-fz-antrag(ref="fzAntrag" :data="data" @reload="loadData")
      ec-fz(ref="fz" @reload="loadData")
      ec-person-merge(ref="mergePerson" @reload="loadData")
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

  private get config() {
    return {
      sheet: [
        {
          icon: 'home',
          id: 'pers_add_adresse',
          label: 'Adresse hinzufügen',
          click: () => {
            let self = this;
            (this.$refs.addAdresse as any)
              .show()
              .then((data:{adresse:{strasse:string,plz:string,ort:string}})=>{
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
              .catch(()=>{})
          }
        },
        {
          icon: 'mail',
          id: 'pers_add_email',
          label: 'Email hinzufügen',
          click: () => {
            let self = this;
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
                    self.loadData()
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(()=>{})
          }
        },
        {
          icon: 'phone',
          id: 'pers_add_telefon',
          label: 'Telefon hinzufügen',
          click: () => {
            let self = this;
            (this.$refs.addTel as any)
              .show()
              .then((data: {telefon: string})=>{
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
                    self.loadData()
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(()=>{}) 
          }
        },
        {
          icon: 'call_merge',
          id: 'pers_merge',
          label: 'Person mergen',
          click: () => {(this.$refs.mergePerson as any).show(this.$route.params.id); }
        },
        {
          icon: 'assignment',
          id: 'pers_create_fz_antrag',
          label: 'FZ-Antrag generieren',
          click: () => {(this.$refs.fzAntrag as any).show(); }
        },
        {
          icon: 'assignment',
          id: 'pers_add_fz',
          label: 'FZ Eintragen',
          click: () => {(this.$refs.fz as any).show(); }
        },
        {
          icon: 'edit',
          id: 'pers_edit_stamm',
          label: 'Stammdaten editieren',
          click: () => {
            let self = this;
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
                    self.loadData()
                  })
                  .catch((err: any) => {
                    this.$dialog.error({
                      text: err.message,
                      title: 'Speichern fehlgeschlagen!'
                    });
                  });
              })
              .catch(()=>{})
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
  }
}
</script>
