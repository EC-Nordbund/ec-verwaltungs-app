import { vuePlugin } from "api-socket-io/src/vue";
import Vue from "vue";
import { api } from "../../../api/src/api";
Vue.use(vuePlugin, {
    api,
    url: 'http://dev.api.ec-nordbund.de:4000/'
})
