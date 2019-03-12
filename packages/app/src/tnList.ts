import gql from 'graphql-tag'
import * as excel from 'xlsx-template'
import { ApolloClient } from 'apollo-boost'

export async function generate(veranstaltungsID: number, template: string, authToken: string, apolloClient: ApolloClient, mitWarteListe = false) {
  const url = `https://verwaltung.ec-nordbund.de/templates/${template}.xlsx`;
  const templateData =  await fetch(url).then(v => v.arrayBuffer());
  const instance = new excel(templateData);

  const replData = await apolloClient.query({
    query: gql`
      query(
        $authToken: String!,
        $veranstaltungsID: Int!
      ){
        veranstaltung(
          authToken: $authToken,
          veranstaltungsID: $veranstaltungsID
        ) {
          veranstaltungsID
          bezeichnung
          begin {
            german
          }
          ende {
            german
          }
          minTNAlter
          maxTNAlter
          anzahlPlaetze
          anzahlPlaetzeW
          anzahlPlaetzeM
          preisNormal
          preisLastMinute
          preisFruehbucher
          fruehbucherBis {
            german
          }
          lastMinuteAb {
            german
          }
          preisAnzahlungNormal
          preisAnzahlungLastMinute
          preisAnzahlungFruehbucher
          kannVorortBezahltWerden
          hatGWarteliste
          veranstaltungsort {
            bezeichnung
            strasse
            plz
            ort
            land
          }
          anmeldungen {
            anmeldeID
            position
            person {
              vorname
              nachname
              geschlecht
              gebDat {
                german
              }
            }
            adresse {
              strasse
              plz
              ort
            }
            telefon {
              telefon
            }
            email{
              eMail
            }
            bemerkungen
            gesundheitsinformationen
            lebensmittelAllergien
            vegetarisch
            radfahren
            schwimmen
            fahrgemeinschaften
            klettern
            sichEntfernen
            bootFahren
            wartelistenPlatz
            anmeldeZeitpunkt {
              german
              day
              month
              year
            }
          }
        }
      }
    `,
    variables: {
      authToken,
      veranstaltungsID
    }
  })
  .then(v => v.data.veranstaltung)
  .then(v => ({
    ...v,
    vOrtLocation: `${v.veranstaltungsort.plz} ${v.veranstaltungsort.ort} (${v.veranstaltungsort.land})`,
    anmeldungen: v.anmeldungen
      .filter(an => {
        if(mitWarteListe) {
          return an.wartelistenPlatz >= 0
        } else {
          return an.wartelistenPlatz === 0
        }
      })
      .map(h => ({
        ...h,
        empty: '',
        m: h.person.geschlecht === 'm' ? 'X' : '',
        w: h.person.geschlecht === 'w' ? 'X' : '',
        older27: '? (Soon...)',
        betreuer: h.position > 1 ? 'X' : ''
      })
    )}
  ));
  instance.substitute(1, replData);
  const resultList = instance.generate({type: 'arraybuffer'});
  saveByteArray(`TN-Liste.${template}.${veranstaltungsID}.xlsx`, resultList);
}

export async function getTemplates() {
  return await fetch('https://verwaltung.ec-nordbund.de/templates/list.json').then(res => res.json())
}

function saveByteArray(reportName: string, byte: ArrayBuffer) {
  const blob = new Blob([byte], {type: 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
  const link = <HTMLAnchorElement>document.getElementById('ec-download');
  link.href = window.URL.createObjectURL(blob);
  link.download = reportName;
  link.click();
};