import gql from 'graphql-tag'
import { getClient } from './apollo'
// import router from './router/router'
import eventbus from '@/plugins/eventbus'

/**
 * Klasse die sämtliche Authentifizierung handelt
 *
 * @class auth
 */
class auth {
  /**
   * AuthToken (intern)
   *
   * @private
   * @type {string}
   * @memberof auth
   */
  private _authToken: string = ''
  /**
   * Allowed Mutations
   *
   * @private
   * @type {string[]}
   * @memberof auth
   */
  private _mutationList: string[] = []
  /**
   * UserGruppenBezeichnung
   *
   * @type {string}
   * @memberof auth
   */
  public _userGroupBezeichnung: string = '____'
  /**
   * Wurde automatisch abgemeldet
   *
   * @type {boolean}
   * @memberof auth
   */
  public autoLogOut: boolean = false

  /**
   * Erlaubte Felder
   *
   * @private
   * @type {Array<{
   *     table: string
   *     field: string
   *   }>}
   * @memberof auth
   */
  private _fieldAccess: Array<{
    table: string
    field: string
  }> = []

  /**
   * Beschreibung der Person
   *
   * @memberof auth
   */
  public personBeschreibung = ''

  /**
   * Refetch Intervall
   *
   * @type {number}
   * @memberof auth
   */
  public pollInterval: number = 60000

  /**
   * TimerA
   *
   * @private
   * @type {(NodeJS.Timer | null)}
   * @memberof auth
   */
  private timer: NodeJS.Timer | null = null
  /**
   * TimerB
   */
  private timer2: NodeJS.Timer | null = null

  /**
   * GetAuthTokenn
   *
   * @readonly
   * @type {string}
   * @memberof auth
   */
  public get authToken(): string {
    if (this.isLogedIn()) {
      this.extend()
    }
    return this._authToken
  }

  /**
   * Extend Time
   *
   * @memberof auth
   */
  public extend(): void {
    clearTimeout(<NodeJS.Timer>this.timer)
    clearTimeout(<NodeJS.Timer>this.timer2)

    this.timer = setTimeout(() => {
      eventbus.emit('soonLogout')
    }, 25 * 60 * 1000)

    this.timer2 = setTimeout(() => {
      this.logOut(true)
    }, 30 * 60 * 1000)

    getClient().query({
      query: gql`
        query($authToken: String!) {
          aks(authToken: $authToken) {
            akID
          }
        }
      `,
      variables: {
        authToken: this._authToken
      }
    })
  }

  /**
   * Check if si logedOut
   *
   * @returns {boolean}
   * @memberof auth
   */
  public isLogedIn(): boolean {
    return this._authToken.length > 0
  }

  /**
   * Login User
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<boolean>}
   * @memberof auth
   */
  public logIn(
    username: string,
    password: string
  ): Promise<boolean> {
    return getClient()
      .mutate({
        mutation: gql`
          mutation($username: String!, $password: String!) {
            logIn(username: $username, password: $password)
          }
        `,
        variables: {
          username,
          password
        }
      })
      .then(v => (v.data as any).logIn)
      .then(authToken => {
        this._authToken = authToken
        this.getRechte()
      })
      .then(v => true)
      .catch(v => false)
  }

  /**
   * Get Rechte
   *
   * @private
   * @returns
   * @memberof auth
   */
  private getRechte() {
    return getClient()
      .query({
        query: gql`
          query($authToken: String!) {
            getMyUserData(authToken: $authToken) {
              userName
              ablaufDatum {
                german
              }
              person {
                vorname
                nachname
              }
              userGroup {
                bezeichnung
                mutationRechte
                fieldAccess {
                  table
                  field
                }
              }
            }
          }
        `,
        variables: {
          authToken: this.authToken
        }
      })
      .then(v => (v.data as any).getMyUserData)
      .then((conf: any) => {
        this._userGroupBezeichnung =
          conf.userGroup.bezeichnung
        this._mutationList = conf.userGroup.mutationRechte
        this._fieldAccess = conf.userGroup.fieldAccess
        this.personBeschreibung = `Gültig für ${
          conf.person.vorname
        } ${conf.person.nachname} bis ${
          conf.ablaufDatum.german
        }`
      })
  }

  /**
   * LogOut
   *
   * @param {boolean} [auto=false] is AutoLogout
   * @returns {(Promise<boolean> | boolean)}
   * @memberof auth
   */
  public logOut(
    auto: boolean = false
  ): Promise<boolean> | boolean {
    return getClient()
      .mutate({
        mutation: gql`
          mutation($authToken: String!) {
            logOut(authToken: $authToken)
          }
        `,
        variables: {
          authToken: this._authToken
        }
      })
      .then(v => {
        this.autoLogOut = auto
        this._authToken = ''
        eventbus.emit('logedOut')
        return true
      })
  }

  /**
   * Check if is mujtation Allowed
   *
   * @param {string} mutName
   * @returns
   * @memberof auth
   */
  public isMutationAllowed(mutName: string) {
    return this._mutationList.indexOf(mutName) !== -1
  }

  /**
   *Check uf fieldAllowed
   *
   * @param {Array<{
   *       table: string
   *       field: string
   *     }>} fields
   * @returns {boolean}
   * @memberof auth
   */
  public isFieldsAllowed(
    fields: Array<{
      table: string
      field: string
    }>
  ): boolean {
    let tmp = true
    fields.map(this.isFieldAllowed).forEach(v => {
      tmp = tmp && v
    })
    return tmp
  }

  /**
   * is Field Allowed
   *
   * @private
   * @param {{
   *     table: string
   *     field: string
   *   }} field
   * @returns {boolean}
   * @memberof auth
   */
  private isFieldAllowed(field: {
    table: string
    field: string
  }): boolean {
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

// Export instance
export default new auth()
