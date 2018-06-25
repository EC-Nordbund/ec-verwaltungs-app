import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from 'vue'

/**
 * Button for adding elments (floatingActionButton)
 */
@Component({})
export default class AddButton extends Vue {
  /**
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
