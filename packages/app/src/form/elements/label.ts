import { Component, Vue, Mixins } from 'vue-property-decorator';
import abstractField from '@/form/abstract';

@Component({})
export default class FormInput extends Mixins(abstractField) {
  render(h:any) {
    return h(this.schema.tag, this.schema.config, this.schema.label)
  }
}