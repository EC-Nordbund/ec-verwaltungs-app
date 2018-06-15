import auth from '@/plugins/auth'
import { Vue } from 'vue-property-decorator'
import { ObservableQuery } from 'apollo-client'
import { DocumentNode } from 'graphql'

/**
 * Klasse für Components (Views) with qraphqlconnection... (Including Watchquerry)
 *
 * @export
 * @abstract
 * @class reloader
 * @extends {Vue}
 */
export default abstract class reloader extends Vue {
  /**
   * Speichert die Variablen
   *
   * @type {({[key: string]: string|number|boolean})}
   * @memberof reloader
   */
  public variabels!: {
    [key: string]: string | number | boolean
  }

  /**
   * Speichert die Query
   *
   * @private
   * @type {ObservableQuery<any>}
   * @memberof reloader
   */
  private _query!: ObservableQuery<any>

  /**
   * Speichert die Daten
   *
   * @type {*}
   * @memberof reloader
   */
  public data: any

  /**
   * Speichert
   *
   * @type {DocumentNode}
   * @memberof reloader
   */
  public query!: DocumentNode

  /**
   * Authentication-Class-Instance
   *
   * @memberof reloader
   */
  public auth = auth

  /**
   * On Created
   *
   * @memberof reloader
   */
  public created() {
    this.loadData()
  }

  /**
   * Lade Daten
   *
   * @memberof reloader
   */
  public loadData() {
    this._query = (this.$apollo as any).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: 'cache-and-network',
      pollInterval: auth.pollInterval
    })
    if (this._query !== null) {
      this._query.subscribe((val: any) => {
        if (val.data) {
          this.data = val.data
        }
      })
    }
  }

  /**
   * Reload Daten
   *
   * @memberof reloader
   */
  public refetch() {
    this._query.refetch().then((val: any) => {
      this.data = val.data
    })
  }
}
