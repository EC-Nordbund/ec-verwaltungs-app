import Vue from 'vue';
import { theme } from '@/plugins/design/theme';

// v-font directive
Vue.directive('font', {
  bind: el => {
    el.style.fontFamily = 'ec-font';
  }
});

//theme Direktives
Object.keys(theme).forEach(v => {
  //Color
  Vue.directive(v, {
    bind: el => {
      el.style.color = theme[v];
    }
  });

  //BackgroundColor
  Vue.directive(`${v}-bg`, {
    bind: el => {
      el.style.backgroundColor = theme[v];
    }
  });
});
