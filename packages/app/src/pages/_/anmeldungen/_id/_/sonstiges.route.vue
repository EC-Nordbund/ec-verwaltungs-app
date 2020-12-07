<template lang="pug">
v-card-text(style='overflow: auto')
  v-list(two-line)
    v-list-tile(v-if='data.vegetarisch')
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title Vegetarier
    v-list-tile(v-else)
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title Kein Vegetarier
    v-list-tile
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title {{ data.lebensmittelAllergien || "N/A" }}
        v-list-tile-sub-title Lebensmittelallergien
      v-list-tile-action
        v-btn(icon, @click='showAll("lebensmittelAllergien")')
          v-icon search
    v-divider
    v-list-tile
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title {{ data.gesundheitsinformationen || "N/A" }}
        v-list-tile-sub-title Gesundheitsinformationen
      v-list-tile-action
        v-btn(icon, @click='showAll("gesundheitsinformationen")')
          v-icon search
    v-list-tile
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title {{ data.bemerkungen || "N/A" }}
        v-list-tile-sub-title Bemerkungen
      v-list-tile-action
        v-btn(icon, @click='showAll("bemerkungen")')
          v-icon search
    v-divider
    v-list-tile
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title {{ data.radfahren ? "Rad fahren, " : "" }} {{ data.klettern ? "Klettern, " : "" }} {{ data.bootfahren ? "Boot fahren, " : "" }} {{ data.schwimmen > 0 ? "Schwimmen" : "" }}
        v-list-tile-sub-title Erlaubnisse
    v-list-tile(v-if='data.schwimmen > 0')
      v-list-tile-action
        v-icon person
      v-list-tile-content
        v-list-tile-title {{ schwimmStufen[data.schwimmen - 1] }}
        v-list-tile-sub-title Schwimmen
    template(v-if='data.wartelistenPlatz < 0')
      v-divider
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{ data.kommentarAbmeldung || "N/A" }}
          v-list-tile-sub-title Kommentar zur Abmeldung
        v-list-tile-action
          v-btn(icon, @click='showAll("kommentarAbmeldung")')
            v-icon search
      v-list-tile
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{ data.wegDerAbmeldung || "N/A" }}
          v-list-tile-sub-title Weg der Abmeldung
        v-list-tile-action
          v-btn(icon, @click='showAll("wegDerAbmeldung")')
            v-icon search
    template(v-if='data.extra_json.length > 2')
      v-divider
      p Extra Daten:
      v-treeview(
        :items='h(JSON.parse(data.extra_json))',
        v-if='data.extra_json.length > 2'
      )
      //-   v-list-tile-action
      //-     v-icon person
      //-   v-list-tile-content
      //-     v-list-tile-title {{data.extra_json}}
      //-     v-list-tile-sub-title Sonstige Felder
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class EcRootIndexAnmeldungenIdIndexSonstiges extends Vue {
  public static meta = {};

  @Prop({ default: { person: {} } })
  private data!: any;

  private schwimmStufen = [
    'Nichtschwimmer',
    'Mittelmäßiger Schwimmer',
    'Guter Schwimmer'
  ];

  public showAll(keyName: string) {
    this.$dialog.notify.info(this.data[keyName] || 'N/A');
  }

  public h(v: any, r = false) {
    let res: any[] = [];

    Object.keys(v).forEach((key) => {
      if (typeof v[key] === 'object') {
        res.push({
          name: key + ':',
          children: this.h(v[key])
        });
      } else {
        res.push({
          name: key + ': ' + v[key]
        });
      }
    });

    return res;
  }
}
</script>
