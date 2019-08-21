<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line)
      v-list-tile(@click="$router.push({path: `/anmeldungen/${anmeldung.anmeldeID}/home`, query:{prev: $route.fullPath}})" v-for="anmeldung in data.anmeldungen.map(a=>a).sort((a,b)=>(b.wartelistenPlatz - a.wartelistenPlatz))" :class="`wlist-${anmeldung.wartelistenPlatz} wlist`")
        v-list-tile-avatar
          v-icon(:color="getStatusColor(anmeldung.wartelistenPlatz)") account_circle
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

  private getStatusColor(wplatz: number) {
    if (wplatz === 0) {
      return 'success';
    } else if (wplatz === -1) {
      return 'grey';
    } else {
      return `warning`;
    }
  }

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
/* .wlist:not(.wlist--1):not(.wlist-0) {
  background-color: yellow;
}
.wlist-0 {
  background-color: green;
}
.wlist--1 {
  background-color: red;
} */
</style>
