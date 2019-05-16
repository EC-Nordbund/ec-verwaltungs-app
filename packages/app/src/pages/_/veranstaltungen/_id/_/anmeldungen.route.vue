<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line)
      v-list-tile(@click="" v-for="anmeldung in data.anmeldungen.map(a=>a).sort((a,b)=>(b.wartelistenPlatz - a.wartelistenPlatz))" :class="`wlist-${anmeldung.wartelistenPlatz} wlist`")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{anmeldung.person.vorname}} {{anmeldung.person.nachname}} ({{anmeldung.person.gebDat.german}}) | {{getTitle(anmeldung.wartelistenPlatz)}}
          v-list-tile-sub-title Rolle: {{rollen[anmeldung.position - 1]}}
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};
  @Prop()
  private data!: any;

  private rollen = [
    'Teilnehmer',
    'Mitarbeiter',
    'Küchenmitarbeiter',
    'Küchenleitung',
    'Leitung',
    'Hauptleitung'
  ];

  public getTitle(wplatz: number) {
    if (wplatz === 0) {
      return 'Angemeldet';
    } else if (wplatz === -1) {
      return 'Abgemeldet';
    } else {
      return `Auf Wartelistenplatz ${wplatz}`;
    }
  }
}
</script>
<style scoped>
.wlist:not(.wlist--1):not(.wlist-0) {
  background-color: yellow;
}
.wlist-0 {
  background-color: green;
}
.wlist--1 {
  background-color: red;
}
</style>
