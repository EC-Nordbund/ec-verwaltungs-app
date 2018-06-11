import widgetContainer from '@/plugins/widgets/widgetContainer.vue';
import widgetContainerSettings from '@/plugins/widgets/widgetContainerSettings.vue';
import widgetElement from '@/plugins/widgets/widgetElement.vue';
import widgetElementSettings from '@/plugins/widgets/widgetElementSettings.vue';
import widgetTab from '@/plugins/widgets/widgetTab.vue';
import widgetTabSettings from '@/plugins/widgets/widgetTabSettings.vue';
import Vue from 'vue';

Vue.component('ec-widget-container', widgetContainer)
Vue.component('ec-widget-tab', widgetTab)
Vue.component('ec-widget-element', widgetElement)
Vue.component(
  'ec-widget-container-settings',
  widgetContainerSettings
)
Vue.component('ec-widget-tab-settings', widgetTabSettings)
Vue.component(
  'ec-widget-element-settings',
  widgetElementSettings
)
