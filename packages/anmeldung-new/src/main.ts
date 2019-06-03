import '@babel/polyfill'
import Vue from 'vue';
import Vuetify from 'vuetify/lib'
import de from 'vuetify/src/locale/de'
import '@/assets/ecForm.umd.min.js';

Vue.use(Vuetify, {
  theme: {
    primary: '#8FB217',
    secondary: '#46A215',
    accent: '#AC1636',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    white: '#FFFFFF',
    black: '#000000',
    bg: '#eef3dc',
    male: '#4697BA',
    female: '#C243AA'
  },
  iconfont: 'md',
  lang: {
    locales: { de },
    current: 'de'
  },
})

Vue.config.productionTip = false;

(<any>window).anmeldung = new Vue({
  data: {
    options: (<any>window).$options
  },
  render: function (h) {
    return h('ec-form-anmeldung', {props: this.options, attrs: this.options, ref: 'form'})
  },
  methods: {
    show: function () {
      return (<any>this.$refs.form).show()
    }
  }
}).$mount('#anmeldung');


(<any>window).show = async function (options?: any) {
  if (options) {
    (<any>window).anmeldung.options = options;
  }
  let data = await (<any>window).anmeldung.show();
  alert(JSON.stringify(data))
  //TODO: Tu was mit den Daten... => Bestätigungsmail
}