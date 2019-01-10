import Vue from "vue";

export class auth {
  static instance: auth;
  static setToken: (at:string)=>void

  private _authToken: string;

  constructor(authToken: string) {
    auth.instance = this;
    this._authToken = authToken;
    auth.setToken(authToken)
  }

  get authToken() {
    return this._authToken;
  }

  static install(vue: typeof Vue, options: {util:any}) {
    vue.prototype.$auth = auth;
    auth.setToken = options.util.apollo.setAuthToken
  }
}

export default auth;
