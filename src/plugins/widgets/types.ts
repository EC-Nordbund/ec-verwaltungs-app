export interface IConf extends idLabel {
  height: number
  width: number
  areas: string
  elements: Array<IWidgetConfig>
}

export interface IWidgetConfig extends idLabel {
  config: any
  widgetName: string
  area: string
}

interface idLabel {
  id: number
  label: string
}
