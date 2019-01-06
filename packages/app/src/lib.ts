import Vue from 'vue';

const requireComponent = require.context("./lib", true, /(\w+\.vue|\w+\.ts)/);

const comps = requireComponent.keys().map((fileName: string) => {
  const componentConfig = requireComponent(fileName);
  const component = componentConfig.default || componentConfig;
  return {name: component.name, component};
});

comps.forEach(comp => {
  console.log(comp);
  Vue.component(comp.name, comp.component);
});
