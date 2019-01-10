import Vue from "vue";
import { auth } from "@/plugins/auth";

import util from "@/plugins/util";

let options: any = {};

export default {
  getOptions() {
    return options;
  },
  install(vue: typeof Vue) {
    util.niceLogging("Dependency:", "Vue", (<any>Vue).version);
    if (util.isElectron) {
      util.niceLogging(
        "Dependency:",
        "Electron",
        (<any>window).process.versions.electron
      );
    }

    options.router = util.router(vue);

    const { apolloClient, apolloProvider } = util.apollo(vue);

    options.apolloProvider = apolloProvider;

    const requirePlugins = require.context("./plugins", true, /\w+\.(ts|js)/);

    requirePlugins.keys().map((fileName: string) => {
      const pluginFile = requirePlugins(fileName);
      const plugin = pluginFile.default || pluginFile;
      util.niceLogging("Plugin Installiert:", fileName, plugin.name);
      Vue.use(plugin, { router: options.router, apolloClient, auth, util });
    });
  }
};
