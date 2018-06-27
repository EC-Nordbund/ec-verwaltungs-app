import { CreateElement } from 'vue'
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator'

/**
 * Erzeugt eine Editierbare Liste
 *
 * @export
 * @class Liste
 * @extends {Vue}
 */
@Component({})
export default class Liste extends Vue {
  /**
   * Renderfunktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof Liste
   */
  render(h: CreateElement) {
    return h(
      'v-list',
      {},
      this.itemMap.map((mapItem, index) => {
        return h(
          'v-list-tile',
          {
            key: index,
            on: {
              click: () => {
                this.$emit('click', mapItem.item)
              }
            }
          },
          [
            ...(this.icon
              ? [
                  h('v-list-tile-action', [
                    h(
                      'v-icon',
                      {
                        props: {
                          color: 'indigo'
                        }
                      },
                      [mapItem.map.icon || this.icon]
                    )
                  ])
                ]
              : []),
            h('v-list-tile-content', [
              h('v-list-tile-title', [mapItem.map.title]),
              ...(mapItem.map.subTitle
                ? [
                    h('v-list-tile-sub-title', [
                      mapItem.map.subTitle
                    ])
                  ]
                : [])
            ]),
            ...(mapItem.map.edit || this.edit
              ? [
                  h('v-list-tile-action', [
                    h('ec-button-icon', {
                      on: {
                        click: ($event: any) => {
                          $event.stopPropagation()
                          this.$emit('edit', mapItem.item)
                        }
                      }
                    })
                  ])
                ]
              : [])
          ]
        )
      })
    )
  }

  /**
   * Gibt einen MAP der Items an
   *
   * @type {Array<any>}
   * @memberof Liste
   */
  itemMap: Array<any> = []

  /**
   * Anzuzeigende Elemente
   *
   * @type {Array<any>}
   * @memberof Liste
   */
  @Prop({
    type: Array,
    required: true
  })
  items!: Array<any>

  /**
   * mapper der aus items mapItems macht
   *
   * @memberof Liste
   */
  @Prop({
    type: Function,
    required: true
  })
  mapper!: (
    item: any
  ) => {
    icon?: string
    title: string
    subTitle?: string
    edit?: boolean
  }

  /**
   * Can edit items
   *
   * @type {boolean}
   * @memberof Liste
   */
  @Prop({
    type: Boolean,
    default: false
  })
  edit!: boolean

  /**
   * icon, dass vorne ist
   *
   * @type {string}
   * @memberof Liste
   */
  @Prop({
    type: String,
    default: ''
  })
  icon!: boolean

  /**
   * Wenn Items changed (via Prop)
   *
   * @memberof Liste
   */
  @Watch('items', {
    immediate: true
  })
  onItemsChange() {
    this.itemMap = this.items.map(item => ({
      item,
      map: this.mapper(item)
    }))
  }
}
