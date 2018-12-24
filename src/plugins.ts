import apolloPlugin from '@/realPlugins/apollo';
import electronPlugin from '@/realPlugins/electron';
import errorPlugin from '@/realPlugins/error';
import updateCheckerPlugin from '@/realPlugins/updateChecker';
import Vue from 'vue';

Vue.use(electronPlugin)
Vue.use(updateCheckerPlugin)
Vue.use(apolloPlugin)
Vue.use(errorPlugin)

export default () => ({
  apolloProvider: apolloPlugin.getProvider()
})
