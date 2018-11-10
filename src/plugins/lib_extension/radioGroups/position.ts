import { CreateElement } from 'vue'
import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'

/**
 * PositionsRadioButton
 *
 * @export
 * @class geschlechtRadio
 * @extends {Vue}
 */
@Component({})
export default class positionRadio extends Vue {
  /**
   * Items
   *
   * @memberof positionRadio
   */
  items = [
    { label: 'Teilnehmer', value: 1 },
    { label: 'Mitarbeiter', value: 2 },
    { label: 'Küchenmitarbeiter', value: 3 },
    { label: 'Leiter', value: 4 },
    { label: 'Hauptleiter', value: 5 }
  ]

  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof positionRadio
   */
  render(h: CreateElement) {
    return h('ec-form-radio', {
      props: {
        ...this.$attrs,
        items: this.items,
        values: this.value
      },
      attrs: {
        ...this.$attrs
      },
      on: {
        ...this.$listeners
      }
    })
  }

  /**
   * Value-Prop
   *
   * @type {(string | number)}
   * @memberof radio
   */
  @Prop({
    type: [String, Number],
    required: false,
    default: ''
  })
  value!: string | number
}
