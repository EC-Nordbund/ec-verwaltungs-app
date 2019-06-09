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
    return h(
      'ec-form-anmeldung', 
      {
        props: this.options, 
        attrs: this.options, 
        on: {
          save: (<any>window).$save,
          cancel: (<any>window).$cancel
        }
      }
    )
  }
}).$mount('#anmeldung');


(<any>window).$save = function (data: any) {
  alert(JSON.stringify(data))
  //TODO: Tu was mit den Daten... => Bestätigungsmail
};

(<any>window).$cancel = function () {
  alert('abrechen')
  // Relink to ec-nb page
}