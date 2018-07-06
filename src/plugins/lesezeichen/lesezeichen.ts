import { isElectron } from '@/plugins/electron'
import settings from '@/plugins/settings'

export class Lesezeichen {
  constructor(public route: string, public label: string, public type: string, public id: number|string) {
    liste.delete(route)
    liste.addLesezeichen(this)
  }

  delete() {
    liste.delete(this)
  }
}

class LesezeichenList {
  public liste: Array<Lesezeichen> = []

  addLesezeichen(lesezeichen: Lesezeichen) {
    this.liste.push(lesezeichen)
    this.save()
  }

  save() {
    settings.set('lesezeichen', JSON.stringify(this.liste))
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

const liste = new LesezeichenList()
;(<Array<any>>(
  JSON.parse(<string>settings.get('lesezeichen', '[]'))
)).forEach((v: any) => {
  new Lesezeichen(v.route, v.label, v.type, v.id)
})

export default liste
