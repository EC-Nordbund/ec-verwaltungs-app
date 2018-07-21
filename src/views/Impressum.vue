<template>
  <ec-wrapper title="Impressum" mini>
    <h1 v-font color="primary">Vielen Dank für deinen Einsatz im EC-Nordbund</h1>
    <p>Diese App wurde ausschließlich für den EC-Nordbund entwickelt. Da sie OpenSource ist (unter GNU 3 Lizenz) darfst du sie gerne als Basis für deine eigene Applikation nutzen. Diese muss aber nach Lizenzbedingungen ebenfalls unter GNU 3 (oder einer späteren Version) veröffentlicht werden.</p>
    <h1>Probleme und Funktionswünsche</h1>
    <p>Bei Problemen und Funktionswünsche wende dich bitte an Tobias Krause und Sebastian Krüger via <a href="mailto:app@ec-nordbund.de">app@ec-nordbund.de</a>, die dieses Programm entwickelt haben. Gebe bitte dabei genau an, wie sich das Problem reproduzieren lässt und deinen Benutzernamen an.</p>
    <h1>Ich brauche Hilfe!</h1>
    <p>Bitte schaue dir in diesem Fall unsere Hilfe an, die du unter dem Punkt Hilfe findest.</p>
    <p>Solltest du dort nicht finden, was du suchst schreibe eine E-Mail an Tobias Krause, Sebastian Krüger (<a href="mailto:app@ec-nordbund.de">app@ec-nordbund.de</a>) oder an Thomas Seeger (<a href="mailto:referent@ec-nordbund.de">referent@ec-nordbund.de</a>).</p>
  </ec-wrapper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Impressum extends Vue {}
</script>
