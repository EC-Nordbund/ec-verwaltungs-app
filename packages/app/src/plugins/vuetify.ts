import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import de from 'vuetify/src/locale/de';
import {theme} from '@/config/theme';

Vue.use(Vuetify);


// v-font directive
Vue.directive('font', {
  bind: (el: HTMLElement) => {
    el.style.fontFamily = 'ec-font';
  }
});

for (const key in theme) {
  if (theme.hasOwnProperty(key)) {
    // get Element
    const element: string = (theme as { [name: string]: string })[key];

    // Color
    Vue.directive(key, {
      bind: (el: HTMLElement) => {
        el.style.color = element;
      }
    });

    // BackgroundColor
    Vue.directive(`${key}-bg`, {
      bind: (el: HTMLElement) => {
        el.style.backgroundColor = element;
      }
    });
  }
}


export default {
  theme: {
    themes: {
      light: theme,
      dark: theme
    }
  },
  icons: {
    iconfont: 'md'
  },
  lang: {
    locales: { de },
    current: 'de'
  }
};
