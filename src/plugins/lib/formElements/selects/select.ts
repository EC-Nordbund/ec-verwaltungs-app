import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import auth from '@/plugins/auth'
import { CreateElement } from "vue";

export default class baseSelect extends Vue {
  select: number = -1
  variabels: any
  query: any
  queryName!: string
  data!: Array<any>
  items: Array<any> = []

  @Prop({
    type: [Number, String],
    required: false
  })
  value!: number

  mapper!: (item:any) => {
    id: number
    beschreibung: string
  }

  @Watch('select')
  @Emit('input')
  onSelectChange(value:number) {}

  @Watch('value', {immediate: true})
  onValueChange(value:number) {
    this.select = value
  }

  created() {
    this.loadData()
  }

  loadData() {
    (<any>this.$apollo).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: 'cache-and-network',
      pollInterval: auth.pollInterval
    }).subscribe((val:any) => {
      if (val.data) {
        this.data = val.data[this.queryName]
        this.items = this.data.map(this.mapper)
      }
    })
  }
}