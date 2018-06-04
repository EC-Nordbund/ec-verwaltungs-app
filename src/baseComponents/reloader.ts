import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import auth from "@/plugins/auth";

export default abstract class reloader extends Vue {
  variabels: any
  _query: any
  data: any
  query: any
  auth = auth
  
  created() {
    this.loadData()
  }

  loadData() {
    this._query = (<any>this.$apollo).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: 'cache-and-network',
      pollInterval: auth.pollInterval
    })
    this._query.subscribe((val:any) => {
      if (val.data) {
        this.data = val.data
      }
    })
  }

  refetch() {
    this._query.refetch().then((val: any) => {
      this.data = val.data
    })
  }
}