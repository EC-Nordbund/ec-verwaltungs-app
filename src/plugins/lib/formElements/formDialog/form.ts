import formElement from '@/plugins/lib/formElements/formDialog/element.ts'
import { CreateElement } from 'vue'
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

const directiveArgs = {
  value: undefined,
  oldValue: undefined,
  expression: undefined,
  arg: '',
  modifiers: {}
}

@Component({
  model: {
    prop: 'show',
    event: 'openChanged'
  }
})
export default class formDialog extends Vue {
  render(h: CreateElement) {
    return h(
      'v-dialog',
      {
        props: {
          width: '500px',
          value: this.open,
          persistent: true
        }
      },
      [
        h('v-card', [
          h('v-card-title', [
            h(
              'h1',
              {
                directives: [
                  {
                    name: 'font',
                    ...directiveArgs
                  },
                  {
                    name: 'primary',
                    ...directiveArgs
                  }
                ]
              },
              [this.title]
            )
          ]),
          h('v-card-text', [
            h(
              'v-form',
              {
                props: {
                  value: this.valid
                },
                ref: 'form',
                on: {
                  input: (val: boolean) => {
                    this.valid = val
                  }
                }
              },
              this.fieldConfig.map(el =>
                h(formElement, {
                  attrs: {
                    ...el
                  },
                  props: {
                    ...el,
                    value: this.wert[el.name]
                  },
                  on: {
                    input: (val: any) => {
                      this.wert[el.name] = val
                    }
                  }
                })
              )
            )
          ]),
          h('v-card-actions', [
            h('v-spacer'),
            h(
              'v-btn',
              {
                props: {
                  flat: true
                },
                on: {
                  click: this.cancel
                }
              },
              ['Abbrechen']
            ),
            ...(this.deleteBtn
              ? [
                  h(
                    'v-btn',
                    {
                      props: {
                        flat: true
                      },
                      on: {
                        click: this.delete
                      }
                    },
                    ['Löschen']
                  )
                ]
              : []),
            h(
              'v-btn',
              {
                props: {
                  disabled: !this.valid
                },
                attrs: {
                  disabled: !this.valid
                },
                on: {
                  click: this.save
                },
                directives: [
                  {
                    name: 'secondary-bg',
                    ...directiveArgs
                  },
                  {
                    name: 'white',
                    ...directiveArgs
                  }
                ]
              },
              ['Speichern']
            )
          ])
        ])
      ]
    )
  }

  valid = false
  open = false
  wert: any = {}

  @Prop({ type: Boolean, required: true })
  show!: boolean

  @Prop({ type: Array, required: true })
  fieldConfig!: Array<any>

  @Prop({ type: Boolean, required: false, default: false })
  deleteBtn!: boolean

  @Prop({ type: String, required: false, default: '' })
  title!: string

  @Prop({
    type: Object,
    required: false,
    default: () => ({})
  })
  value!: any

  @Watch('show', { immediate: true })
  onShowChange(value: boolean) {
    this.open = value
  }

  @Watch('value', { immediate: true })
  onValueChage(value: any) {
    this.wert = value
  }

  @Watch('open')
  @Emit('openChanged')
  onOpenChange(value: boolean) {}

  @Emit('cancel')
  cancel() {
    this.open = false
    setTimeout(this.reset, 500)
  }

  delete() {
    this.open = false
    this.$emit('delete', this.wert)
    setTimeout(this.reset, 500)
  }

  save() {
    this.open = false
    this.$emit('save', this.wert)
    setTimeout(this.reset, 500)
  }
  reset() {
    Object.keys(this.wert).forEach(v => {
      this.wert[v] = ''
    })

    if (this.$refs && this.$refs.form)
      (<any>this.$refs.form).reset()
  }

  @Watch('wert')
  onWertChange(value: any) {}
}
