<template lang="pug">
  ec-wrapper(v-bind="config")
    p
      b
      | Vielen Dank für DEINEN Einsatz beim EC-Nordbund
    p
      | Du bist Mitarbeiter des EC-Nordbundes in der Verwaltung. 
      | Nach der neuen Datenschutz-Grundverordnung (DSGVO) sind wir als EC-Nordbund verpflichtet unsere Mitarbeiter zum Thema Datenschutz aufzuklären. 
      | Dies soll hiermit passieren. Lese diesen Text bitte genau und aufmerksam. – Wir werden dir diesen Text wenigstens 2x pro Jahr vorlegen.
    h2(v-font v-primary) Erklärung
    p 
      | Einige von den folgenden Punkten werden nicht auf dich zutreffen. Wir haben verschiedene Nutzergruppen die Verschiedene Dinge machen können. 
      | Es gibt folgende Nutzergruppen:
    ul
      li Admin (Thomas Seeger + Entwickler)
      li Anmeldeverwaltung
      li Kasse
      li Vorstand
    p
      | Aktuell sind die einzelnen Gruppen noch wenig voneinander getrennt. 
      | Dies wird in der Zukunft immer mehr werden.
      | Sollten einzelne Abschnitte nur für bestimmte Nutzergruppen relevant sein steht das in der Überschrift.
    h2(v-font v-primary) Anmeldedaten
    p 
      | Du hast per E-Mail deine vorläufigen Anmeldedaten erhalten bitte ändere diese im Menüpunkt Profil. 
      | Wir empfehlen das Passwort regelmäßig zu wechseln und überall verschiedene Passwörter zu verwenden. 
      | Wir bitten dich ein Passwort zu nutzen, dass wenigstens 8 Zeichen lang ist und Zeichen von allen der folgenden Kategorien enthält:
    ul
      li Großbuchstabe
      li Kleinbuchstabe
      li Ziffer
      li Sonderzeichen
    p
      | Solltest du eine Gruppe auslassen empfehlen wir dir dein Passwort um mindestens 3 Zeichen zu verlängern. 
      | Solltest du 2 Gruppen auslassen sollte dein Passwort wenigstens 15 Zeichen enthalten.
    h2(v-font v-primary) Abmeldung
    p 
      | Du wirst automatisch nach 30min abgemeldet. Nach 25min erscheint eine Warnung. 
      | Solltest du deinen Arbeitsplatz verlassen solltest du dich abmelden. 
      | Aus Sicherheitsgründen wirst du automatisch abgemeldet, wenn du deinen Rechner in den StandBy schickst.
    h2(v-font v-primary) Kopieren von Daten
    p
      | Du erhältst Zugriff auf Personenbezogene Daten. 
      | Wir bitten dich mit diesen Daten sensibel vorzugehen und keine Daten aus dem Programm raus zu kopieren. (Außer es gibt einen Knopf dafür). 
      | Dies gilt daher nicht für generierte Dokumente etc.
    h2(v-font v-primary) Dokumente
    p 
      | Dokumente die aus dem Programm heraus erzeugt wurden sind nach der Nutzung wieder zu löschen. 
      | Standardmäßig werden die Dokumente in einem temporären Ordner gespeichert der bei der Nutzung von z.B. CCleaner automatisch gelöscht wird
    h2(v-font v-primary) Auskunftsrecht (Admin, Vorstand)
    p 
      | Sollte eine Person von ihrem Aukunftsrecht gebrauch machen wollen so wähle die Person aus und 
      | überprüfe ob der Kanal mit dem die Auskunft beantragt wurde auch in der Person vorhanden ist. 
      | Ist das nicht der Fall sollte die Person sich genauer identifizieren. 
      | Sende dabei die Daten nur an eine E-Mail Adresse die auch in unserer Kartei vorkommt.
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  private config = {
    title: 'Datenschutzerklärung'
  };
}
</script>
