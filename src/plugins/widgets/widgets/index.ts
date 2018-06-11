import { Prop, Vue } from 'vue-property-decorator';

let widgets: { [id: string]: widget } = {}

export class widget {
  constructor(
    public formConfig: any,
    id: string,
    public component: any
  ) {
    widgets[id] = this
  }
}

export class widgetComponent extends Vue {
  @Prop({ type: Object, required: true })
  config!: any
}

export default () => {
  return widgets
}
