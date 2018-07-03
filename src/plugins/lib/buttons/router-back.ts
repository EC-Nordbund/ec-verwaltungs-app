import { CreateElement } from 'vue'
import {
  Component,
  Vue,
  Prop,
  Watch
} from 'vue-property-decorator'

/**
 * Zurückbutton (router)
 *
 * @export
 * @class RouterBack
 * @extends {Vue}
 */
@Component({})
export default class RouterBack extends Vue {
  show: boolean = true
  isMobile: boolean = false

  created() {
    this.checkIfMobile() // initail check
    window.addEventListener('resize', this.checkIfMobile)
  }

  destroyed() {
    window.removeEventListener('resize', this.checkIfMobile)
  }

  checkIfMobile() {
    if (!this.showOnlyOnMobile) {
      return
    }
    var breakpoint = 1264 // default value

    switch (typeof this.mobileBreakPoint) {
      case 'string':
        breakpoint = parseInt(
          this.mobileBreakPoint as string,
          10
        )
        break

      case 'number':
        breakpoint = this.mobileBreakPoint as number
        break

      default:
        return
    }

    // check is window with smaller breakpoint
    this.isMobile =
      this.$vuetify.breakpoint.width < breakpoint
  }

  @Prop({ type: Boolean, default: false })
  showOnlyOnMobile!: boolean

  @Prop({ type: [Number, String], default: 1264 })
  mobileBreakPoint!: number | string

  @Watch('isMobile', { immediate: true })
  onMobileChange() {
    if (this.showOnlyOnMobile) {
      this.show = this.isMobile
    }
  }

  /**
   * Render Funktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof RouterBack
   */
  render(h: CreateElement) {
    return this.show
      ? h(
          'v-btn',
          {
            props: {
              dark: true,
              ...this.$attrs
            },
            attrs: {
              ...this.$attrs
            },
            on: {
              click: () => {
                this.$router.back()
              },
              ...this.$listeners
            },
            directives: [
              {
                name: 'accent-bg',
                value: undefined,
                oldValue: undefined,
                expression: undefined,
                arg: '',
                modifiers: {}
              }
            ]
          },
          [h('v-icon', ['keyboard_arrow_left']), 'Zurück']
        )
      : // Return nothing if `show` propability is false
        ''
  }
}
