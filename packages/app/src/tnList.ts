import gql from 'graphql-tag';
// @ts-ignore
import * as excel from 'xlsx-template';
import { ApolloClient } from 'apollo-boost';

export async function generate(
  veranstaltungsID: number,
  template: string,
  authToken: string,
  apolloClient: ApolloClient<any>,
  wlistFilter: (wlist: number) => boolean
) {
  const url = `https://verwaltung.tmp.ec-nordbund.de/templates/${template}.xlsx`;
  const templateData = await fetch(url).then((v) => v.arrayBuffer());
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
          kurzBezeichnung
          begin {
            german
            input
          }
          ende {
            german
          }
          hauptleiter {
            person {
              personID
              vorname
              nachname
            }
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
                input
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
    .then((v) => v.data.veranstaltung)
    .then((v) => ({
      ...v,
      vOrtLocation: `${v.veranstaltungsort.plz} ${v.veranstaltungsort.ort} (${v.veranstaltungsort.land})`,
      anmeldungen: v.anmeldungen
        .filter((an: any) => wlistFilter(an.wartelistenPlatz))
        .map((h: any, id: number) => ({
          id,
          ...h,
          empty: '',
          m: h.person.geschlecht === 'm' ? 'X' : '',
          w: h.person.geschlecht === 'w' ? 'X' : '',
          older27: dateDiffInYears(h.person.gebDat.input, v.begin.input) > 27 ? 'X' : '',
          betreuer: h.position > 1 ? 'X' : ''
        })
        )
    }
    ));
  instance.substitute(1, replData);
  const resultList = instance.generate({ type: 'arraybuffer' });
  saveByteArray(
    `TN-Liste.${template}.${replData.kurzBezeichnung}-${replData.begin.german.split('.')[3]}.${wlistFilter.toString()}.xlsx`,
    resultList
  );
}

export async function getTemplates() {
  return await fetch('https://verwaltung.tmp.ec-nordbund.de/templates/list.json').then((res) => res.json());
}

export function saveByteArray(reportName: string, byte: ArrayBuffer, word: boolean = false) {
  const blob = new Blob([byte], {
    type: (
      word ? 'vnd.openxmlformats-officedocument.wordprocessingml.document'
        : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
  });
  const link = document.getElementById('ec-download') as HTMLAnchorElement;
  link.href = window.URL.createObjectURL(blob);
  link.download = reportName;
  link.click();
}


function dateDiffInYears(dateoldS: string, datenewS: string) {
  const dateold = new Date(dateoldS);
  const datenew = new Date(datenewS);
  const ynew = datenew.getFullYear();
  const mnew = datenew.getMonth();
  const dnew = datenew.getDate();
  const yold = dateold.getFullYear();
  const mold = dateold.getMonth();
  const dold = dateold.getDate();
  let diff = ynew - yold;
  if (mold > mnew) {
    diff--;
  } else {
    if (mold === mnew) {
      if (dold > dnew) { diff--; }
    }
  }
  return diff;
}
