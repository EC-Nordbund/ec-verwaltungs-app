import { CreateElement } from 'vue';
import {
  Component,
  Prop,
  Vue,
  Watch
  } from 'vue-property-decorator';

@Component({})
export default class ecSettings extends Vue {
  @Prop({})
  path!: string;

  @Prop({})
  standard!: string;

  _value: any = "";

  @Watch("path", {immediate: true})
  onPathChange() {
    if ((<any>window).require) {
      this._value = require("electron-settings").get(this.path, this.standard);
    }
  }

  render(h: CreateElement) {
    if ((<any>window).require) {
      if (this.$scopedSlots.default) {
        let result = this.$scopedSlots.default({
          value: this._value,
          update: ($event: any) => {
            require("electron-settings").set(this.path, $event);
            this._value = $event;
          }
        });
        return h(
          "div",
          (result instanceof Array ? result : [result]).concat(
            this.$slots.default
          )
        );
      } else {
        return h("div", "Ein fehler ist aufgetreten");
      }
    } else {
      return null;
    }
  }
}
