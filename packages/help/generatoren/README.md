---
sidebar: auto
---

# Generatoren

> In diesem Bereich werden tw. Funktionen beschrieben, wie sie implementiert werden sollen.

## Allgemein

Um die Arbeit so weit wie möglich zu vereinfachen, setzen wir darauf, einmal mehr Arbeit in Biefe und TN-listen zu stecken, dafür dann aber im verlauf Zeit sparen zu können.
Ziel ist es also euch Arbeit abzunehmen oder zu erleichtern. Daher könnt ihr gerne anregungen etc. an uns melden, wir schauen dann ob das gut umsetzbar ist.

## Definitionen

## TN-Listen

In den Veranstaltungsdetails gibt es aktuell einen Button um TN-Listen aus einem Template zu generieren. Dabei wird dann die Excel Liste "mit Leben gefüllt".
Thomas hat von uns entsprechende Templates bekommen, die er für jede Veranstaltung anpassen kann.

Was später sein soll wird aktuell diskutiert ;)

Diese Listen zu erstellen ist sehr komplex, daher folgt hier (erstmal) keine Anleitung. Wenn eine gebrauct wird einfach an <a href="mailto:app@ec-nordbund.de">app@ec-nordbund.de</a> schreiben.

## Briefe

Ein Brief ist ein Word-Dokument (.docx) [also nach dem "OpenXML Standard" den Word ab Word 2007 nutzt].
Dieses wird von unserer Software verarbeitet und gewisse Textbausteine ("TAGS") werden ersetzt. Je nachdem wo der Brief eingelesen wird gibt es verschiedene TAGS.

Tags stehen immer in {} Klammern.

{value.name} gibt den Wert value.name aus.

Im folgenden listen wir nun die möglichen Tags auf. Diese Liste ist sehr wahrscheinlich nicht vollständig, und wird versucht aktuell zu halten. Je nach anwendungsort ändern sich die Tags.

### Anmeldungen

Wir verzichten auf eine Beschreibung bei den Dingen die klar sind.

| name                       |           Beschreibung           |
| -------------------------- | :------------------------------: |
| anmeldeID                  |   Eindeutioge ID der Anmeldung   |
| person.vorname             |                                  |
| person.nachname            |                                  |
| person.gebDat.german       | Geburtsdatum im Deutschen Format |
| person.geschlecht          |        Wert "m" oder "w"         |
| veranstaltung.bezeichnung  |                                  |
| veranstaltung.begin.german |                                  |
| veranstaltung.ende.german  |                                  |
| position                   |    "Rolle" auf Veranstaltung     |
| adresse.strasse            |                                  |
| adresse.ort                |                                  |
| adresse.plz                |                                  |
| email.eMail                |                                  |
| telefon.telefon            |                                  |
| wartelistenPlatz           |                                  |
| vegetarisch                |                                  |
| lebensmittelAllergien      |                                  |
| gesundheitsinformationen   |                                  |
| bemerkungen                |                                  |
| radfahren                  |                                  |
| fahrgemeinschaften         |                                  |
| klettern                   |                                  |
| sichEntfernen              |                                  |
| bootFahren                 |                                  |
| schwimmen                  |                                  |

Sollten weitere Felder oder Daten die sich aus anderen Daten ergeben benötigt werden einfach schreiben...

### Serienbriefe

<p style="text-align: center;color: gray">
  GNU Version 3 | Copyright © 2017-2018 S. Krüger & T. Krause für den EC-Nordbund
</p>
