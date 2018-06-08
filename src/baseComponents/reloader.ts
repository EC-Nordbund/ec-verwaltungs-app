import auth from "@/plugins/auth";
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

export default abstract class reloader extends Vue {
  public variabels: any;
  public _query: any;
  public data: any;
  public query: any;
  public auth = auth;

  public created() {
    this.loadData();
  }

  public loadData() {
    this._query = (this.$apollo as any).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: "cache-and-network",
      pollInterval: auth.pollInterval,
    });
    this._query.subscribe((val: any) => {
      if (val.data) {
        this.data = val.data;
      }
    });
  }

  public refetch() {
    this._query.refetch().then((val: any) => {
      this.data = val.data;
    });
  }
}
