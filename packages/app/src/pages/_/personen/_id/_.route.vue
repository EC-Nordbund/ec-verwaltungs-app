<template lang="pug">
  ec-wrapper(hasXBtn hasNav hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    router-view(:data="data")
    template(#dialogs)
      ec-add-adresse(ref="addAdresse" :data="data")
      ec-add-tel(ref="addTel" :data="data")
      ec-add-mail(ref="addMail" :data="data")
      ec-fz-antrag(ref="fzAntrag" :data="data")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';
@Component({})
export default class EcRootIndex extends Vue {

  private get config() {
    return {
      sheet: [
        {
          icon: 'home',
          id: 'pers_add_adresse',
          label: 'Adresse hinzufügen',
          click: ()=>{(<any>this.$refs.addAdresse).show()}
        },
        {
          icon: 'menu',
          id: 'pers_merge_adresse',
          label: 'Adresse Mergen'
        },
        {
          icon: 'mail',
          id: 'pers_add_email',
          label: 'Email hinzufügen',
          click: ()=>{(<any>this.$refs.addMail).show()}
        },
        {
          icon: 'phone',
          id: 'pers_add_telefon',
          label: 'Telefon hinzufügen',
          click: ()=>{(<any>this.$refs.addTel).show()}
        },
        // {
        //   icon: 'menu',
        //   id: 'pers_merge_telefon',
        //   label: 'Telefon mergen'
        // },
        {
          icon: 'menu',
          id: 'pers_merge',
          label: 'Person mergen'
        },
        {
          icon: 'assignment',
          id: 'pers_create_fz_antrag',
          label: 'FZ-Antrag generieren',
          // click: ()=>{
            // if (confirm(`TODO:...`)) {
              // this.$apolloClient.mutate({
              //   mutation: gql`
              //     mutation(
              //       $personID: Int!
              //       $authToken: String!
              //     ) {
              //       addFZAntrag(
              //         personID: $personID
              //         authToken: $authToken
              //       )
              //     }
              //   `,
              //   variables: {
              //     authToken: this.$authToken,
              //     personID: this.$route.params.id
              //   }
              // })
            // }
          // }
          click: ()=>{(<any>this.$refs.fzAntrag).show()}
        },
        {
          icon: 'menu',
          id: 'pers_add_fz',
          label: 'FZ Eintragen'
        },
        {
          icon: 'menu',
          id: 'pers_edit_stamm',
          label: 'Stammdaten editieren'
        },
        {
          icon: 'menu',
          id: 'pers_edit_kategor',
          label: 'Kategorien editieren'
        },
        {
          icon: 'menu',
          id: 'pers_edit_sonstiges',
          label: 'Sonstiges editieren'
        },
        {
          icon: 'menu',
          id: 'pers_old_Adresse',
          label: 'Adresse als veraltet makieren'
        },
        {
          icon: 'menu',
          id: 'pers_old_Telefon',
          label: 'Telefon als veraltet makieren'
        },
        {
          icon: 'menu',
          id: 'pers_old_Email',
          label: 'E-Mail als veraltet makieren'
        },
        {
          icon: 'menu',
          id: 'pers_report',
          label: 'Report erzeugen'
        }
      ].map((v) => ({click: this.sheetClick, ...v})),
      nav: [
        {
          icon: 'menu',
          label: 'Allgemein',
          to: 'home'
        },
        {
          icon: 'menu',
          label: 'Veranstaltungen',
          to: 'veranstaltungen'
        },
        {
          icon: 'menu',
          label: 'Sonstiges',
          to: 'sonstiges'
        }
      ],
      title: `${this.data.vorname} ${this.data.nachname} (${this.data.gebDat.german})`,
      subTitle: 'Person'
    };
  }
  public static meta = {};

  public data: any = {
    gebDat: {},
    adressen: [],
    telefone: [],
    emails: [],
    fzs: [],
    fzAntraege: [],
    ak: []
  };

  private sheetClick(item: {id: string}) {
    alert(item.id);
  }

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
            Fuehrerschein
            Rettungsschwimmer
            ErsteHilfe
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
            juLeiCaNr
            ecKreis {
              ecKreisID
              bezeichnung
              website
            }
            ecMitglied
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
        authToken: this.$authToken,
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
