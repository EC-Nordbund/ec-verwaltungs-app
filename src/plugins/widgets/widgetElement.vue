<script lang="ts">
import {
  Vue,
  Component,
  Prop
} from 'vue-property-decorator'

import getWidgets from '@/plugins/widgets/widgets/index.ts'

const widgets = getWidgets()

import { CreateElement } from 'vue'

@Component({})
export default class widgetContainer extends Vue {
  @Prop({ required: true, type: [Array, Object] })
  config!: any

  render(h: CreateElement) {
    return h(
      getWidgets()[this.config.widgetName].component,
      {
        props: {
          config: this.config.config
        },
        style: {
          gridArea: this.config.area
        }
      }
    )
  }
}
</script>
