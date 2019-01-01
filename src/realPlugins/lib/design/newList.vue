<template>
  <div>
    <template>
      <template v-for="(item, index) in splitNumbers">
        <template v-if="page-1==index">
          <onePage v-if="splitNumbers.length==1" :standard="standard" :items="items.slice(0,item)" :key="-1" :extra="extraAtLast"/>
          <onePage v-else-if="index==0" :standard="standard" :items="items.slice(0,item)" :key="0"/>
          <onePage v-else-if="index==splitNumbers.length-1" :standard="standard" :items="items.slice(splitNumbers[index-1],item)" :key="index" :extra="extraAtLast"/>
          <onePage v-else :standard="standard" :items="items.slice(splitNumbers[index-1],item)" :key="index"/>
        </template>
      </template>
    </template>
    <template v-if="splitNumbers.length>1">
      Seite <b>{{page}}</b> von <b>{{splitNumbers.length}}</b>
      <v-btn icon @click="page=page-1" :disabled="page===1">
        <v-icon>
          navigate_before
        </v-icon>
      </v-btn>
      <v-btn icon @click="page=page+1" :disabled="page===splitNumbers.length">
        <v-icon>
          navigate_next
        </v-icon>
      </v-btn>
    </template>
    <div v-else style="height: 47px"/>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'

import onePage from '@/realPlugins/lib/design/pageOfList.vue'

@Component({
  components: {
    onePage
  }
})
export default class orgaDetailsVeranstaltungen extends Vue {
  @Prop({ type: Array })
  items!: any

  @Prop({ type: Object })
  standard!: any

  @Prop({ type: Number })
  countPerPage!: any

  @Prop({ type: [Number, String] })
  value!: number|string

  splitNumbers:Array<number>=[]
  page:number = 1
  extraAtLast = 0

  @Watch('value', {immediate: true})
  onValueChange(){
    this.page=typeof this.value === 'string' ? parseInt(this.value) : this.value
  }

  @Watch('page')
  onPageChange(){
    this.$emit('input', this.page)
  }

  @Watch('countPerPage')
  onCountChange(){
    this.rerender()
  }

  @Watch('items')
  onCountItems(){
    this.rerender()
  }

  created(){
    this.rerender()
  }

  rerender(){
    let splitNumbers = []
    let pageCounter = 0

    let i = 0

    let currentPage=0

    while(i<this.items.length) {
      currentPage = 0
      while(i<this.items.length&&currentPage<this.countPerPage){
        if(!this.items[i].divider){
          currentPage++
        }
        i++
      }
      splitNumbers.push(i)
    }

    this.splitNumbers = splitNumbers
    this.extraAtLast = this.countPerPage - currentPage
  }
}
</script>