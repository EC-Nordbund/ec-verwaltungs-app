import { CreateElement } from 'vue'
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'

/**
 * V-Switch Wrapper
 *
 * @export
 * @class switchEl
 * @extends {Vue}
 */
@Component({})
export default class switchEl extends Vue {
  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof switchEl
   */
  render(h: CreateElement) {
    return h('v-switch', {
      props: {
        ...this.$attrs,
        value: this.intern_value
      },
      on: {
        change: (val: boolean) => {
          this.intern_value = val
        }
      }
    })
  }

  /**
   * Interner Value
   *
   * @type {boolean}
   * @memberof switchEl
   */
  intern_value: boolean = false

  /**
   * Value-Prop
   *
   * @type {boolean}
   * @memberof switchEl
   */
  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  value!: boolean

  /**
   * Value
   *
   * @param {boolean} value
   * @memberof switchEl
   */
  @Watch('value', { immediate: true })
  onValueChange(value: boolean) {
    this.intern_value = value
  }

  /**
   * SwitchValue
   *
   * @param {boolean} value
   * @memberof switchEl
   */
  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value: boolean) {}
}
