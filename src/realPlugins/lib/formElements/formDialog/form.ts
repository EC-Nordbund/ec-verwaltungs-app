import formElement from '@/realPlugins/lib/formElements/formDialog/element'
import { CreateElement } from 'vue'
import {
  Component,
  Emit,
  Prop,
  Vue,
  Watch
} from 'vue-property-decorator'

/**
 * Direktives Argumente
 */
const directiveArgs = {
  value: undefined,
  oldValue: undefined,
  expression: undefined,
  arg: '',
  modifiers: {}
}

/**
 * Dialog-Form
 *
 * @export
 * @class formDialog
 * @extends {Vue}
 */
@Component({
  model: {
    prop: 'show',
    event: 'openChanged'
  }
})
export default class formDialog extends Vue {
  /**
   * RenderFunktion
   *
   * @param {CreateElement} h
   * @returns
   * @memberof formDialog
   */
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
                    [this.deleteLabel]
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
                    name: 'primary-bg',
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

  /**
   * Is Valid
   *
   * @memberof formDialog
   */
  valid = false
  /**
   * Is Open
   *
   * @memberof formDialog
   */
  open = false
  /**
   * Wert des Forms
   *
   * @type {*}
   * @memberof formDialog
   */
  wert: any = {}

  /**
   * v-model Zeige Dialog an
   *
   * @type {boolean}
   * @memberof formDialog
   */
  @Prop({ type: Boolean, required: true })
  show!: boolean

  @Prop({ type: String, default: 'Löschen' })
  deleteLabel!: string
  /**
   * Felder-Configuration
   *
   * @type {Array<any>}
   * @memberof formDialog
   */
  @Prop({ type: Array, required: true })
  fieldConfig!: Array<any>

  /**
   * Has DeleteButton
   */
  @Prop({ type: Boolean, required: false, default: false })
  deleteBtn!: boolean

  /**
   * Titel des Forms
   *
   * @type {string}
   * @memberof formDialog
   */
  @Prop({ type: String, required: false, default: '' })
  title!: string

  /**
   * Value-Prop
   *
   * @type {*}
   * @memberof formDialog
   */
  @Prop({
    type: Object,
    required: false,
    default: () => ({})
  })
  value!: any

  /**
   * on open change
   *
   * @param {boolean} value
   * @memberof formDialog
   */
  @Watch('show', { immediate: true })
  onShowChange(value: boolean) {
    this.open = value
  }

  /**
   * On Value(Prop) change emit value
   *
   * @param {*} value
   * @memberof formDialog
   */
  @Watch('value', { immediate: true })
  onValueChage(value: any) {
    this.wert = value
  }

  /**
   * On open change emit openChanged
   *
   * @param {boolean} value
   * @memberof formDialog
   */
  @Watch('open')
  @Emit('openChanged')
  onOpenChange(value: boolean) {}

  /**
   * Cancel
   *
   * @memberof formDialog
   */
  @Emit('cancel')
  cancel() {
    this.open = false
    setTimeout(this.reset, 500)
  }

  /**
   * Delete
   *
   * @memberof formDialog
   */
  delete() {
    this.open = false
    this.$emit('delete', this.wert)
    setTimeout(this.reset, 500)
  }

  /**
   * Save
   *
   * @memberof formDialog
   */
  save() {
    this.open = false
    this.$emit('save', this.wert)
    setTimeout(this.reset, 500)
  }
  /**
   * Reset
   *
   * @memberof formDialog
   */
  reset() {
    Object.keys(this.wert).forEach(v => {
      this.wert[v] = ''
    })

    if (this.$refs && this.$refs.form)
      (<any>this.$refs.form).reset()
  }

  /**
   * Wert change (not implemented)
   *
   * @param {*} value
   * @memberof formDialog
   */
  @Watch('wert')
  onWertChange(value: any) {}
}
