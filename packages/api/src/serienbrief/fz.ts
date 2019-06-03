import { latex } from './latex';
import mail from '../schema/mail';
import { query } from '../schema/mysql';
import { createWriteStream, readFileSync } from 'fs';
import { join } from 'path';
export const createFZ = (personID: number, email: string, adressID: number = -1) => {
  createFZWithData(personID, adressID).then(file => {
    query(`SELECT vorname, nachname, geschlecht FROM personen WHERE personID = ${personID}`).then(rows => {
      const p = rows[0]
      mail(
        'fz@ec-nordbund.de',
        { to: email, bcc: 'fz@ec-nordbund.de;datenschutz@ec-nordbund.de' },
        'Erweitertes Führungszeugnis',
        `<p>Hey <b>${p.vorname} ${p.nachname}</b>,</p>
        <p>du bist als Mitarbeiter${
          p.geschlecht === 'w' ? 'in' : ''
        } im EC-Nordbund überregional oder in deiner Gemeinschaft/Gemeinde vor Ort tätig. Das freut uns ungemein. <b>Danke für deinen Einsatz.</b><br>
        Der Gesetzgeber verlangt von uns, dass wir alle fünf Jahre Einsicht in ein <u><i>aktuelles</i> erweitertes Führungszeugnis</u> nehmen müssen.<br>
        Im Anhang findest du das Formular, mit dem Du <u>bei deiner zuständigen Meldebehörde</u> das Führungszeugnis beantragen kannst.<br>
        Dieses Führungszeugnis musst du bei dem Verantwortlichen bei dir vor Ort oder bei mir (innerhalb von drei Monaten nach Ausstellung des Zeugnisses) vorzeigen.<br>
        Wir hoffen, dass du Verständnis dafür hast, und entschuldigen uns für den Mehraufwand, den du dadurch hast.</p>
        <p>P.S. Du musst das Zeugnis nur vorzeigen. Nicht abgeben. Wenn es für dich allerdings einfacher sein sollte, das Zeugnis einzuscannen und mir zuzumailen (bitte an <a href="mailto:fz@ec-nordbund.de">fz@ec-nordbund.de</a>), ist das für uns in Ordnung.<br>
        Du bist nur nicht verpflichtet, es uns zur Verfügung zu stellen, so dass wir es speichern können. Wir notieren uns keine Inhalte des Zeugnisses und löschen auch die Mail, falls du das wünscht...</p>
        <p>Entschieden für Christus grüßt</p>
        <p><b>ThomaS:-)</b></p>`,
        true,
        [{ content: file, filename: 'fzAntrag.pdf' }],
      )
    })
  })
}

export function createFZWithData(personID: number, adressID: number = -1): Promise<string> {
  return new Promise((res, rej) => {
    if (adressID === -1) {
      query(`SELECT adressID FROM adressen WHERE personID = ${personID} AND isOld = 0 ORDER BY lastUsed LIMIT 1`).then((row: Array<{ adressID: number }>) => {
        if (row.length === 0) {
          res('Keine Gültige Adresse gefunden')
        } else {
          createFZWithData(personID, row[0].adressID).then(res)
        }
      })
    } else {
      query(`SELECT strasse, plz, ort FROM adressen WHERE adressID = ${adressID}`).then((adressen: Array<{ strasse: string; plz: string; ort: string }>) => {
        query(`SELECT vorname, nachname, gebDat, geschlecht FROM personen WHERE personID = ${personID}`).then(
          (
            personen: Array<{
              vorname: string
              nachname: string
              gebDat: Date
              geschlecht: string
            }>,
          ) => {
            const p = personen[0]
            const a = adressen[0]
            createFZDocument(p.vorname, p.nachname, `${p.gebDat.getDate()}.${p.gebDat.getMonth() + 1}.${p.gebDat.getFullYear()}`, a.strasse, a.plz, a.ort, p.geschlecht).then(res)
          },
        )
      })
    }
  })
}

function createFZDocument(vorname: string, nachname: string, gebDat: string, strasse: string, plz: string, ort: string, geschlecht: string): Promise<string> {
  const settings = `
    \\newcommand{\\ecName}{${vorname} ${nachname}}
    \\newcommand{\\ecGebDat}{${gebDat}}
    \\newcommand{\\ecStrasse}{${strasse}}
    \\newcommand{\\ecPLZ}{${plz}}
    \\newcommand{\\ecOrt}{${ort}}
    \\newcommand{\\ecGeschlecht}{${geschlecht === 'm' ? 0 : 1}}
  `

  const latexCode = `
  \\documentclass[version=last]{scrlttr2}
\\usepackage[ngerman]{babel}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{hyperref}
\\usepackage{graphicx}
\\usepackage{eso-pic}
\\usepackage{tikz}
\\parindent0mm

\\usepackage[bottom=0em]{geometry}

${settings}

\\newcommand{\\ifGeschlecht}[2]{
    \\ifnum\\ecGeschlecht=0
        #1
    \\else
        #2
    \\fi
}


\\makeatletter
  \\@setplength{lochpos}{\\oddsidemargin}
  \\@addtoplength{lochpos}{1.05in}
\\makeatother

\\renewcommand*{\\raggedsignature}{\\raggedright}
\\usepackage{helvet}
\\renewcommand{\\familydefault}{\\sfdefault}


\\setkomavar{date}{}
\\KOMAoptions{foldmarks=blmtp, firstfoot=false}
\\setkomavar{subject}{Erweitertes Führungszeugnis}


\\setkomavar{signature}{
    \\begin{tikzpicture}
         \\node[anchor=south west,inner sep=0] (Bild) at (0,0) {\\includegraphics[width=4cm]{/root/ec-api/master/tmp/unterschrift.png}};
         \\draw[dashed] (0,1.1) -- (4,1.1);
         \\node[anchor=south west,inner sep=0] (Bild) at (0.3,0.1) {Thomas Seeger};
         \\begin{footnotesize}
            \\node[anchor=south west,inner sep=0] (Bild) at (0.3,-0.45) {(EC-Nordbund)};
         \\end{footnotesize}
    \\end{tikzpicture}
} 

\\begin{document}
\\begin{letter}{
    ~~~~~\\ifGeschlecht{Herr}{Frau}\\ecName\\vspace{2.5mm}\\\\
    ~~~~~~\\ecStrasse\\\\
    ~~~~~~\\ecPLZ{} \\ecOrt
}
\\AddToShipoutPictureBG{\\includegraphics[width=\\paperwidth,height=\\paperheight]{/root/ec-api/master/tmp/hintergrund.png}}
\\opening{Hiermit fordern wir, der EC-Nordbund,}
\\ifGeschlecht{Herrn}{Frau}\\textbf{\\ecName} (\\ecGebDat) auf, für\\ifGeschlecht{seine}{ihre}Tätigkeit als \\textbf{\\ifGeschlecht{Mitarbeiter}{Mitarbeiterin}in unseren Kinder- und Jugendangeboten und auf unseren Freizeiten (Maßnahmen der Kinder- und Jugenderholung nach §11 SGB VIII)} bei der zuständigen Meldebehörde einen Antrag auf Ausstellung eines erweiterten Führungszeugnisses gem. §30a BZRG zu stellen und uns dieses vorzulegen. Gemäß §72a SGB VIII tragen wir als Träger der Jugendhilfe Verantwortung für die persönliche Eignung der bei uns tätigen Personen.\\\\

Der EC-Nordbund ist anerkannter Träger der freien Jugendhilfe gemäß §75 SGB VIII und nimmt Aufgaben der Kinder- und Jugendhilfe im Sinne des §11 SGB VIII wahr. Wir bestätigen, dass die Voraussetzungen für die Erteilung eines erweiterten Führungszeugnisses nach §30a Abs. 1 BZRG vorliegen.\\\\

Wir bitten darum, \\ecName{} Gebührenbefreiung gemäß §12 JVKostO zu gewähren, da es sich um eine ehrenamtliche Tätigkeit in unserem als gemeinnützig anerkannten Verein handelt.\\\\
\\closing{Mit freundlichen Grüßen}
\\end{letter}
\\end{document}
  `

  return new Promise<string>((res, rej) => {
    let pdf = latex(latexCode)
    console.log(__dirname)
    pdf.pipe(createWriteStream(join(__dirname, '../../tmp/output.pdf')))
    pdf.on('error', rej)
    pdf.on('finish', () => {
      res(readFileSync(join(__dirname, '../../tmp/output.pdf')).toString('base64'))
    })
  })
}
