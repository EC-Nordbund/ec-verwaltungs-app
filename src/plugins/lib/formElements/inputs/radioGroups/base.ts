import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * Radio-Button-Base
 *
 * @export
 * @class radio
 * @extends {Vue}
 */
@Component({})
export default class radio extends Vue {
  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof radio
   */
  render(h: CreateElement) {
    return h(
      'v-radio-group',
      {
        props: {
          value: this.intern_value,
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: {
          change: (val: any) => {
            this.intern_value = val
          }
        }
      },
      this.items.map((item, index: number) => {
        return h('v-radio', {
          key: index,
          props: {
            label: item.label,
            value: item.value,
            color:
              item.color != undefined
                ? item.color
                : undefined
          }
        })
      })
    )
  }

  /**
   * Interner VValue
   *
   * @type {(string | number)}
   * @memberof radio
   */
  intern_value: string | number = ''

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

  /**
   * Items
   *
   * @type {Array<{
   *     label: string
   *     value: string
   *     color: string
   *   }>}
   * @memberof radio
   */
  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  items!: Array<{
    label: string
    value: string
    color: string
  }>

  @Watch('value', { immediate: true })
  onValueChange(value: string) {
    this.intern_value = value
  }

  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value: string) {}
}
