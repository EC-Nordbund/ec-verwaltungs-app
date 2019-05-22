<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line)
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.anmeldeID}}
          v-list-tile-sub-title AnmeldeID (Wird dem TN/MA mitgeteilt)
      v-list-tile(@click="$router.push({path: `/personen/${data.person.personID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.person.vorname}} {{data.person.nachname}}
          v-list-tile-sub-title GebDat: {{data.person.gebDat.german}}
      v-list-tile(@click="$router.push({path: `/veranstaltungen/${data.veranstaltung.veranstaltungsID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.veranstaltung.bezeichnung}}
          v-list-tile-sub-title {{data.veranstaltung.begin.german}} - {{data.veranstaltung.ende.german}}
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{rollen[data.position - 1]}}
          v-list-tile-sub-title Rolle
      v-list-tile(v-if="data.wartelistenPlatz>0")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title Platz: {{data.wartelistenPlatz}}
          v-list-tile-sub-title Warteliste
      v-list-tile(v-if="data.wartelistenPlatz===0")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title Angemeldet
      v-list-tile(v-if="data.wartelistenPlatz<0")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title Abgemeldet
      v-divider
      v-list-tile(@click="alert('Hier erscheint irgendwann eine Karte...')")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.adresse.strasse}}
          v-list-tile-sub-title {{data.adresse.plz}} {{data.adresse.ort}}
      v-list-tile(@click='location.href=`mailto:${data.email.eMail}`')
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.email.eMail}}
      v-list-tile(@click='location.href=`tel:${data.telefon.telefon}`')
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.telefon.telefon  | telefon}}
      v-divider
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.anmeldeZeitpunkt.german}}
          v-list-tile-sub-title AnmeldeDatum
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.DSGVO_einverstaendnis.german}}
          v-list-tile-sub-title DSGVO-Zustimmung
      v-list-tile(v-if="data.bestaetigungsBrief")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.bestaetigungsBrief.german}}
          v-list-tile-sub-title Bestätigungsbrief
      v-list-tile(v-if="data.infoBrief")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.infoBrief.german}}
          v-list-tile-sub-title Infobrief
      v-list-tile(v-if="data.abmeldeZeitpunkt")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.abmeldeZeitpunkt.german}}
          v-list-tile-sub-title Abmeldezeitpunkt      
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAnmeldungenIdIndexHome extends Vue {
  public static meta = {};

  private rollen = [
    'Teilnehmer',
    'Mitarbeiter',
    'Küchenmitarbeiter',
    'Küchenleitung',
    'Leitung',
    'Hauptleitung'
  ];

  @Prop({default: {person: {}}})
  private data!: any;
}
</script>
