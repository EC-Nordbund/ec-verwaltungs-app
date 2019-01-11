import { Vue, Component } from "vue-property-decorator";
import { CreateElement } from 'vue';
import { ScopedSlotChildren } from 'vue/types/vnode';

@Component({})
export default class ecRequire extends Vue {
  render (h:CreateElement) {
    if((<any>window).require){
      if(this.$scopedSlots.default) {
        let result = this.$scopedSlots.default({
          electron: require('electron'),
          fs: require('fs'),
          path: require('path')
        });
        return h('div', (result instanceof Array ? result : [result]).concat(this.$slots.default))
      } else {
        return h('div', 'Ein fehler ist aufgetreten')
      }
    } else {
      return null
    }
  }
}