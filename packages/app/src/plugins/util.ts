import Vue from 'vue'

const requireUtil = require.context("../util", true, /(\w+\.ts)/);

let exp:any = {}

requireUtil.keys().map((fileName: string) => {
  const util = requireUtil(fileName);
  
  exp[util.name]=util.default
});

for (const key in exp) {
  exp.niceLogging('Util part gefunden:',key + ' ')
}

export const plugin = {
  install(vue:typeof Vue){
    vue.prototype.$util = exp
  }
}

export default exp