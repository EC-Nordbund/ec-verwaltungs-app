import {CreateElement} from 'vue'
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class geschlechtRadio extends Vue {
  items = [
    {label: "Teilnehmer", value: 1},
    {label: "Mitarbeiter", value: 2},
    {label: "Küchenmitarbeiter", value: 3},
    {label: "Küchenleitung", value: 4},
    {label: "Leiter", value: 5},
    {label: "Hauptleiter", value: 6}
  ]

  render(h: CreateElement) {
    return h(
      'ec-form-radio',
      {
        props: {
          ...this.$attrs,
          items: this.items
        },
        attrs: {
          ...this.$attrs
        },
        on: { 
          ...this.$listeners
        }
      }
    )
  }
} 
