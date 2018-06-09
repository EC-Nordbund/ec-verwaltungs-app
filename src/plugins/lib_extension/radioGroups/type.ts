import { Component, Vue } from 'vue-property-decorator';
import {CreateElement} from 'vue'

@Component({})
export default class typeRadio extends Vue {
  items = [
    {label: "An", value: 1},
    {label: "CC", value: 2},
    {label: "BCC", value: 3}
  ]

  render(h: CreateElement) {
    return h(
      'ec-form-radio',
      {
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
      }
    )
  }
} 
