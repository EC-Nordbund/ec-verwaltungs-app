import widgetContainer from '@/plugins/widgets/widgetContainer.vue'
import widgetContainerSettings from '@/plugins/widgets/widgetContainerSettings.vue'
import widgetElement from '@/plugins/widgets/widgetElement.vue'
import '@/plugins/widgets/widgets/losungen.vue'
import '@/plugins/widgets/widgets/message.vue'
import widgetTab from '@/plugins/widgets/widgetTab.vue'
import Vue from 'vue'

Vue.component('ec-widget-container', widgetContainer)
Vue.component('ec-widget-tab', widgetTab)
Vue.component('ec-widget-element', widgetElement)
Vue.component(
  'ec-widget-container-settings',
  widgetContainerSettings
)
