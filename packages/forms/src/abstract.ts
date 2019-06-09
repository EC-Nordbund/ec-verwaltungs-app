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

  @Prop({
    required: true,
  })
  public cancel!: any;

  @Prop({
    required: true,
  })
  public save!: any;

  public changeValue(value: any) {
    this.$emit('input', value);
  }
}
