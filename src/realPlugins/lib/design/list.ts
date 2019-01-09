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
    let innerElement = (
      mapItem: { map: any; item: any },
      index: number
    ) => {
      return h(
        'v-list-tile',
        {
          key: index,
          on: {
            click: () => {
              this.$emit('click', mapItem.item)
            }
          },
          class: {
            [this.markedClass]: mapItem.map.marked
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
                        color: mapItem.map.isDeprecated
                          ? 'grey'
                          : 'secondary'
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
                mapItem.map.isDeprecated ? h(
                  'v-btn',
                  {
                    props: {
                      disabled: true,
                      outline: true,
                      flat: true,
                      small: true
                    }
                  },
                  'veraltet'
                ) : h(),
                h('v-list-tile-action', {}, [
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
    }

    return h(
      'v-list',
      {},
      this.itemMap.map((mapItem, index) => {
        if (mapItem.map.toolTip) {
          return h(
            'v-tooltip',
            {
              props: {
                bottom: true
              }
            },
            [
              h(
                'template',
                {
                  slot: 'activator'
                },
                [innerElement(mapItem, index)]
              ),
              h('span', {}, mapItem.map.toolTip)
            ]
          )
        } else {
          return innerElement(mapItem, index)
        }
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

  @Prop({
    type: String,
    required: false,
    default: 'marked'
  })
  markedClass!: string

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
    marked?: boolean
    isDeprecated?: boolean
    toolTip?: string
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
