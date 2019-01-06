import Vue from 'vue'

export class auth {
  static instance: auth

  private _authToken:string

  constructor(authToken:string) {
    auth.instance = this
    this._authToken = authToken
  }

  get authToken (){
    return this._authToken
  }

  static install(vue: typeof Vue) {
    vue.prototype.$auth = auth
  }
}