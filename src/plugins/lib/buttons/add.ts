import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 *
 */
@Component({})
export default class AddButton extends Vue {
  /**
   * Render Funktion
   * @param h Create Element
   */
  render(h: CreateElement) {
    return h(
      'v-btn',
      {
        props: {
          fab: true,
          ripple: true,
          absolute: true,
          right: true,
          bottom: true,
          color: 'primary',
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: {
          ...this.$listeners
        }
      },
      [h('v-icon', ['add'])]
    )
  }
}
