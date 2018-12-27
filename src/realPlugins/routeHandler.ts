import auth from '@/plugins/auth';
import eventbus from '@/plugins/eventbus';
import Vue from 'vue';
import VueRouter from 'vue-router';

export default {
  install(
    vue: typeof Vue,
    options: {
      startPage: string
      loginPage: string
      routesWithOutLogIn: Array<string>
      router: VueRouter
    }
  ) {
    // Router Guard
    options.router.beforeEach((to, from, next) => {
      console.log(to.path)
      // wenn /login und angemeldet -> startpage
      if (auth.isLogedIn()) {
        if (
          to.meta.userGroups !== undefined &&
          (to.meta.userGroups === '*' ||
            to.meta.userGroups.indexOf(
              auth._userGroupBezeichnung
            ) !== -1)
        ) {
          next()
        } else {
          next(options.startPage)
        }
      } else {
        if (
          options.routesWithOutLogIn.indexOf(
            to.fullPath
          ) !== -1
        ) {
          next()
        } else {
          next(options.loginPage)
        }
      }
    })

    eventbus.on('logedOut', () => {
      options.router.push(options.loginPage)
    })
  }
}
