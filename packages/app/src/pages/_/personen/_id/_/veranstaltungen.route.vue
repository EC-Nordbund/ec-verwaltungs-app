<template lang="pug">
  v-card-text
    v-list(two-line)
      template(v-for="(anmeldung, id) in data.anmeldungen")
        v-divider(v-if="id!==0")
        v-list-tile(@click="$router.push({path: `/anmeldungen/${anmeldung.anmeldeID}/home`, query: {prev: $route.fullPath}})")
          v-list-tile-action
            v-icon event
          v-list-tile-content
            v-list-tile-title {{anmeldung.veranstaltung.bezeichnung}} | ({{anmeldung.veranstaltung.begin.german}} - {{anmeldung.veranstaltung.ende.german}})
            v-list-tile-sub-title Rolle: {{rollen[anmeldung.position-1]}} | AnmeldeID: {{anmeldung.anmeldeID}}
        
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
}
</script>
