<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.veranstaltungsID}}
          v-list-tile-sub-title VeranstaltungsID
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.bezeichnung}}
          v-list-tile-sub-title Bezeichnung
      v-list-tile(@click="$router.push({path: `/personen/${data.hauptleiter.person.personID}/home`, query: {prev: $route.fullPath}})" v-if="data.hauptleiter")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.hauptleiter.person.vorname}} {{data.hauptleiter.person.nachname}}
          v-list-tile-sub-title Hauptleiter
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.begin.german}} - {{data.ende.german}}
          v-list-tile-sub-title Zeitraum
      v-list-tile(@click="$router.push({path: `/veranstaltungsort/${data.veranstaltungsort.vOrtID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.veranstaltungsort.bezeichnung}}
          v-list-tile-sub-title {{data.veranstaltungsort.ort}} ({{data.veranstaltungsort.plz}}) [{{data.veranstaltungsort.land}}]
      v-divider
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.minTNAlter}} - {{data.maxTNAlter}}
          v-list-tile-sub-title Teilnehmer Alter
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.anzahlPlaetze}}
          v-list-tile-sub-title Anzahl Plätze für Teilnehmer
      v-list-tile(@click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title männlich: {{data.anzahlPlaetzeM}} | weiblich: {{data.anzahlPlaetzeW}}
          v-list-tile-sub-title Anzahl Plätze für Teilnehmer
      
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};
  @Prop()
  private data!: any;
}
</script>
