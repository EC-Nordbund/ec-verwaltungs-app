<template lang="pug">
  ec-wrapper(hasSheet hasDial hasNav hasXBtn hasRouterView v-bind="config" @getData="getData")
    router-view(:data="data")
    v-dialog(v-model="abmeldenShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Person abmelden
        v-card-text
          v-form(v-model="abmeldenValid")
            formular(v-model="abmeldenValue" :schema=`[
              {
                name: 'weg',
                type: 'input',
                label: 'Weg der Abmeldung',
                rule: "required|max:100",
                required: true,
                counter: 100
              },
              {
                name: 'kommentar',
                type: 'input',
                label: 'Kommentar',
                rule: "required|max:200",
                required: true,
                counter: 200
              },
              {
                name: 'gebuehr',
                type: 'input',
                label: 'Abmeldegebühr (Ganze Euros)',
                mask: '###',
                rule: "required|max:3",
                required: true,
                counter: 3
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="abmeldenShow=false") Abbrechen
          v-btn(color="primary" :disabled="!abmeldenValid" @click="abmeldenSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import gql from 'graphql-tag';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  private data: any = {};

  private abmeldenShow = false
  private abmeldenValid = false
  private abmeldenValue = {
    gebuehr: 0,
    weg: '',
    kommentar: ''
  }
  private abmeldenSave() {
    this.abmeldenShow = false

    this.$apolloClient.mutate({
      mutation: gql`
        mutation($anmeldeID: String!, $weg: String!, $gebuehr: Int!, $kommentar: String!, $authToken: String!) {
          abmelden(anmeldeID: $anmeldeID, weg: $weg, gebuehr: $gebuehr, kommentar: $kommentar, authToken: $authToken)
        }
      `,
      variables: {
        anmeldeID: this.$route.params.id,
        authToken: this.$authToken,
        ...this.abmeldenValue
      }
    }).then(()=>{
      this.$notifikation('Erfolgreich Abgemeldet', `Du hast erfolgreich die Person abgemeldet.`);
      this.getData()
    }).catch((err)=>{
      this.$dialog.error({
        text: err.message,
        title: 'Speichern fehlgeschlagen!'
      });
    })

    this.abmeldenValue = {
      gebuehr: 0,
      weg: '',
      kommentar: ''
    }
  }

  private get config() {
    let self = this;

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
          click: () => {
            self.abmeldenShow = true;
          }
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
          icon: 'euro_symbol',
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
