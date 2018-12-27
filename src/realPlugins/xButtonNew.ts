import { CreateElement } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class xButtonNew extends Vue {
  btnClick() {
    if (typeof this.$route.query.prev === 'string') {
      this.$router.push(this.$route.query.prev)
    }
  }
  render(h: CreateElement) {
    return h(
      'v-btn',
      {
        on: { click: this.btnClick },
        props: {
          disabled:
            typeof this.$route.query.prev !== 'string',
          icon: true
        }
      },
      [h('v-icon', {}, 'close')]
    )
  }
}
