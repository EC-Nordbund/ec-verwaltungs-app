import { Prop, Vue } from 'vue-property-decorator';

//widgetsList
let widgets: { [id: string]: widget } = {}

/**
 * Widget Class
 *
 * @export
 * @class widget
 */
export class widget {
  constructor(
    public formConfig: any,
    id: string,
    public component: any
  ) {
    widgets[id] = this
  }
}

/**
 * WidgetComponentBase
 *
 * @export
 * @class widgetComponent
 * @extends {Vue}
 */
export class widgetComponent extends Vue {
  /**
   * Confuig Prop
   *
   * @type {*}
   * @memberof widgetComponent
   */
  @Prop({ type: Object, required: true })
  config!: any
}

// get Widgets
export default () => {
  return widgets
}
