import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * Form Element wrapper
 *
 * @export
 * @class formElement
 * @extends {Vue}
 */
@Component({})
export default class formElement extends Vue {
  /**
   * Value das als Element.
   *
   * @type {*}
   * @memberof formElement
   */
  @Prop({
    default: '',
    required: false,
    type: [Object, String, Boolean, Number, Array]
  })
  public value!: any

  /**
   * Name des Components
   *
   * @type {string}
   * @memberof formElement
   */
  @Prop({
    type: String,
    required: false,
    default: 'v-text-field'
  })
  public componentName!: string

  /**
   * RenderFunktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof formElement
   */
  public render(h: CreateElement) {
    return h(this.componentName, {
      props: {
        value: this.value,
        ...this.$attrs
      },
      attrs: {
        ...this.$attrs
      },
      on: {
        input: ($event: any) => {
          this.$emit('input', $event)
        }
      }
    })
  }
}
