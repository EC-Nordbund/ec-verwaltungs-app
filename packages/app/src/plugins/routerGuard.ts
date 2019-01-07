import Vue from 'vue';
import { auth as _auth } from "@/plugins/auth";
import VueRouter from "vue-router";
import { ApolloClient } from 'apollo-boost';

export default {
  install(vue: typeof Vue, options: {router: VueRouter, auth: typeof _auth, util: any, apolloClient:ApolloClient<any>}) {
    options.router.beforeEach((to, from, next) => {
      if (to.path !== '/login') {
        if (options.auth.instance) {
          // check if allowed
          next()
        } else {
          next({path: '/login', query:{afterLogIn: to.fullPath}})
        }
      } else {
        next()
      }
      
    })    
  }
}
