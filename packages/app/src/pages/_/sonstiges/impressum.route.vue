<template lang="pug">
  ec-wrapper(v-bind="config")
    h2(v-font v-primary) Versionen
    p Wir benutzen verschiedene Packete die alle unter OpenSource Lizenzen verfügbar sind. Dabei bilden folgende Packete unser Haupt-Framework:
    table
      tr
        th Packet
        th Version
      tr
        td Vue
        td {{version.vue}}
      tr
        td Vuetify
        td {{version.vuetify}}
      tr
        td Electron
        td {{version.electron}}
    h2(v-font v-primary) Lizenz
    ol
      // li Die Software darf innerhalb des EC-Nordbundes benutzt werden.
      // li Dritte können den Quellcode der Software einsehen und als basis für eigene Applikationen nutzen. Es muss aber angegeben werden, dass unsere Software als basis genutzt wurde.
      // li 
      // li Wir übernehmen keinerlei Haftung für den Quellcode. - Und es gibt daher außerhalb des EC-Nordbundes keinerlei Support.
      // li 
    h2(v-font v-primary) Lizenz-Losungen
    ol
      li Die Losungen dürfen ausschließlich unter dem Namen »Die Losungen« auf Internet-Seiten sowie in Freeware-Programmen für PCs/Desktops genutzt werden. Die Bereitstellung von Freeware-Programmen für mobile Endgeräte (Apps für Smartphone, Tablet, Handy) ist nicht gestattet. Alle Veröffentlichungen der Losungen erfolgen für den Nutzer kostenlos. Sogenannte InApp-Käufe sind nicht erlaubt. Diese Gestattung gewährt ein nicht ausschließliches Recht, welches jederzeit widerrufen werden kann.
      li Die Anzeige der Losungstexte besteht immer aus beiden Bibelversen, dem alttestamentlichen Text (der Losungsvers) und dem neutestamentlichen Vers (dem Lehrtext).
      li Es dürfen nur die auf der Internetseite www.losungen.de angebotenen Daten verwendet werden. Änderungen an den Losungstexten und den Stellenangaben sind nicht gestattet. Insbesondere die im Losungsbuch veröffentlichten dritten Texte, die den beiden Bibeltexten zugeordnet sind, unterliegen eigenen Lizenzvereinbarungen und dürfen deshalb für elektronische Weiterverarbeitung im Freeware-Bereich nicht verwendet werden.
      li Auf Internetseiten und in Losungs-Freeware-Programmen dürfen jeweils nur die Losungstexte des laufenden Jahres sowie die des dem laufenden Jahr vorangehenden und nachfolgenden Jahres bereitgestellt werden.
      li Auf Internet-Seiten, die auch kommerziellen Zwecken dienen, sowie in Software, die entgeltlich angeboten wird, dürfen die Losungen nicht verwendet werden. Gleiches gilt für Internetseiten und Softwareprogramme deren Inhalt geeignet ist, das Ansehen der Evangelischen Kirche und der Evangelischen Brüder-Unität - Herrnhuter Brüdergemeine herabzusetzen.
      li Anwendungen außerhalb dieser Nutzungsbedingungen bedürfen einer gesonderten Vereinbarung mit der Evangelischen Brüder-Unität - Herrnhuter Brüdergemeine.
      li Bei Fertigstellung einer Internetveröffentlichung ist ein entsprechender Link oder im Falle eines Losungs-Freeware-Programms eine Kopie an die unten genannte Adresse der Evangelischen Brüder-Unität - Herrnhuter Brüdergemeine zu übersenden.
      li Bei allen Veröffentlichungen der Losungen ist folgender gut sichtbarer Hinweis auf den Copyrightschutz der Losungen hinzuzufügen: »© Evangelische Brüder-Unität – Herrnhuter Brüdergemeine« (mit Link auf www.herrnhuter.de) sowie »Weitere Informationen finden sie hier.« (mit Link auf: www.losungen.de)
      li Bei Fragen und Anregungen, wenden Sie sich bitte an den Herausgeber: Evangelische Brüder-Unität, Zittauer Straße 20, 02747 Herrnhut, Deutschland, Telefon +49(0)35873 487-0, Fax: +49(0)35873 487-99, E-Mail: info(at)losungen.de Internet: www.herrnhuter.de 


</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Vuetify from 'vuetify';

@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};
  private version = {
    vue: Vue.version,
    vuetify: Vuetify.version,
    electron: '4.0.x'
  };
  private config = {
    title: 'Impressum'
  };
}
</script>
