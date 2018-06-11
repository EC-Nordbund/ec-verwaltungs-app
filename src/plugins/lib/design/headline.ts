import { CreateElement } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Headline extends Vue {
  render(h: CreateElement) {
    return h(
      'span',
      {
        directives: [
          {
            name: 'primary',
            value: undefined,
            oldValue: undefined,
            expression: undefined,
            arg: '',
            modifiers: {}
          }
        ],
        staticClass: 'headline ec-size-2-2em',
        props: {
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: {
          ...this.$listeners
        }
      },
      [this.$slots.default]
    );
  }
}
