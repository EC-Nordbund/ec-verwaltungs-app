import { Component, Vue, Prop } from 'vue-property-decorator';
import {CreateElement} from 'vue';

@Component({})
export default class FormRoot extends Vue {
  @Prop()
  public value!: any;

  @Prop()
  public schema!: any;

  public render(h: CreateElement) {
    return h('div', this.schema.map((field: any) => h(
      'form_' + field.type,
      {
        props: {
          schema: {
            clickPrependInner: () => {},
            clickPrependOuter: () => {},
            clickPrepend: () => {},
            clickAppend: () => {},
            clickAppendInner: () => {},
            clickAppendOuter: () => {},
            ...field
          },
          value: this.value[field.name]
        },
        on: {
          input: ($event: string|number|boolean) => {
            this.value[field.name] = $event;
          }
        }
      }
    )));
  }
}
