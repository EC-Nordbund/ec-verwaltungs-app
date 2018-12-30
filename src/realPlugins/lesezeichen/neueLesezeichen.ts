import { data } from '@/realPlugins/electron';
import lesezeichenToggele from '@/realPlugins/lesezeichen/addLesezeichen.vue';
import lesezeichenShow from '@/realPlugins/lesezeichen/showLesezeichen.vue';
import { EventEmitter } from 'events';
import Vue, { CreateElement } from 'vue';
const { isElectron, settings } = data

export interface Lesezeichen {
  route: string
  type: string
  elID: string | number
  label: string
}

export class LesezeichenList extends EventEmitter {
  public liste: Array<Lesezeichen> = []

  public constructor() {
    super()
    this.load()
    this.setMaxListeners(1000)
  }

  public add(lesezeichen: Lesezeichen) {
    if (!this.contains(lesezeichen)) {
      this.liste.push(lesezeichen)
      this.save()
    }
  }

  public contains(lesezeichen: Lesezeichen) {
    const el = this.liste.filter(
      v =>
        v.elID === lesezeichen.elID &&
        v.type === lesezeichen.type
    )
    return el.length > 0
  }

  private save() {
    settings.set('lesezeichen', JSON.stringify(this.liste))
    this.emit('changed')
    this.emit('changed2')
  }

  private load() {
    this.liste = <Array<Lesezeichen>>(
      JSON.parse(<string>settings.get('lesezeichen', '[]'))
    )
  }

  public delete(lesezeichen: Lesezeichen) {
    this.liste = this.liste.filter(
      v =>
        v.elID !== lesezeichen.elID ||
        v.type !== lesezeichen.type
    )
    this.save()
  }

  public static install(vue: typeof Vue) {
    if (isElectron) {
      vue.prototype.$liste = new LesezeichenList()
      vue.component(
        'ec-lesezeichen-add',
        lesezeichenToggele
      )
      vue.component('ec-lesezeichen-show', lesezeichenShow)
    } else {
      vue.component('ec-lesezeichen-add', <any>{
        render: (h: CreateElement) => null
      })
      vue.component('ec-lesezeichen-show', <any>{
        render: (h: CreateElement) => null
      })
    }
  }
}
