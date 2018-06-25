import { Component, Vue } from 'vue-property-decorator'
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
        items: this.items
      },
      attrs: {
        ...this.$attrs
      },
      on: {
        ...this.$listeners
      }
    })
  }
}
