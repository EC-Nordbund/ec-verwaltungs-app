/**
 * Config für Tab
 *
 * @export
 * @interface IConf
 * @extends {idLabel}
 */
export interface IConf extends idLabel {
  height: number
  width: number
  areas: string
  elements: Array<IWidgetConfig>
}

/**
 * WidgetConfig
 *
 * @export
 * @interface IWidgetConfig
 * @extends {idLabel}
 */
export interface IWidgetConfig extends idLabel {
  config: any
  widgetName: string
  area: string
}

/**
 * has ID + Label
 *
 * @interface idLabel
 */

interface idLabel {
  id: number
  label: string
}
