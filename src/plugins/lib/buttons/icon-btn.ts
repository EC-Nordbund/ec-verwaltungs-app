import { CreateElement } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class IconButton extends Vue {
  @Prop({
    type: String,
    required: false,
    default: 'edit'
  })
  icon!: string;
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
    );
  }
}
