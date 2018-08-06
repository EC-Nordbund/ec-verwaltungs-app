import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * TypeRadio-Button
 *
 * @export
 * @class typeRadio
 * @extends {Vue}
 */
@Component({})
export default class typeRadio extends Vue {
  /**
   * Items
   *
   * @memberof typeRadio
   */
  items = [
    { label: 'An', value: 1 },
    { label: 'CC', value: 2 },
    { label: 'BCC', value: 3 }
  ]

  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof typeRadio
   */
  render(h: CreateElement) {
    return h('ec-form-radio', {
      props: {
        ...this.$attrs,
        items: this.items,
        value: this.value
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
