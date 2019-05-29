import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class AbstractField extends Vue {
  @Prop({
    required: true,
  })
  public schema!: any;

  @Prop({
    required: true,
  })
  public value!: any;

  public changeValue(value: any) {
    this.$emit('input', value);
  }
}
