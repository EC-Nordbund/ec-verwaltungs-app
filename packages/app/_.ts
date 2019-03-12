import gql from 'graphql-tag'
import * as excel from 'xlsx-template'

export async function generate(veranstaltungsID, template, authToken, apolloClient) {
  const url = `https://verwaltung.ec-nordbund.de/templates/${template}.xlsx`
  const templateData =  await fetch(url).then(v=>v.arrayBuffer())
  const instance = excel(templateData)
  
  const replData = await apolloClient.query({
    query: gql`
      veranstaltung(
        authToken: $authToken
        veranstaltungsID: $veranstaltungsID
      ) {
        veranstaltungsID
        bezeichnung
        begin {
          input
        }
        ende {
          input
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
    }`,
    variables: {
      authToken,
      veranstaltungsID
    }
  }).then(v=>v.data.veranstaltung).then(v=>({...v, anmeldungen: v.anmeldungen.map(h=>({...h}))}))

  instance.substitute(1, replData)

  const resultList = instance.generate({type: 'arraybuffer'})
  saveByteArray(`TN-Liste.${template}.${veranstaltungsID}.xlsx`, resultList)
}

export async function getTemplates() {
  return await fetch('https://verwaltung.ec-nordbund.de/templates/list.json').then(res=>res.json())
}

function saveByteArray(reportName, byte) {
  var blob = new Blob([byte], {type: "vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
  var link = document.getElementById('ec-download');
  link.href = window.URL.createObjectURL(blob);
  var fileName = reportName;
  link.download = fileName;
  link.click();
};