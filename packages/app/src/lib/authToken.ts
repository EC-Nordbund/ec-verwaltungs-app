import nav from '@/config/nav'
import {version} from '@/../package.json'
import {
  Component,
  Vue,
  Prop,
  Watch,
  Emit
} from 'vue-property-decorator'
import { CreateElement } from 'vue';


@Component({})
export default class ecAuthToken extends Vue {
  _authToken: string=''

  render(h:CreateElement) {
    const _self = this
    let result = (<any>this.$scopedSlots).default({
      getAuthToken(){
        return _self._authToken
      },
      setAuthToken(_authToken:string){
        _self._authToken = _authToken 
      }
    })
    // if (Array.isArray(result)) {
    //   result = result.concat(this.$slots.default)
    // } else {
    //   result = [result].concat(this.$slots.default)
    // }
    return h('div', result)
  }
}
