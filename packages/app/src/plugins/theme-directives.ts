import { theme } from '@/config/theme';
import Vue from 'vue';

export default {
  install(vue: typeof Vue) {
    // v-font directive
    vue.directive('font', {
      bind: (el: HTMLElement) => {
        el.style.fontFamily = 'ec-font'
      }
    })

    for (const key in theme) {
      if (theme.hasOwnProperty(key)) {
        //get Element
        const element: string = (<
          { [name: string]: string }
        >theme)[key]

        //Color
        vue.directive(key, {
          bind: (el: HTMLElement) => {
            el.style.color = element
          }
        })

        //BackgroundColor
        vue.directive(`${key}-bg`, {
          bind: (el: HTMLElement) => {
            el.style.backgroundColor = element
          }
        })
      }
    }
  }
}
