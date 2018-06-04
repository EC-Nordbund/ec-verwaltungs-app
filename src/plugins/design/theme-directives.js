import Vue from 'vue';
import { theme } from '@/plugins/design/theme';

Vue.directive('font', {
  bind: el => {
    el.style.fontFamily = 'ec-font';
  }
})

Object.keys(theme).forEach((v) => {
  Vue.directive(v, {
    bind: el => {
      el.style.color = theme[v]
    }
  })

  Vue.directive(`${v}-bg`, {
    bind: el => {
      el.style.backgroundColor = theme[v]
    }
  })
})