import { createFZ } from '../../serienbrief/fz';
import { getUser } from '../../users';
import sendMail from '../mail';
import { query } from '../mysql';
import { addAuth, handleAllowed } from '../sonstiges';
import { writeFileSync } from 'fs';
import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
  } from 'graphql';
import { sha3_512 } from 'js-sha3';

const wpTokens: Array<string> = [process.env.WP_TOKEN]

export default {
  anmeldungBesonderheiten: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
      vegetarisch: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      lebensmittelAllergien: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gesundheitsinformationen: {
        type: new GraphQLNonNull(GraphQLString),
      },
      bemerkungen: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(
        `UPDATE anmeldungen SET vegetarisch = ${args.vegetarisch}, lebensmittelAllergien="${args.lebensmittelAllergien}", gesundheitsinformationen="${args.gesundheitsinformationen}", bemerkungen="${
          args.bemerkungen
        }" WHERE anmeldeID="${args.anmeldeID}"`,
      )
    }, 'anmeldungBesonderheiten'),
  },
  anmeldungBezahlt: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
      betrag: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
    }),
    resolve: handleAllowed((_, args) => {
      return query(`UPDATE anmeldungen SET bisherBezahlt = ${args.betrag} WHERE anmeldeID="${args.anmeldeID}"`)
    }, 'anmeldungFinanzen'),
  },
  anmeldungRueckbezahlt: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
      betrag: {
        type: new GraphQLNonNull(GraphQLFloat),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(`UPDATE anmeldungen SET rueckbezahlt = ${args.betrag} WHERE anmeldeID="${args.anmeldeID}"`)
    }, 'anmeldungFinanzen'),
  },
  anmeldungKontakt: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
      adressID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      emailID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      telefonID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(`UPDATE anmeldungen SET adressID=${args.adressID}, eMailID=${args.emailID}, telefonID=${args.telefonID} WHERE anmeldeID = '${args.anmeldeID}'`)
    }, 'anmeldungKontakt'),
  },
  abmelden: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gebuehr: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      weg: {
        type: new GraphQLNonNull(GraphQLString),
      },
      kommentar: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(
        `UPDATE anmeldungen SET wartelistenPlatz=-1,abmeldeZeitpunkt=CURRENT_TIMESTAMP,abmeldeGebuehr=${args.gebuehr},wegDerAbmeldung="${args.weg}", kommentarAbmeldung="${args.kommentar}" WHERE anmeldeID = "${
          args.anmeldeID
        }"`,
      )
      sendMail(
        'automated@ec-nordbund.de',
        { to: "2pi_r2@gmx.de; BirgitHerbert@t-online.de; an-gela@gmx.net; referent@ec-nordbund.de" },
        `Neue Abmeldung`,
        `<h1>Neue Abmeldung</h1><p>Es gibt eine Abmeldung mit der AnmeldeID: ${args.anmeldeID}<br>Klicke <a href="https://verwaltung.ec-nordbund.de/anmeldungen/${args.anmeldeID}/home">HIER</a> um die Anmeldung einzusehen.</p>`,
      )
    }, 'anmeldungAbmelden'),
  },
  nachruecken: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed((_, args) => {
      query(`SELECT wartelistenPlatz, veranstaltungsID, geschlecht FROM anmeldungen, personen WHERE personen.personID = anmeldungen.personID AND anmeldeID = "${args.anmeldeID}"`)
        .then(row => row[0])
        .then(r => {
          query(`SELECT hatGWarteliste FROM veranstaltungen WHERE veranstaltungsID=${r.veranstaltungsID}`)
            .then(row => row[0])
            .then(v => {
              if (v.hatGWarteliste) {
                query(`UPDATE anmeldungen SET wartelistenPlatz=0 WHERE anmeldeID="${args.anmeldeID}"`).then(v => {
                  query(
                    `UPDATE anmeldungen SET wartelistenPlatz=wartelistenPlatz-1 WHERE wartelistenPlatz > ${
                      r.wartelistenPlatz
                    } AND personen.personID = anmeldungen.personID AND personen.geschlecht = "${r.geschlecht}"`,
                  )
                })
              } else {
                query(`UPDATE anmeldungen SET wartelistenPlatz=0 WHERE anmeldeID="${args.anmeldeID}"`).then(v => {
                  query(`UPDATE anmeldungen SET wartelistenPlatz=wartelistenPlatz-1 WHERE wartelistenPlatz > ${r.wartelistenPlatz}`)
                })
              }
            })
        })
    }, 'anmeldungWarteliste'),
  },
  anmelden: {
    type: new GraphQLObjectType({
      name: 'anmeldeReturn',
      fields: {
        status: {
          type: new GraphQLNonNull(GraphQLInt),
        },
        anmeldeID: {
          type: GraphQLString,
        },
      },
    }),
    args: {
      isWP: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      token: {
        type: new GraphQLNonNull(GraphQLString),
      },
      vorname: {
        type: new GraphQLNonNull(GraphQLString),
      },
      nachname: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gebDat: {
        type: new GraphQLNonNull(GraphQLString),
      },
      geschlecht: {
        type: new GraphQLNonNull(GraphQLString),
      },
      position: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      veranstaltungsID: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      eMail: {
        type: new GraphQLNonNull(GraphQLString),
      },
      telefon: {
        type: new GraphQLNonNull(GraphQLString),
      },
      strasse: {
        type: new GraphQLNonNull(GraphQLString),
      },
      plz: {
        type: new GraphQLNonNull(GraphQLString),
      },
      ort: {
        type: new GraphQLNonNull(GraphQLString),
      },
      anmeldeZeitpunkt: {
        type: new GraphQLNonNull(GraphQLString),
      },
      vegetarisch: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      lebensmittelAllergien: {
        type: new GraphQLNonNull(GraphQLString),
      },
      gesundheitsinformationen: {
        type: new GraphQLNonNull(GraphQLString),
      },
      bemerkungen: {
        type: new GraphQLNonNull(GraphQLString),
      },
      radfahren: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      schwimmen: {
        type: new GraphQLNonNull(GraphQLInt),
      },
      fahrgemeinschaften: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      klettern: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      sichEntfernen: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      bootFahren: {
        type: new GraphQLNonNull(GraphQLBoolean),
      },
      extra_json: {
        type: new GraphQLNonNull(GraphQLString),
      },
    },
    async resolve(_, args) {
      let allowed = false
      if (args.isWP) {
        allowed = wpTokens.indexOf(args.token) !== -1
      } else {
        allowed = getUser(args.token).userGroup.mutationRechte.indexOf('anmelden') !== -1
      }

      if (allowed) {
        const j = JSON.stringify(args)
        const h = sha3_512(j)
        const d = new Date().toISOString()

        //writeFileSync(__dirname + '/../../../log/anmel_' + h + '_' + d + '.log.json', j)

        const vData = await query(`SELECT * FROM veranstaltungen WHERE veranstaltungsID = ${args.veranstaltungsID}`).then(row => row[0])

        const anmeldeID_start =
          args.vorname.substr(0, 2) +
          args.nachname.substr(0, 2) +
          vData.kurzBezeichnung +
          vData.begin
            .getFullYear()
            .toString()
            .substr(2, 2)
        const anmeldeID_ende = args.position

        let genFour = () => {
          return Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()
        }
        let checkAnmeldeID = (id: string) => {
          return query(`SELECT anmeldeID FROM anmeldungen WHERE anmeldeID = '${id}'`).then(v => v.length === 0)
        }

        let anmeldeID = anmeldeID_start + genFour() + anmeldeID_ende
        while (!checkAnmeldeID(anmeldeID)) {
          anmeldeID = anmeldeID_start + genFour() + anmeldeID_ende
        }

        let persons = await query(`SELECT personID FROM personen WHERE vorname="${args.vorname}"AND  nachname="${args.nachname}" AND gebDat="${args.gebDat}"`)
        if (persons.length === 0) {
          await query(`INSERT INTO personen (vorname, nachname, gebDat, geschlecht) VALUES ("${args.vorname}", "${args.nachname}", "${args.gebDat}", "${args.geschlecht}")`)
          persons = await query(`SELECT personID FROM personen WHERE vorname="${args.vorname}"AND  nachname="${args.nachname}" AND gebDat="${args.gebDat}"`)
        }
        const personID = persons[0].personID

        let eMails = await query(`SELECT eMailID FROM eMails WHERE eMail="${args.eMail}" AND personID=${personID}`)
        if (eMails.length === 0) {
          await query(`INSERT INTO eMails(eMail, personID) VALUES ("${args.eMail}",${personID})`)
          eMails = await query(`SELECT eMailID FROM eMails WHERE eMail="${args.eMail}" AND personID=${personID}`)
        }
        const eMailID = eMails[0].eMailID

        let telefone = await query(`SELECT telefonID FROM telefone WHERE telefon="${args.telefon}" AND personID=${personID}`)
        if (telefone.length === 0) {
          await query(`INSERT INTO telefone(telefon, personID) VALUES ("${args.telefon}",${personID})`)
          telefone = await query(`SELECT telefonID FROM telefone WHERE telefon="${args.telefon}" AND personID=${personID}`)
        }
        const telefonID = telefone[0].telefonID

        let adressen = await query(`SELECT adressID FROM adressen WHERE personID=${personID} AND strasse="${args.strasse}" AND plz="${args.plz}" AND ort="${args.ort}"`)
        if (adressen.length === 0) {
          await query(`INSERT INTO adressen (personID, strasse, plz, ort) VALUES (${personID},"${args.strasse}","${args.plz}","${args.ort}")`)
          adressen = await query(`SELECT adressID FROM adressen WHERE personID=${personID} AND strasse="${args.strasse}" AND plz="${args.plz}" AND ort="${args.ort}"`)
        }
        const adressID = adressen[0].adressID

        const vorhandeneAnmeldungen = await query(`SELECT anmeldeID FROM anmeldungen WHERE personID=${personID} AND veranstaltungsID=${args.veranstaltungsID}`)

        if (vorhandeneAnmeldungen.length > 0) {
          return {
            status: -2,
            anmeldeID: vorhandeneAnmeldungen[0].anmeldeID,
          }
        } else {
          let wartelistenplatz = 0
          if (args.position === 1) {
            const maxWListPlatz: Array<any> = await query(
              `SELECT personen.geschlecht AS geschlecht, MAX(anmeldungen.wartelistenPlatz) AS maxWlistPos FROM anmeldungen, personen WHERE personen.personID = anmeldungen.personID AND anmeldungen.veranstaltungsID = ${
                args.veranstaltungsID
              } GROUP BY personen.geschlecht`,
            )
            const anzahlPersonen: Array<any> = await query(
              `SELECT COUNT(personen.personID) AS anzahlPersonen, personen.geschlecht AS geschlecht FROM personen, anmeldungen WHERE personen.personID = anmeldungen.personID AND anmeldungen.veranstaltungsID = ${
                args.veranstaltungsID
              } AND anmeldungen.wartelistenPlatz = 0 GROUP BY personen.geschlecht`,
            )

            let maxWlistMännlich = 0
            let maxWlistWeiblich = 0
            let anzahlMännlich = 0
            let anzahlWeiblich = 0

            maxWListPlatz.forEach(per => {
              switch (per.geschlecht) {
                case 'm':
                  maxWlistMännlich = per.maxWlistPos
                  break
                case 'w':
                  maxWlistWeiblich = per.maxWlistPos
                  break
              }
            })

            const maxWlistGesamt = Math.max(maxWlistMännlich, maxWlistWeiblich)

            anzahlPersonen.forEach(per => {
              switch (per.geschlecht) {
                case 'm':
                  anzahlMännlich = per.anzahlPersonen
                  break
                case 'w':
                  anzahlWeiblich = per.anzahlPersonen
                  break
              }
            })

            const anzahlGesamt = anzahlMännlich + anzahlWeiblich

            const hatGWarteliste = vData.hatGWarteliste
            const anzahlPlätze = vData.anzahlPlätze
            const anzahlPlätzeWeiblich = vData.anzahlPlätzeWeiblich
            const anzahlPlätzeMännlich = vData.anzahlPlätzeMännlich

            const myGeschlecht = args.geschlecht

            if (hatGWarteliste) {
              if (myGeschlecht === 'm') {
                if (maxWlistMännlich > 0) {
                  wartelistenplatz = maxWlistMännlich + 1
                } else {
                  if (anzahlMännlich < anzahlPlätzeMännlich) {
                    if (anzahlGesamt < anzahlPlätze) {
                      wartelistenplatz = 0
                    } else {
                      wartelistenplatz = 1
                    }
                  } else {
                    wartelistenplatz = 1
                  }
                }
              } else {
                if (maxWlistWeiblich > 0) {
                  wartelistenplatz = maxWlistMännlich + 1
                } else {
                  if (anzahlWeiblich < anzahlPlätzeWeiblich) {
                    if (anzahlGesamt < anzahlPlätze) {
                      wartelistenplatz = 0
                    } else {
                      wartelistenplatz = 1
                    }
                  } else {
                    wartelistenplatz = 1
                  }
                }
              }
            } else {
              if (maxWlistGesamt > 0) {
                wartelistenplatz = maxWlistGesamt + 1
              } else {
                if (anzahlGesamt < anzahlPlätze) {
                  wartelistenplatz = 0
                } else {
                  wartelistenplatz = 1
                }
              }
            }
          } else {
            let generateFlag = false

            let wann: Date
            if (vData.ende === null) {
              wann = vData.begin
            } else {
              wann = vData.ende
            }

            const fzData = await query(`SELECT fzVon FROM fz WHERE personID = ${personID} ORDER BY fzVon DESC LIMIT 1`)

            if (fzData.length === 0) {
              generateFlag = true
            } else {
              const fzVon = fzData[0].fzVon
              const wannArr = [wann.getFullYear(), wann.getMonth() + 1, wann.getDate()]
              wannArr[0] -= 5
              const fzMinDate = new Date(wannArr.join('-'))
              if (fzMinDate > fzVon) {
                generateFlag = true
              }
            }

            if (generateFlag) {
              createFZ(personID, args.eMail, adressID)
              await query(`INSERT INTO fzAntrag(personID) VALUES (${personID})`)
            }
          }
          await Promise.all([
            query(`UPDATE adressen SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE adressID = ${adressID}`),
            query(`UPDATE eMails SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE eMailID = ${eMailID}`),
            query(`UPDATE telefone SET isOld=0, lastUsed=CURRENT_TIMESTAMP WHERE telefonID = ${telefonID}`),
            query(`UPDATE personen SET letzteAenderung=CURRENT_TIMESTAMP WHERE personID=${personID}`),
          ])
          await query(`
            INSERT INTO anmeldungen(
              anmeldeID,
              veranstaltungsID,
              personID,
              position,
              adressID,
              eMailID,
              telefonID,
              wartelistenPlatz,
              anmeldeZeitpunkt,
              vegetarisch,
              lebensmittelAllergien,
              gesundheitsinformationen,
              bemerkungen,
              radfahren, 
              schwimmen,
              fahrgemeinschaften,
              klettern,
              sichEntfernen,
              bootFahren,
              extra_json
            ) VALUES (
              "${anmeldeID}", 
              ${args.veranstaltungsID}, 
              ${personID}, 
              ${args.position}, 
              ${adressID}, 
              ${eMailID}, 
              ${telefonID}, 
              ${wartelistenplatz},
              "${args.anmeldeZeitpunkt}",
              ${args.vegetarisch},
              "${args.lebensmittelAllergien}",
              "${args.gesundheitsinformationen}",
              "${args.bemerkungen}", 
              ${args.radfahren},
              ${args.schwimmen},
              ${args.fahrgemeinschaften},
              ${args.klettern},
              ${args.sichEntfernen},
              ${args.bootFahren},
              "${args.extra_json}"
            )`)
          if (vData.informAnmeldecenter) {
            sendMail(
              'automated@ec-nordbund.de',
              { to: vData.informAnmeldecenter },
              `Neue Anmeldung bei Veranstaltung ${vData.bezeichnung}`,
              `<h1>Neue Anmeldung</h1><p>Es gibt eine Anmeldung mit der AnmeldeID: ${anmeldeID}<br>Klicke <a href="https://verwaltung.ec-nordbund.de/anmeldungen/${anmeldeID}/home">HIER</a> um die Anmeldung einzusehen.</p>`,
            )
          }

          return {
            status: wartelistenplatz,
            anmeldeID: anmeldeID,
          }
        }
      } else {
        return { status: -1 }
      }
    },
  },
  anmeldungBestaetigungsbrief: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed(async function(_, args) {
      await query(`UPDATE anmeldungen SET bestaetigungsBrief=CURRENT_TIMESTAMP WHERE anmeldeID = '${args.anmeldeID}'`)
      return true
    }, 'anmeldungBesonderheiten'),
  },
  anmeldunginfobrief: {
    type: GraphQLBoolean,
    args: addAuth({
      anmeldeID: {
        type: new GraphQLNonNull(GraphQLString),
      },
    }),
    resolve: handleAllowed(async function(_, args) {
      await query(`UPDATE anmeldungen SET infoBrief=CURRENT_TIMESTAMP WHERE anmeldeID = '${args.anmeldeID}'`)
      return true
    }, 'anmeldungBesonderheiten'),
  },
}
