import Vue from "vue";

const widgetContainer = () => import(/* webpackChunkName: "root-widgets-container" */"@/plugins/widgets/widgetContainer.vue");
// const widgetTab = () => import(/* webpackChunkName: "root-widgets-tab" */"@/plugins/widgets/widgetTab.vue");
// Register Container

Vue.component("ec-widget-container", widgetContainer);
// Vue.component("ec-widget-tab", widgetTab);
