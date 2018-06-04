<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';

@Component({})
export default class formElement extends Vue {
  @Prop({default: "", required: false, type: [Object, String, Boolean, Number]})
  value!:any

  @Prop({type: String, required: false, default: 'v-text-field'})
  componentName!:string

  render(h: Function) {
    const self = this
    return h(this.componentName, {
      props: Object.assign(this.$attrs, {value: this.value}),
      attrs: Object.assign(this.$attrs, {value: this.value}),
      on: {
        input($event: any) {
          self.$emit("input", $event);
        }
      }
    })
  }
}
</script>
