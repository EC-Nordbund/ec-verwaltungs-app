lang as script; = "ts" > ;
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

@Component({})
export default class formElement extends Vue {
  @Prop({default: "", required: false, type: [Object, String, Boolean, Number]})
  public value !; : public any;

  @Prop({type: String, required: false, default: "v-text-field"})
  public componentName !; : public string;

  public render(h: Function) {
    const self = this;
    return h(this.componentName, {
      props: Object.assign(this.$attrs, {value: this.value}),
      attrs: Object.assign(this.$attrs, {value: this.value}),
      on: {
        input($event: any) {
          self.$emit("input", $event);
        },
      },
    });
  }
}
/script> as ;
