import { CreateElement } from 'vue'
import { Component, Vue } from 'vue-property-decorator'

/**
 * Zurückbutton (router)
 *
 * @export
 * @class RouterBack
 * @extends {Vue}
 */
@Component({})
export default class RouterBack extends Vue {
  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof RouterBack
   */
  render(h: CreateElement) {
    return h(
      'v-btn',
      {
        props: {
          dark: true,
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: {
          click: () => {
            this.$router.back()
          },
          ...this.$listeners
        },
        directives: [
          {
            name: 'accent-bg',
            value: undefined,
            oldValue: undefined,
            expression: undefined,
            arg: '',
            modifiers: {}
          }
        ]
      },
      [h('v-icon', ['keyboard_arrow_left']), 'Zurück']
    )
  }
}
