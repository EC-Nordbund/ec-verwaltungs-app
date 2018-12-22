<template>
  <div>
    <v-card style="margin: 15px">
      <v-card-title v-if="!noTitle">
        <v-spacer/>
        <h1 v-font v-primary>
          {{title}}
        </h1>
        <v-spacer/>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-if="suche"
          label="Suchen"
          prepend-icon="search"
          :append-icon="suchString.length > 0 ? 'close' : undefined"
          v-model="suchString"
          @click:append="()=>{suchString = ''}"
        />
        <v-data-table
          :customFilter="customFilter"
          :items="items"
          :headers="headers"
          :search="suchString"
          :pagination.sync="pagination"
          :rows-per-page-items="[count+countAnpassung]">

          <template slot="items" slot-scope="props">
            <tr @click="open(props.item)">
              <td class="text-xs-center" v-for="con in config" :key="con.name">
                <template v-if="!con.handleOutside">
                  {{get(props.item, con.name) }}
                </template>
                <template v-if="con.handleOutside">
                  <slot :item="props.item" :config="con" name="handleOutside"/>
                </template>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
      <slot/>
    </v-card>
  </div>
</template>

<script lang="ts">
import filter from 'lazyfilter'

import {
  Component,
  Vue,
  Emit,
  Watch,
  Prop
} from 'vue-property-decorator'

@Component({})
export default class Table extends Vue {
  suchString: string = ''
  elements: Array<any> = []
  headers: Array<any> = []
  count: number = -1

  @Prop({ type: String, required: false, default: '' })
  sucheVal!: string

  @Watch('sucheVal', { immediate: true })
  onSuchValChanged(val: string) {
    this.suchString = val
  }

  pagination= {
    sortBy: '',
    decending: false
  }

  @Prop({type: Number, default:0})
  countAnpassung!: number

  @Prop({type: Boolean, required: false, default: false})
  noTitle!: boolean

  @Prop({type: String, required: false, default: ''})
  sortSpalte!: string

  @Watch('sortSpalte', {immediate: true})
  onSortChange(val:string){
    this.pagination = {sortBy: val, decending: this.absteigend}
  }

  @Watch('absteigend', {immediate: true})
  onOrderChange(val:string){
    this.pagination = {sortBy: val, decending: this.absteigend}
  }

  @Prop({type: Boolean, required: false, default: false})
  absteigend!: boolean

  @Watch('suchString')
  @Emit('sucheChanged')
  onSuchStringChanged(val: string) {}

  // Hier kann die Tolleranz der Suche geändert werden
  customFilter = (items: any, search: string) =>
    items.filter((item: any) => filter(item, search, 1 / 10))

  @Emit('open')
  open(item: any) {}

  mounted() {
    if (this.grosseSuche && !this.suche) {
      // eslint-disable-next-line
      throw 'Damit die große suche geht, muss die kleine ebenfalls aktiviert sein...'
    }
  }

  created() {
    this.count = Math.floor(
      (document.body.offsetHeight -
        2 * (64 + 10) -
        80 -
        30 -
        (this.suche ? 80 : 0) -
        100) /
        48
    )
  }

  @Prop({ type: String, required: true })
  title!: string

  @Prop({ type: Boolean, default: false })
  suche!: boolean

  @Prop({ type: Boolean, default: false })
  grosseSuche!: boolean

  @Prop({ type: Array, required: true })
  items!: Array<any>

  @Prop({ type: Array, required: true })
  config!: Array<any>

  @Prop({ type: String, required: true })
  itemName!: string

  @Watch('config', { immediate: true })
  onConfigChange() {
    this.headers = this.config.map(col => {
      let tmp: any = {
        align: 'center',
        sortable:
          col.sortable === undefined || col.sortable,
        value: col.name,
        text: col.label
      }
      if (col.width !== undefined) {
        tmp.width = col.width
      }
      return tmp
    })
  }
  get(obj: any, path: any, defaultValue: any): any {
    if (typeof path === 'number') {
      path = [path]
    }
    if (!path || (<Array<string>>path).length === 0) {
      return obj
    }
    if (obj == null) {
      return defaultValue
    }
    if (typeof path === 'string') {
      return this.get(obj, path.split('.'), defaultValue)
    }

    const currentPath = this.getKey(path[0])
    const nextObj = obj[currentPath]
    if (nextObj === undefined) {
      return defaultValue
    }

    if (path.length === 1) {
      return nextObj
    }

    return this.get(
      obj[currentPath],
      path.slice(1),
      defaultValue
    )
  }
  getKey(key: string) {
    const intKey = parseInt(key, 10)
    if (intKey.toString() === key) {
      return intKey
    }
    return key
  }
}
</script>