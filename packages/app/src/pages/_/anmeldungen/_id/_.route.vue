<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasReload hasRouterView v-bind="config" @getData="getData")
    router-view(:data="data" @reload="$emit('reload')")
    template(#dialogs)
      formular-selector(name="abmelden" ref="abmelden")
      formular-selector(name="editBemerkungen" ref="editBemerkungen")
      ec-anmeldung-kontakt(:data="data" ref="formKontakt" @reload="$emit('reload')")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

import { genReport, existsReport } from '@/report';

@Component({})
export default class EcRootIndexAnmeldungenIdIndex extends Vue {
  public static meta = {};

  private data: any = {
    person: {gebDat: {}},
    veranstaltung: {begin: {}, ende: {}},
    adresse: {},
    email: {},
    telefon: {},
    anmeldeZeitpunkt: {},
    DSGVO_einverstaendnis: {}
  };
  private best = false;
  private info = false;

  private get config() {
    return {
      sheet: [
        {
          id: 'anmel_rep_bestbrief',
          icon: 'markunread_mailbox',
          label: 'Bestätigungsbrief generieren und Drucken',
          disabled: !this.best || this.data.abmeldeZeitpunkt !== null || this.data.wartelistenPlatz !== 0,
          click: () => {
            if (this.data.bestaetigungsBrief !== null) {
              if (
                !confirm(`Brief wurde ${
                  this.data.bestaetigungsBrief.german
                } bereits generiert. Erneut generieren?`)
              ) {
                return;
              }
            }
            genReport(
              `best-brief-${this.data.veranstaltung.veranstaltungsID}`,
              this.data,
              `bestaetigungsbrief-${this.$route.params.id}.docx`
            ).then((r) => {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation($anmeldeID: String!, $authToken: String!) {
                    anmeldungBestaetigungsbrief(anmeldeID: $anmeldeID, authToken: $authToken)
                  }
                `,
                variables: {
                  authToken: this.$authToken(),
                  anmeldeID: this.$route.params.id
                }
              });
            });
          }
        },
        {
          id: 'anmel_rep_infobrief',
          icon: 'markunread_mailbox',
          label: 'Infobrief generieren und Drucken',
          disabled: !this.info || this.data.abmeldeZeitpunkt !== null || this.data.wartelistenPlatz !== 0,
          click: () => {
            if (this.data.infoBrief !== null) {
              if (!confirm(`Brief wurde ${this.data.infoBrief.german} bereits generiert. Erneut generieren?`)) {
                return;
              }
            }
            genReport(
              `info-brief-${this.data.veranstaltung.veranstaltungsID}`,
              this.data,
              `infobrief-${this.$route.params.id}.docx`
            ).then((r) => {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation($anmeldeID: String!, $authToken: String!) {
                    anmeldunginfobrief(anmeldeID: $anmeldeID, authToken: $authToken)
                  }
                `,
                variables: {
                  authToken: this.$authToken(),
                  anmeldeID: this.$route.params.id
                }
              });
            });
          }
        },
        {
          id: 'anmel_abmelden',
          icon: 'person_add_disabled',
          label: 'Person abmelden',
          disabled: this.data.wartelistenPlatz === -1,
          click: () => {
            const self = this;
            (this.$refs.abmelden as any)
              .show()
              .then((data: {weg: string, kommentar: string, gebuehr: string}) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation(
                      $anmeldeID: String!,
                      $weg: String!,
                      $gebuehr: Int!,
                      $kommentar: String!,
                      $authToken: String!
                    ) {
                      abmelden(
                        anmeldeID: $anmeldeID,
                        weg: $weg,
                        gebuehr: $gebuehr,
                        kommentar: $kommentar,
                        authToken: $authToken
                      )
                    }
                  `,
                  variables: {
                    ...data,
                    anmeldeID: this.$route.params.id,
                    authToken: this.$authToken()
                  }
                }).then(() => {
                  this.$notifikation('Erfolgreich Abgemeldet', `Du hast erfolgreich die Person abgemeldet.`);
                  self.getData();
                }).catch((err) => {
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
          id: 'anmel_bemerkungenEdit',
          icon: 'edit',
          label: 'Bemerkungen editieren',
          click: () => {
            const self = this;
            (this.$refs.editBemerkungen as any)
              .show()
              .then((data: any) => {
                this.$apolloClient.mutate({
                  mutation: gql`
                    mutation(
                      $authToken: String!
                      $anmeldeID: String!
                      $vegetarisch: Boolean!
                      $gesundheitsinformationen: String!
                      $bemerkungen: String!
                      $lebensmittelAllergien: String!
                    ) {
                      anmeldungBesonderheiten(
                        authToken: $authToken
                        anmeldeID: $anmeldeID
                        vegetarisch: $vegetarisch
                        gesundheitsinformationen: $gesundheitsinformationen
                        bemerkungen: $bemerkungen
                        lebensmittelAllergien: $lebensmittelAllergien
                      )
                    }
                  `,
                  variables: {...data,  anmeldeID: this.$route.params.id, authToken: this.$authToken()}
                })
                  .then(() => {
                    this.$notifikation('Bemerkungen editieren', `Du hast erfolgreich die Bemerkungen geändert.`);
                    self.getData();
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
          id: 'anmel_kontakt',
          icon: 'contact_mail',
          label: 'Kontaktdaten editieren',
          click: () => {
            (this.$refs.formKontakt as any).show();
          }
        },
        {
          id: 'anmel_nachrücken',
          icon: 'transfer_within_a_station',
          label: 'Nachrücken lassen',
          disabled: this.data.wartelistenPlatz <= 0,
          click: () => {
            if (
              confirm(
                'Sicher, dass die Person Nachrücken soll?\n\n Die Person hat also bestätigt, dass sie Nachrücken kann.'
              )
            ) {
              this.$apolloClient.mutate({
                mutation: gql`
                  mutation(
                    $anmeldeID: String!
                    $authToken: String!
                  ) {
                    nachruecken(
                      anmeldeID: $anmeldeID
                      authToken: $authToken
                    )
                  }
                `,
                variables: {
                  anmeldeID: this.$route.params.id,
                  authToken: this.$authToken()
                }
              });
            }
          }
        }
      ],
      nav: [
        {
          icon: 'home',
          label: 'Allgemein',
          to: `/anmeldungen/${this.$route.params.id}/home`
        },
        {
          icon: 'euro_symbol',
          label: 'Finanzen',
          to: `/anmeldungen/${this.$route.params.id}/finanzen`
        },
        {
          icon: 'extension',
          label: 'Sonstiges',
          to: `/anmeldungen/${this.$route.params.id}/sonstiges`
        }
      ],
      title: `${
        (this.data.person || {}).vorname
      } ${
        (this.data.person || {}).nachname
      } - ${
        (this.data.veranstaltung || {}).bezeichnung
      }`,
      subTitle: 'Anmeldung'
    };
  }

  private getData() {
    this.$apolloClient.query({
      query: gql`
        query($authToken: String!, $anmeldeID: String!) {
          anmeldung(
            authToken: $authToken
            anmeldeID: $anmeldeID
          ) {
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
            veranstaltung {
              veranstaltungsID
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
              eMailID
              eMail
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
            bestaetigungsBrief {
              german
            }
            infoBrief {
              german
            }
            extra_json
          }
        }
      `,
      variables: {
        authToken: this.$authToken(),
        anmeldeID: this.$route.params.id
      },
      fetchPolicy: 'no-cache'
    }).then(async (res: any) => {
      this.data = res.data.anmeldung;

      this.best = await existsReport(`best-brief-${this.data.veranstaltung.veranstaltungsID}`);
      this.info = await existsReport(`info-brief-${this.data.veranstaltung.veranstaltungsID}`);
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private async created() {
    this.getData();
  }
}
</script>
