import eventbus from '@/plugins/eventbus';
import { getClient } from '@/realPlugins/apollo';
import { data } from '@/realPlugins/electron';
import gql from 'graphql-tag';

const { electron, version } = data

/**
 * Class with handels the authentication.
 *
 * @class auth
 */
class auth {
  /**
   * Authentication token
   *
   * @private
   * @type {string}
   * @memberof auth
   */
  private _authToken: string = ''

  /**
   * List of allowed mutations
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
   * `ture` if user automatically was loged out. Otherwise `false`
   *
   * @type {boolean}
   * @memberof auth
   */
  public autoLogOut: boolean = false

  /**
   * Array which specifies the accessable fields
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
   * Timer to schedule Logout-Soon-Message
   *
   * @private
   * @type {(NodeJS.Timer | null)}
   * @memberof auth
   */
  private timeout_logout_soon: NodeJS.Timer | null = null

  /**
   * Timer to schedule logout
   *
   * @private
   * @type {(NodeJS.Timer | null)}
   * @memberof auth
   */
  private timeout_logout: NodeJS.Timer | null = null

  /**
   * Getter of `_authToken`
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
   * Extends timeout
   *
   * @memberof auth
   */
  public extend(): void {
    clearTimeout(<NodeJS.Timer>this.timeout_logout_soon)
    clearTimeout(<NodeJS.Timer>this.timeout_logout)

    this.timeout_logout_soon = setTimeout(() => {
      eventbus.emit('soonLogout')
    }, 25 * 60 * 1000)

    this.timeout_logout = setTimeout(() => {
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
   * Checks if user is loged out.
   *
   * @returns {boolean}
   * @memberof auth
   */
  public isLogedIn(): boolean {
    return this._authToken.length > 0
  }

  /**
   * Logs in specified user
   *
   * @param {string} username
   * @param {string} password
   * @returns {Promise<boolean>}
   * @memberof auth
   */
  public logIn(
    username: string,
    password: string
  ): Promise<{ status: boolean; nextURL: string }> {
    return getClient()
      .mutate({
        mutation: gql`
          mutation(
            $username: String!
            $password: String!
            $version: String!
          ) {
            logIn(
              username: $username
              password: $password
              version: $version
            )
          }
        `,
        variables: { username, password, version }
      })
      .then(v => (v.data as any).logIn)
      .then(authToken => {
        this._authToken = authToken
        this.getRights()
      })
      .then(v => true)
      .then(v => {
        return {
          status: v,
          nextURL:
            this.nextUrl === null ? '/app' : this.nextUrl
        }
      })
      .then(v => {
        this.nextUrl = null
        return v
      })
      .catch(v => ({ status: false, nextURL: '' }))
  }

  /**
   * Get rights for current user
   *
   * @private
   * @returns
   * @memberof auth
   */
  private getRights() {
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
        electron.ipcRenderer.send(
          'set-UG',
          conf.userGroup.bezeichnung
        )
      })
  }

  nextUrl: string | null = null

  public protoUrl(url: string) {
    this.nextUrl = url
    eventbus.emit('login_show_url_info')
  }

  /**
   * Logs current user out.
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
   * Checks if specified mujtation is allowed
   *
   * @param {string} mutName
   * @returns
   * @memberof auth
   */
  public isMutationAllowed(mutName: string) {
    return this._mutationList.indexOf(mutName) !== -1
  }

  /**
   * Checks if specified field is allowed
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
    return fields
      .map(this.isFieldAllowed)
      .reduce((prev, curr) => prev && curr)
  }

  /**
   * Checks if field is allowed
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
