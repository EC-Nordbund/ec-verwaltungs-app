import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator';
import { CreateElement } from 'vue';



@Component({})
export default class ecFormInputs extends Vue {
  @Prop({
    type: Array
  })
  config!: Array<any>;

  
  @Prop({
    type: Object,
    default: (()=>({}))
  })
  value!: any;

  @Watch('value', {immediate: true})
  onValueChange(){
    this.data = this.value
  }

  data:any = {}

  valid: boolean = false

  render(h:CreateElement) {
    const _self = this
    return h('v-form', 
    {
      on:{
        input($event:boolean){
          _self.$emit('valid', $event)
        }
      }
    },
    _self.config.map(
      input=>h(input.component, 
        {
          props: {
            value: _self.data[input.name],
            ...input
          },
          attrs: {
            ...input
          },
          on: {
            input($event:any) {
              _self.data[input.name] = $event
              _self.$emit('input', _self.data)
            }
          }
        }
      ))
    )
  }
}
