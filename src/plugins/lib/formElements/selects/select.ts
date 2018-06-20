import auth from '@/plugins/auth'
import {
  Emit,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

/**
 * Basis-Klasse für Select Components
 *
 * @export
 * @class baseSelect
 * @extends {Vue}
 */
export default class baseSelect extends Vue {
  public select: number = -1
  public variabels: any
  public query: any
  public queryName!: string
  public data!: Array<any>
  public items: any[] = []

  @Prop({
    type: [Number, String],
    required: false
  })
  public value!: number

  public mapper: (
    item: any
  ) => {
    id: number
    beschreibung: string
  } = a => a

  @Watch('select')
  @Emit('input')
  onSelectChange(value: number) {}

  @Watch('value', { immediate: true })
  onValueChange(value: number) {
    this.select = value
  }

  created() {
    this.loadData()
  }

  loadData() {
    ;(this.$apollo as any)
      .watchQuery({
        query: this.query,
        variables: this.variabels,
        fetchPolicy: 'cache-and-network',
        pollInterval: auth.pollInterval
      })
      .subscribe((val: any) => {
        if (val.data) {
          this.data = val.data[this.queryName]
          this.items = this.data.map(this.mapper)
        }
      })
  }
}
