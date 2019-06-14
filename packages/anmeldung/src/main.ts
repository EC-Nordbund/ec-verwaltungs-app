import '@babel/polyfill'
import Vue from 'vue';
// @ts-ignore
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
  console.log(data.stepper);  
  window.fetch(`/index.php?content=${encodeURI(JSON.stringify(data.stepper))}&token=${(<any>window).token}&vid=${(<any>window).vid}`)
    .then((res)=>{
      res.json().then(console.log);
      alert('Erfolgreich angemeldet. In wenigen Minuten erhälst du eine Bestätigungsmail.')
    })
    .catch((err)=>{
      alert("Fehler" + err)
    })
};

(<any>window).$cancel = function () {
  const prev = (<any>window).$prev;
  if(prev) {
    if(confirm('Sicher, dass du abbrechen willst?')) {
      location.href = prev;
    }
  } else {
    alert('Du kannst nicht abbrechen...')
  }
}