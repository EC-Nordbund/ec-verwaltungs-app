import { Component, Vue } from 'vue-property-decorator';
import { CreateElement } from 'vue'

@Component({})
export default class geschlechtRadio extends Vue {
  items = [
    {label: "Männlich", value: "m", color: this.$vuetify.theme.male},
    {label: "Weiblich", value: "w", color: this.$vuetify.theme.female}
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
