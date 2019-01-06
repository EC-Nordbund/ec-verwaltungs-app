import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator';

import {CreateElement} from 'vue'

@Component({})
export default class ecWidgetContainer extends Vue {
  @Prop({
    type: Object
  })
  config!: {x:number, y:number, width:number, height: number, config:any, component: string};

  render(h:CreateElement){
    const c = h(this.config.component,{props: {config: this.config.config}})
    return h('div', {
      style: {
        'grid-column-start': this.config.x, 
        'grid-row-start': this.config.y, 
        'grid-column-end':this.config.x+this.config.width, 
        'grid-row-end':this.config.y+this.config.height,
        'display': 'grid'
      },
    }, [h(this.config.component,{props: {config: this.config.config}})]
    )
  }
}