import { client } from './apollo'
import router from './router/router'

const startPage = '/'
const loginPage = '/login'

const routesWithOutLogIn = [
  loginPage
]

class auth {
  private _authToken: string = 'b7045818cde9a90a0656fd49761a8ce77bd8d015c05696f1aeb285a24e0024e0432242d5b677bc4f4e75ac83b980735411a71cd07574076dc92d12b809d5847a'
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