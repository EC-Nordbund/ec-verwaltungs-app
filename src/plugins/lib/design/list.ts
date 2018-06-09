import { CreateElement } from 'vue';
import {
  Component,
  Vue,
  Watch,
  Prop
} from 'vue-property-decorator';

@Component({})
export default class Liste extends Vue {
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
                this.$emit('click', mapItem.item);
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
                      [mapItem.icon || this.icon]
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
                          $event.stopPropagation();
                          this.$emit('edit', mapItem.item);
                        }
                      }
                    })
                  ])
                ]
              : [])
          ]
        );
      })
    );
  }
  itemMap: Array<any> = [];

  @Prop({
    type: Array,
    required: true
  })
  items!: Array<any>;

  @Prop({
    type: Function,
    required: true
  })
  mapper!: (
    item: any
  ) => {
    icon?: string;
    title: string;
    subTitle?: string;
    edit?: boolean;
  };

  @Prop({
    type: Boolean,
    default: false
  })
  edit!: boolean;

  @Prop({
    type: String,
    default: '.'
  })
  icon!: boolean;

  @Watch('items', {
    immediate: true
  })
  onItemsChange() {
    this.itemMap = this.items.map(item => ({
      item,
      map: this.mapper(item)
    }));
  }
}
