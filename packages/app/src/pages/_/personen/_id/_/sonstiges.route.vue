<template lang="pug">
  v-card-text
    v-list(two-line)
      v-list-tile(v-for="a in data.ak" @click="$router.push({path: `/ak/${a.ak.akID}`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title AK: {{a.ak.bezeichnung}}
          v-list-tile-sub-title {{stadien[a.currentStatus]}}
      v-divider(v-if="data.fzs.length>0")
      v-list-tile(v-for="fz in data.fzs" @click="showAll(fz.kommentar)")
        v-list-tile-action
          v-icon assignment
        v-list-tile-content
          v-list-tile-title FZ vom {{fz.fzVon.german}} | {{fz.kommentar}}
          v-list-tile-sub-title gesehen von: {{fz.gesehenVon.vorname}} {{fz.gesehenVon.nachname}} gesehen am {{fz.gesehenAm.german}}
      v-divider(v-if="data.fzAntraege.length>0")
      v-list-tile(v-for="fz in data.fzAntraege")
        v-list-tile-action
          v-icon mail
        v-list-tile-content
          v-list-tile-title {{fz.erzeugt.german}}
          v-list-tile-sub-title FZ-Antrag
      v-divider(v-if="data.Notizen")
      v-list-tile(v-if="data.Notizen" @click="showAll(data.Notizen)")
        v-list-tile-action
          v-icon notes
        v-list-tile-content
          v-list-tile-title {{data.Notizen}}
          v-list-tile-sub-title Notizen
      template(v-for="juleica in data.juleica")
        v-divider()
        v-list-tile(@click="")
          v-list-tile-action
            v-icon credit_card
          v-list-tile-content
            v-list-tile-title {{juleica.juleicanummer}} 
            v-list-tile-sub-title JuLeiCa gültig bis {{juleica.gueltig_bis.german}}
      v-divider(v-if="data.ecKreis")
      v-list-tile(v-if="data.ecKreis" @click="")
        v-list-tile-action
          v-icon supervised_user_circle
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
  private data!: any;

  private stadien = [
    'Ausgetreten',
    'Mitglied',
    'Vertreter',
    'Leiter'
  ];

  public showAll(value: string) {
    this.$dialog.notify.info(value);
  }
}
</script>
