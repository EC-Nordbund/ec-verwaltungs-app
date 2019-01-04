<template>
  <ec-wrapper title="Impressum" mini>
    <v-card-text>
      <h1 v-font>Vielen Dank für deinen Einsatz im EC-Nordbund</h1>
      <p>Diese App wurde ausschließlich für den EC-Nordbund entwickelt. Da sie OpenSource ist (unter GNU 3 Lizenz) darfst du sie gerne als Basis für deine eigene Applikation nutzen. Diese muss aber nach Lizenzbedingungen ebenfalls unter GNU 3 (oder einer späteren Version) veröffentlicht werden. Beachte dazu auch die Nutzungsbedingung der Losungen, da du diese nicht einfach verwenden darfst!</p>
      <h1 v-font>Die Losungen</h1>
      <p>Wir danken <a href="http://www.herrnhuter.de">Herrnhuter Brüdergemeine</a> für die Erlaubnis der Nutzung der <a href="http://www.losungen.de">Losungen</a>.</p>
      <h1 v-font>Probleme und Funktionswünsche</h1>
      <p>Bei Problemen und Funktionswünsche wende dich bitte an Tobias Krause und Sebastian Krüger via <a href="mailto:app@ec-nordbund.de">app@ec-nordbund.de</a>, die dieses Programm entwickelt haben. Gebe bitte dabei genau an, wie sich das Problem reproduzieren lässt und deinen Benutzernamen an.</p>
      <h1 v-font>Ich brauche Hilfe!</h1>
      <p>Bitte schaue dir in diesem Fall unsere Hilfe an, die du unter dem Punkt Hilfe findest.</p>
      <p>Solltest du dort nicht finden, was du suchst schreibe eine E-Mail an Tobias Krause, Sebastian Krüger (<a href="mailto:app@ec-nordbund.de">app@ec-nordbund.de</a>) oder an Thomas Seeger (<a href="mailto:referent@ec-nordbund.de">referent@ec-nordbund.de</a>).</p>
      <h1 v-font>Wir benutzen hauptsächlich folgenden OpenSource Frameworks</h1>
      <v-card>
        <v-card-text>
          <h2>Electron</h2>
          Version: <b>{{electronVersion}}</b><br>
          Lizent: <b>MIT</b>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <h2>Vue</h2>
          Version: <b>{{vueVersion}}</b><br>
          Lizent: <b>MIT</b>
        </v-card-text>
      </v-card>
      <v-card>
        <v-card-text>
          <h2>Vuetify</h2>
          Version: <b>{{vuetifyVersion}}</b><br>
          Lizent: <b>MIT</b>
        </v-card-text>
      </v-card>
    </v-card-text>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Vuetify from 'vuetify'
@Component({})
export default class Impressum extends Vue {
  electronVersion = (<any>window).process.versions.electron
  vueVersion = (<any>Vue).version
  vuetifyVersion = Vuetify.version
}
</script>
