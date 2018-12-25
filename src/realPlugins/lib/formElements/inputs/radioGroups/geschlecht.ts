import {
  Component,
  Vue,
  Prop
} from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * Geschlechts-Radio-Buttons
 *
 * @export
 * @class geschlechtRadio
 * @extends {Vue}
 */
@Component({})
export default class geschlechtRadio extends Vue {
  /**
   * Items
   *
   * @memberof geschlechtRadio
   */
  items = [
    {
      label: 'Männlich',
      value: 'm',
      color: 'male'
    },
    {
      label: 'Weiblich',
      value: 'w',
      color: 'female'
    }
  ]

  /**
   * RenderFunktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof geschlechtRadio
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
