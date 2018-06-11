import { CreateElement } from 'vue';
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class switchEl extends Vue {
  render(h: CreateElement) {
    return h('v-switch', {
      props: {
        ...this.$attrs,
        value: this.intern_value
      },
      on: {
        change: (val: boolean) => {
          this.intern_value = val;
        }
      }
    });
  }

  intern_value: boolean = false

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  value!: boolean
  
  @Watch('value', {immediate: true})
  onValueChange(value: boolean) {
    this.intern_value = value
  }

  @Watch('intern_value')
  @Emit('input')
  onInternValueChange(value:boolean) {}
}
