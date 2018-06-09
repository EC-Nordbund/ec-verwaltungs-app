import {
  Component,
  Prop,
  Vue
} from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component({})
export default class formElement extends Vue {
  @Prop({
    default: '',
    required: false,
    type: [Object, String, Boolean, Number]
  })
  public value!: any;

  @Prop({
    type: String,
    required: false,
    default: 'v-text-field'
  })
  public componentName!: string;

  public render(h: CreateElement) {
    return h(this.componentName, {
      props: {
        ...this.$attrs,
        value: this.value
      },
      attrs: {
        ...this.$attrs,
        value: this.value
      },
      on: {
        input: ($event: any) => {
          this.$emit('input', $event);
        }
      }
    });
  }
}
