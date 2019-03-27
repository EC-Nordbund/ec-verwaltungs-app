<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config" @getData="getData")
    router-view(:data="data")
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private data: any = {};

  private get config() {
    return {
      sheet: [
        {
          id: 'anmel_rep_bestbrief',
          icon: 'menu',
          label: 'Bestätigungsbrief generieren und Drucken',
          click: this.sheetClick
        },
        {
          id: 'anmel_rep_infobrief',
          icon: 'menu',
          label: 'Infobrief generieren und Drucken',
          click: this.sheetClick
        },
        {
          id: 'anmel_abmelden',
          icon: 'menu',
          label: 'Person abmelden',
          click: this.sheetClick
        },
        {
          id: 'anmel_nachrücken',
          icon: 'menu',
          label: 'Nachrücken lassen',
          click: this.sheetClick
        }
      ],
      nav: [
        {
          icon: 'menu',
          label: 'Allgemein',
          to: `/anmeldungen/${this.$route.params.id}/home`
        },
        {
          icon: 'menu',
          label: 'Finanzen',
          to: `/anmeldungen/${this.$route.params.id}/finanzen`
        },
        {
          icon: 'menu',
          label: 'Sonstiges',
          to: `/anmeldungen/${this.$route.params.id}/sonstiges`
        }
      ],
      title: `${(this.data.person||{}).vorname} ${(this.data.person||{}).nachname} - ${(this.data.veranstaltung||{}).bezeichnung}`,
      subTitle: 'Anmeldung'
    }
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
        authToken: this.$authToken,
        anmeldeID: this.$route.params.id
      },
      fetchPolicy: 'no-cache'
    }).then((res: any) => {
      this.data = res.data.anmeldung;
    }).catch((err: any) => {
      this.$dialog.error({
        text: err.message,
        title: 'Laden fehlgeschlagen!'
      });
    });
  }

  private created() {
    this.getData();
  }

  private sheetClick(item: {id: string}) {alert(item.id); }
}
</script>
