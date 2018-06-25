import { CreateElement } from 'vue'
import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator'

/**
 * Einfacher Button mit Icon
 *
 * @export
 * @class IconButton
 * @extends {Vue}
 */
@Component({})
export default class IconButton extends Vue {
  /**
   * Icon das angezeigt werden soll
   *
   * @type {string}
   * @memberof IconButton
   */
  @Prop({
    type: String,
    required: false,
    default: 'edit'
  })
  icon!: string

  /**
   * Render-Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof IconButton
   */
  render(h: CreateElement) {
    return h(
      'v-btn',
      {
        props: {
          icon: true,
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: this.$listeners
      },
      [
        h(
          'v-icon',
          {
            props: {
              color: 'secondary'
            }
          },
          [this.icon]
        )
      ]
    )
  }
}
