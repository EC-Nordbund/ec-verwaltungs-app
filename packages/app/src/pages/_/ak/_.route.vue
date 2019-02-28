<template lang="pug">
  ec-wrapper(hasSheet hasDial v-bind="config" @reload="loadData")
    template(#header)
      div(style="padding: 2px 10px")
        ec-search(label="AK suchen" @suche="suche = $event")
    v-list(two-line)
      v-list-tile(v-for="item in data.filter(filterData)" :key="item.id" @click="$router.push({path: `/ak/${item.id}`, query: {prev: $route.fullPath}})")
        v-list-tile-action
          v-icon group
        v-list-tile-content
          v-list-tile-title {{item.bezeichnung}}
          v-list-tile-sub-title ID: {{item.id}}
    template(#sheet)
      v-list-tile(@click="addAKShow=true")
        v-list-tile-action
          v-icon group_add
        v-list-tile-title AK hinzufügen
    v-dialog(v-model="addAKShow" max-width="400px")
      v-card
        v-card-title
          h1(v-font v-primary) Neuen AK anlegen
        v-card-text
          v-form(v-model="addAKValid")
            formular(v-model="addAKValue" :schema=`[
              {
                name: 'bezeichnung',
                type: 'input',
                label: 'Bezeichnung',
                rule: "required|max:50",
                required: true,
                counter: 50
              }
            ]`)
        v-card-actions
          v-spacer
          v-btn(flat @click="addAKShow=false") Abbrechen
          v-btn(color="primary" :disabled="!addAKValid" @click="addAKSave") Speichern
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component({})
export default class EcRootAKRoot extends Vue {
  public static meta = {};

  private suche: string = '';

  private addAKValid = false;
  private addAKShow = false;
  private addAKValue: {bezeichnung: string} = {bezeichnung: ''};

  private data: any = [];

  private config = {
    sheet: [
      {
        icon: this.$util.icon.report,
        label: 'Aktuelle AK Mitglieder Report',
        click: () => {
          this.$dialog.warning({
            text: 'GENERATE CURRENT AK REPORT',
            title: 'TODO'
          });
        }
      },
      {
        icon: this.$util.icon.report,
        label: 'Alle AK Mitglieder Report',
        click: () => {
          this.$dialog.warning({
            text: 'GENERATE FULL AK REPORT',
            title: 'TODO'
          });
        }
      }
    ],
    title: 'Arbeitskreise'
  };
  private addAKSave() {
    this.addAKShow = false;
    this.addAKValue = {bezeichnung: ''};
    alert(`
      TODO: Abspeichern
      ${JSON.stringify(this.addAKValue)}
    `);
  }

  private loadData() {
    this.data = '........................................'.split('.').map((a, b) => ({
      id: b,
      bezeichnung: Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5) +  ' '
        + Math.random().toString(36).substr(2, 5) + Math.random().toString(36).substr(2, 5)
      // 'Jungschar'
    }));
    this.$dialog.error({
      text: 'Aktuell werden keine tasächlichen Daten benutzt!',
      title: 'Keine Daten'
    });
  }

  private filterData(item: any): boolean {
    return this.suche.split(' ').map((suche: string) => this.filterPart(item, suche)).reduce((a, b) => a && b, true);
  }

  private filterPart(item: any, suche: string): boolean {
    if (!suche) {
      return true;
    }
    if (typeof item === 'string') {
      return item.includes(suche);
    } else if (typeof item === 'number' || typeof item === 'boolean') {
      return item.toString().includes(suche);
    } else if (item) {
      return Object.keys(item).map((key) => this.filterPart(item[key], suche)).reduce((a, b) => a || b, false);
    } else {
      return false;
    }
  }

  private created() {
    this.loadData();
  }
}
</script>
