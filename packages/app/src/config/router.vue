<template>
  <transition :name="routingAnimation">
    <router-view :class="viewClass"/>
  </transition>
</template>

<script lang="ts">
import {
  Component,
  Vue,
  Watch
} from 'vue-property-decorator'

@Component({})
export default class Router extends Vue {
  routingAnimation: string = ''
  viewClass: string = 'child-routing'

  @Watch('$route')
  onRouteChange(to: any, from: any) {
    const toA = to.path.split('/')
    const fromA = from.path.split('/')

    const toDepth = toA.length
    const fromDepth = fromA.length

    // length of shortest path
    var depthCommonRoute =
      toDepth < fromDepth ? toDepth : fromDepth

    // search for depth of the most common route
    for (let i = 0; i < depthCommonRoute; i++) {
      if (toA[i] !== fromA[i]) {
        depthCommonRoute = i
        break
      }
    }

    this.viewClass =
      depthCommonRoute <= 2
        ? 'no-route-animation'
        : 'route-animation'

    this.routingAnimation =
      depthCommonRoute <= 2
        ? ''
        : toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
</script>
