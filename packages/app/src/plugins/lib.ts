import Vue from "vue";

export default {
  install(vue: typeof Vue, options: { util: any }) {
    const requireComponent = require.context(
      "../lib",
      true,
      /(\w+\.vue|\w+\.ts)/
    );

    requireComponent.keys().map((fileName: string) => {
      const componentConfig = requireComponent(fileName);
      const component = componentConfig.default || componentConfig;
      vue.component(component.name, component);
      options.util.niceLogging(
        "Libary-Component:",
        component.name.replace(/([A-Z])/g, "-$1").toLowerCase()
      );
    });
  }
};
