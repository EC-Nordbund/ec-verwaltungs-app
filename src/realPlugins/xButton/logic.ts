import xButtonC from '@/realPlugins/xButton/btn.vue';
import Vue from 'vue';
export class xButton {
  liste: Array<{
    route: string
    viewConfig: any
  }> = []

  liste2: Array<{
    route: string
    viewConfig: any
  }> = []

  reset(liste: Array<any> = []) {
    this.liste = liste
    this.liste2 = []
  }

  xButtonClick(router: any) {
    const el = this.liste.pop()
    if (el !== undefined) {
      router.push({ path: el.route, query: el.viewConfig })
    }
    this.liste2 = []
  }

  addItem(route: string, viewConfig: any) {
    this.liste.push({
      route,
      viewConfig
    })
  }

  back($router: any) {
    const tmp = this.liste.pop()
    if (tmp !== undefined) {
      this.liste2.push(tmp)
    } else {
      this.reset()
    }
    $router.back()
  }

  forward($router: any) {
    const tmp = this.liste2.pop()
    if (tmp !== undefined) {
      this.liste.push(tmp)
    }
    $router.forward()
  }

  static install(vue: typeof Vue) {
    vue.component('ec-x-btn', xButtonC)
    vue.prototype.$xButton = xb
  }
}

let xb: xButton = new xButton()

export default xb
