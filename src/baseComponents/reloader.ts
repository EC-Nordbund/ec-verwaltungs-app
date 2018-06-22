import auth from '@/plugins/auth'
import { Vue } from 'vue-property-decorator'
import { ObservableQuery } from 'apollo-client'
import { DocumentNode } from 'graphql'

import event from '@/plugins/eventbus'

/**
 * Class of components (views) with GraphQL connection including a query watcher
 *
 * @export
 * @abstract
 * @class reloader
 * @extends {Vue}
 */
export default abstract class reloader extends Vue {
  /**
   * Stores variables as key-value-pairs
   *
   * @type {({[key: string]: string|number|boolean})}
   * @memberof reloader
   */
  public variabels!: {
    [key: string]: string | number | boolean
  }

  /**
   * Current query
   *
   * @private
   * @type {ObservableQuery<any>}
   * @memberof reloader
   */
  private _query!: ObservableQuery<any>

  /**
   * Stores any type of data
   *
   * @type {*}
   * @memberof reloader
   */
  public data: any

  /**
   * Saves
   *
   * @type {DocumentNode}
   * @memberof reloader
   */
  public query!: DocumentNode

  /**
   * Getter of authentication instance
   *
   * @memberof reloader
   */
  public auth = auth

  /**
   * Contains task to be done on creation
   *
   * @memberof reloader
   */
  public created() {
    this.loadData()
  }

  /**
   * Loads data form server by creating a new `_query` and subscribe to it.
   * If data is recieved, it will be saved in `data`.
   * Provides a loading indicator for the user.
   *
   * @memberof reloader
   */
  public loadData() {
    // start LoadingSpinner
    event.emit('showLoading')

    this._query = (this.$apollo as any).watchQuery({
      query: this.query,
      variables: this.variabels,
      fetchPolicy: 'cache-and-network',
      pollInterval: auth.pollInterval
    })

    if (this._query !== null) {
      // subscribe to response
      this._query.subscribe((val: any) => {
        if (val.data) {
          this.data = val.data

          // stop LoadingSpinner
          event.emit('hideLoading')
        }
      })
    }
  }

  /**
   * Refetch data form last `_query` and save it in `data`.
   * Provides a loading indicator for the user.
   *
   * @memberof reloader
   */
  public refetch() {
    // start LoadingSpinner
    event.emit('showLoading')

    this._query.refetch().then((val: any) => {
      this.data = val.data

      // stop LoadingSpinner
      event.emit('hideLoading')
    })
  }
}
