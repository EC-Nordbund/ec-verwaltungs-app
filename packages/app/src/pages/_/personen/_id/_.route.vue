<template lang="pug">
  ec-wrapper(hasXBtn hasNav hasSheet hasHeader hasDial v-bind="config" hasReload @reload="loadData")
    router-view(:data="data" @reload="loadData")
    template(#dialogs)
      ec-add-adresse(ref="addAdresse" :data="data" @reload="loadData")
      ec-add-tel(ref="addTel" :data="data" @reload="loadData")
      ec-add-mail(ref="addMail" :data="data" @reload="loadData")
      ec-fz-antrag(ref="fzAntrag" :data="data" @reload="loadData")
      ec-fz(ref="fz" @reload="loadData")
      ec-edit-person(ref="stamm" :data="data" @reload="loadData")
      ec-person-merge(ref="mergePerson" @reload="loadData")
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
        {
          icon: 'call_merge',
          id: 'pers_merge',
          label: 'Person mergen',
          click: ()=>{(<any>this.$refs.mergePerson).show(this.$route.params.id)}
        },
        {
          icon: 'assignment',
          id: 'pers_create_fz_antrag',
          label: 'FZ-Antrag generieren',
          click: ()=>{(<any>this.$refs.fzAntrag).show()}
        },
        {
          icon: 'assignment',
          id: 'pers_add_fz',
          label: 'FZ Eintragen',
          click: ()=>{(<any>this.$refs.fz).show()}
        },
        {
          icon: 'edit',
          id: 'pers_edit_stamm',
          label: 'Stammdaten editieren',
          click: ()=>{(<any>this.$refs.stamm).show()}
        },
        {
          disabled: true,
          icon: 'local_offer',
          id: 'pers_edit_kategor',
          label: 'Kategorien editieren',
          click: ()=>{alert('Comming later...')}
        },
        {
          icon: 'extension',
          id: 'pers_edit_sonstiges',
          label: 'Sonstiges editieren',
          click: ()=>{alert('Comming Soon...')}
        },
        {
          disabled: true,
          icon: 'assignment',
          id: 'pers_report',
          label: 'Report erzeugen',
          click: ()=>{alert('Kommt nach Bedarf...')}
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
