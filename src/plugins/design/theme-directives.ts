import Vue from 'vue';
import { theme } from '@/plugins/design/theme';

// v-font directive
Vue.directive('font', {
  bind: (el: HTMLElement) => {
    el.style.fontFamily = 'ec-font';
  }
});

for (const key in theme) {
  if (theme.hasOwnProperty(key)) {
    const element: string = (<{ [name: string]: string }>(
      theme
    ))[key];

    //Color
    Vue.directive(key, {
      bind: (el: HTMLElement) => {
        el.style.color = element;
      }
    });

    //BackgroundColor
    Vue.directive(`${key}-bg`, {
      bind: (el: HTMLElement) => {
        el.style.backgroundColor = element;
      }
    });
  }
}
