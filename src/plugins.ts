import apolloPlugin from '@/realPlugins/apollo';
import themDirectivesPlugin from '@/realPlugins/design/theme-directives';
import vuetifyPlugin from '@/realPlugins/design/vuetify';
import electronPlugin from '@/realPlugins/electron';
import errorPlugin from '@/realPlugins/error';
import updateCheckerPlugin from '@/realPlugins/updateChecker';
import Vue from 'vue';

Vue.use(electronPlugin)
Vue.use(updateCheckerPlugin)
Vue.use(apolloPlugin)
Vue.use(errorPlugin)
Vue.use(vuetifyPlugin)
Vue.use(themDirectivesPlugin)

export default () => ({
  apolloProvider: apolloPlugin.getProvider()
})
