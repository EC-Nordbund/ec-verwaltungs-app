<template lang="pug">
  v-card-text
    v-list(two-line)
      v-list-tile(v-for="a in data.ak" @click="$router.push({path: `/ak/${a.ak.akID}`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title AK: {{a.ak.bezeichnung}}
          v-list-tile-sub-title {{stadien[a.currentStatus]}}
      v-divider(v-if="data.fzs.length>0")
      v-list-tile(v-for="fz in data.fzs" @click="showAll(fz.kommentar)")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title FZ | {{fz.kommentar}}
          v-list-tile-sub-title gesehen von: {{fz.gesehenVon.vorname}} {{fz.gesehenVon.nachname}} am {{fz.fzVon.german}}
      v-divider(v-if="data.fzAntraege.length>0")
      v-list-tile(v-for="fz in data.fzAntraege")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{fz.erzeugt.german}}
          v-list-tile-sub-title FZ-Antrag
      template(v-if="data[el]" v-for='el in ["Fuehrerschein", "Rettungsschwimmer", "ErsteHilfe"]')
        v-divider
        v-list-tile(@click="")
          v-list-tile-action
            v-icon person
          v-list-tile-content
            v-list-tile-title {{el}}
            v-list-tile-sub-title Tag
      v-divider(v-if="data.Notizen")
      v-list-tile(v-if="data.Notizen" @click="showAll(data.Notizen)")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.Notizen}}
          v-list-tile-sub-title Notizen
      v-divider(v-if="data.juLeiCaNr")
      v-list-tile(v-if="data.juLeiCaNr" @click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.juLeiCaNr}}
          v-list-tile-sub-title JuLeiCaNr
      v-divider(v-if="data.ecKreis")
      v-list-tile(v-if="data.ecKreis" @click="")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.ecKreis.bezeichnung}}
          v-list-tile-sub-title EC-Kreis
    
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};

  @Prop({default: {person: {}}})
  private data!: any 

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ];

  showAll(value: string) {
    this.$dialog.notify.info(value)
  }
}
</script>
