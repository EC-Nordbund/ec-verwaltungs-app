import { client } from './apollo'
import router from './router/router'

const startPage = '/'
const loginPage = '/login'

const routesWithOutLogIn = [
  loginPage
]

class auth {
  private _authToken: string = '36dd56c18f679199ba56b02954c07fdb6591657f0bed73d15ad14be872622887e195d9bee21fbda2e57c1f0f538715441b2218bd88d17a5e9afbcbf8e80e1e20'
  private _mutationList: Array<string> = []
  private _userGroupBezeichnung: string = '____'
  private _fieldAccess: Array<{
    table: string,
    field: string
  }> = []

  public pollInterval: number = 60000

  constructor() {
    // router.beforeEach((to, from, next)=>{
    //   // wenn /login und angemeldet -> startpage
    //   if (this.isLogedIn()) {
    //     if (to.meta.userGroups.indexOf(this._userGroupBezeichnung) !== -1) {
    //       next()
    //     } else {
    //       next(startPage)
    //     }
    //   } else {
    //     if (routesWithOutLogIn.indexOf(to.fullPath) !== -1) {
    //       next()
    //     } else {
    //       next(loginPage)
    //     }
    //   }
    // })
  }

  public get authToken():string {
    if (this.isLogedIn()) {
      this.extend()
    }
    return this._authToken
  }

  public extend():void {
    // Extend
    // TODO:
  }

  public isLogedIn():boolean {
    return this._authToken.length > 0
  }

  public logIn(username: string, password: string):Promise<boolean>|boolean {
    return true
    // TODO:
  }

  public logOut():Promise<boolean>|boolean {
    // TODO:
    this._authToken = ''
    return true
  }

  public isMutationAllowed(mutName: string) {
    return this._mutationList.indexOf(mutName) !== -1
  }

  public isFieldsAllowed(fields: Array<{
    table: string,
    field: string
  }>):boolean{
    let tmp = true
    fields.map(this.isFieldAllowed).forEach(v => {
      tmp = tmp && v
    })
    return tmp
  }

  private isFieldAllowed(field: {
    table: string,
    field: string
  }):boolean {
    const allow = [
      {
        table: '*',
        field: '*'
      },
      {
        table: field.table,
        field: '*'
      },
      {
        table: '*',
        field: field.field
      },
      {
        table: field.table,
        field: field.field
      }
    ].map(v => this._fieldAccess.indexOf(v) !== -1)
    return allow[0] || allow[1] || allow[2] || allow[3]
  }
}

export default new auth()