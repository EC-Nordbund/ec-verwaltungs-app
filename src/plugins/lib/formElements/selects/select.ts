import auth from "@/plugins/auth";
import { CreateElement } from "vue";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

export default class baseSelect extends Vue {
  public select: number = -1;
  public variabels: any;
  public query: any;
  public queryName !; : public string;
  public data !; : public Array<any>;
  public items: any[] = [];

  @Prop({
    type: [Number, String],
    required: false
  })
  public value !; : public number;

  public mapper !; : (item: any) => {
    id: number;
    beschreibung: string;
  };

@Watch("select")
  @Emit("input")
onSelectChange(value: number); {}

@Watch("value", {immediate: true})
onValueChange(value: number); {
    this.select = value;
  }

created(); {
    this.loadData();
  }

loadData(); {
    (this.$apollo as any).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: "cache-and-network",
      pollInterval: auth.pollInterval
    }).subscribe((val: any) => {
      if (val.data) {
        this.data = val.data[this.queryName];
        this.items = this.data.map(this.mapper);
      }
    });
  }
}
