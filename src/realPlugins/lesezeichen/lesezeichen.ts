import lesezeichenToggele from '@/plugins/lesezeichen/addLesezeichen.vue';
import lesezeichenShow from '@/plugins/lesezeichen/showLesezeichen.vue';
import _xButton from '@/plugins/xButton/logic';
import { data } from '@/realPlugins/electron';
import Vue, { CreateElement } from 'vue';
const { isElectron, settings } = data

export class Lesezeichen {
  constructor(
    public route: string,
    public label: string,
    public type: string,
    public id: number | string,
    public xButton: any = _xButton.liste
  ) {}

  delete() {
    liste.delete(this)
  }
}

class LesezeichenList {
  public liste: Array<Lesezeichen> = []

  public constructor() {
    this.load()
  }

  addLesezeichen(lesezeichen: Lesezeichen) {
    if (!this.liste.includes(lesezeichen)) {
      this.liste.push(lesezeichen)
      this.save()
    }
  }

  save() {
    settings.set('lesezeichen', JSON.stringify(this.liste))
  }

  load() {
    ;(<Array<any>>(
      JSON.parse(<string>settings.get('lesezeichen', '[]'))
    )).forEach((v: any) => {
      this.addLesezeichen(
        new Lesezeichen(
          v.route,
          v.label,
          v.type,
          v.id,
          v.xButton
        )
      )
    })
  }

  delete(lesezeichen: Lesezeichen | string) {
    if (typeof lesezeichen === 'string') {
      this.liste = this.liste.filter(
        v => v.route !== lesezeichen
      )
    } else {
      this.liste = this.liste.filter(
        v => v.route !== lesezeichen.route
      )
    }
    this.save()
  }
}

let liste: LesezeichenList

export default {
  install(vue: typeof Vue) {
    if (isElectron) {
      liste = new LesezeichenList()
      vue.prototype.$liste = liste
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
