import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator';
import { CreateElement } from 'vue';

@Component({})
export default class radio extends Vue {
  render(h: CreateElement) {
    return h(
      'v-radio-group',
      {
        props: {
          value: this.intern_value,
          ...this.$attrs
        },
        attrs: {
          ...this.$attrs
        },
        on: {
          change: (val: any) => {
            this.intern_value = val;
          }
        }
      },
      this.items.map((item, index: number) => {
        return h('v-radio', {
          key: index,
          props: {
            label: item.label,
            value: item.value
          },
          style: {
            color: item.color
          }
        });
      })
    );
  }

  intern_value: string | number = '';

  @Prop({
    type: [String, Number],
    required: false,
    default: ''
  })
  value!: string | number;

  @Prop({
    type: Array,
    required: true,
    default: () => []
  })
  items!: Array<{
    label: string;
    value: string;
    color: string;
  }>;

  @Watch('value', { immediate: true })
  onValueChange(value: string) {
    this.intern_value = value;
  }

  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value: string) {}
}
