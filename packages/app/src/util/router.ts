import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from '@/config/routes';

export const name = "router"

export default (vue:typeof Vue)=>{
  vue.use(VueRouter);
  
  return new VueRouter({routes})
}