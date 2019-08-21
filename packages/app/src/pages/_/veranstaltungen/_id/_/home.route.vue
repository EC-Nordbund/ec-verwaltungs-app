<template lang="pug">
  v-card-text(style="overflow: auto;")
    v-list(two-line subheader)
      v-list-tile(@click="" ripple)
        v-list-tile-content
          v-progress-linear(
            :value="seatBar.first.count * 100 / data.anzahlPlaetze"
            :buffer-value="(seatBar.first.count + seatBar.second.count) * 100 / data.anzahlPlaetze"
            :color="seatBar.first.color"
            :background-color="seatBar.second.color"
            height="20"
            rounded
            class="seat-bar-background")
          v-list-tile-sub-title(class="text-center text-xs-center")
            p(:v-if="seatBar.first.count + seatBar.second.count > 0")
              strong 
                | {{ seatBar.first.count + seatBar.second.count }} Anmeldungen 
              | {{letzteAnmeldung}}
      v-divider
      v-list-tile(@click="" disabled)
        v-list-tile-action
          v-icon info
        v-list-tile-content
          v-list-tile-title {{data.veranstaltungsID}}
          v-list-tile-sub-title VeranstaltungsID
      v-list-tile(@click="$router.push({path: `/personen/${data.hauptleiter.person.personID}/home`, query: {prev: $route.fullPath}})" v-if="data.hauptleiter")
        v-list-tile-action
          v-icon person
        v-list-tile-content
          v-list-tile-title {{data.hauptleiter.person.vorname}} {{data.hauptleiter.person.nachname}}
          v-list-tile-sub-title Hauptleiter
      v-list-tile(@click="")
        v-list-tile-action
          v-icon event
        v-list-tile-content
          v-list-tile-title {{data.begin.german}} - {{data.ende.german}}
          v-list-tile-sub-title Zeitraum
      v-list-tile(@click="$router.push({path: `/veranstaltungsort/${data.veranstaltungsort.vOrtID}/home`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon location_on
        v-list-tile-content
          v-list-tile-title {{data.veranstaltungsort.bezeichnung}}
          v-list-tile-sub-title {{data.veranstaltungsort.ort}} ({{data.veranstaltungsort.plz}}) [{{data.veranstaltungsort.land}}]
    v-divider
    v-list(three-line)
      v-list-tile(@click="")
        v-list-tile-action
          v-icon date_range
        v-list-tile-content
          v-list-tile-title Altersspanne
          v-list-tile-sub-title  
            v-range-slider(
              :value="[data.minTNAlter, Math.min(99,data.maxTNAlter)]"
              :min="Math.max(0, data.minTNAlter - (data.maxTNAlter-data.minTNAlter)*0.5)"
              :max="Math.min(99, (data.maxTNAlter-data.minTNAlter)*0.5 + data.maxTNAlter)"
              thumb-label="always"
              thumb-size="26"
              class="pt-3 px-3"
              always-dirty
              readonly)
      v-list-group(prepend-icon="event_seat" value)
        template(v-slot:activator)
          v-list-tile
            v-list-tile-content
              v-list-tile-title Teilnehmer-Plätze (
                span(class="male--text") {{data.anzahlPlaetzeM}} 
                | / 
                span(class="female--text") {{data.anzahlPlaetzeW}}
                | )
              v-list-tile-sub-title
                v-slider(
                  :value="data.anzahlPlaetze"
                  :min="0"
                  thumb-label="always"
                  thumb-size="26"
                  class="pt-3 px-3"
                  readonly
                  )     
        v-list-tile(@click="")
          v-list-tile-action
            v-icon(color="male") mdi-human-male
          v-list-tile-content
              v-list-tile-sub-title
                v-slider(
                  :value="data.anzahlPlaetzeM"
                  color="male"
                  :min="0"
                  :max="data.anzahlPlaetze"
                  thumb-label="always"
                  thumb-size="26"
                  class="pt-3 px-3"
                  always-dirty
                  readonly
                  )
        v-list-tile(@click="")
          v-list-tile-action
            v-icon(color="female") mdi-human-female
          v-list-tile-content
              v-list-tile-sub-title
                v-slider(
                  :value="data.anzahlPlaetzeW"
                  color="female"
                  :min="0"
                  :max="data.anzahlPlaetze"
                  thumb-label="always"
                  thumb-size="26"
                  class="pt-3 px-3"
                  always-dirty
                  readonly
                  )      
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { log } from 'util';
import anmeldungen from '../../../../../../../api/src/schema/mutationen/anmeldungen';

@Component({})
export default class EcNAME extends Vue {
  public static meta = {};

  @Prop()
  private data!: any;
  private seatBar = {
    first: {
      count: 0,
      color: 'primary',
      label: ''
    },
    second: {
      count: 0,
      color: '',
      label: ''
    }
  };

  // private letzteAnmeldung!: any

  private get countMale(): number {
    return this.data.anmeldungen.filter(
      (a: any) => a.person.geschlecht === 'm' && a.wartelistenPlatz === 0
    ).length;
  }

  private get countFemale(): number {
    return this.data.anmeldungen.filter(
      (a: any) => a.person.geschlecht === 'w' && a.wartelistenPlatz === 0
    ).length;
  }

  private get letzteAnmeldung(): string {
    var string = '';

    const today = new Date();
    const anmldn = this.data.anmeldungen.filter(
      a => a.wartelistenPlatz === 0
    );

    // show nothing
    if (anmldn.length < 1) {
      return '';
    }

    const dt = anmldn!
      .reduce((rec, curr) =>
        new Date(rec.anmeldeZeitpunkt.german).getUTCDate() -
          new Date(curr.anmeldeZeitpunkt.german).getUTCDate() <
        0
          ? rec
          : curr
      )
      .anmeldeZeitpunkt.german.split(/\.|:| \- /);
    const last = new Date(dt[2], dt[1], dt[0], dt[3], dt[4]);

    if (
      last.getMonth() == today.getMonth() + 1 &&
      last.getFullYear() == today.getFullYear()
    ) {
      const delta = today.getDate() - last.getDate();
      switch (today.getDate() - last.getDate()) {
        case 0:
          string = 'um ' + last.getHours() + ':' + last.getMinutes();
          break;

        case 1:
          string = 'gestern';
          break;

        default:
          string = 'vor ' + delta + ' Tagen';
          break;
      }
    } else {
      string =
        'am ' +
        last.getDate() +
        '.' +
        last.getMonth() +
        '.' +
        last.getFullYear();
    }

    return '• (letzte ' + string + ')';
  }

  private sortSeatBar() {
    console.log(this.data.anzahlPlaetzeM +" | "+this.data.anzahlPlaetzeW);
    

    // sex largest proportion gets first
    if (this.data.anzahlPlaetzeM < this.data.anzahlPlaetzeW) {
      this.seatBar.first = {
        count: this.countFemale,
        color: 'female',
        label: 'Frauen'
      };
      this.seatBar.second = {
        count: this.countMale,
        color: 'male',
        label: 'Männer'
      };
    } else {
      this.seatBar.first = {
        count: this.countMale,
        color: 'male',
        label: 'Männer'
      };
      this.seatBar.second = {
        count: this.countFemale,
        color: 'female',
        label: 'Frauen'
      };
    }
  }

  private created() {
    this.sortSeatBar();
  }

  private beforeUpdate() {
    this.sortSeatBar();
    // this.getLetzteAnmeldung();
  }
}
</script>

<style scoped>
.seat-bar-background {
  background-color: #eee;
}

.seat-bar-text-color {
  color: white;
}
</style>