import auth from '@/plugins/auth';
import router from '@/plugins/router/router';

const startPage = '/app';
const loginPage = '/login';

const routesWithOutLogIn = [loginPage];

router.beforeEach((to, from, next) => {
  // wenn /login und angemeldet -> startpage
  // console.log(to)
  if (auth.isLogedIn()) {
    if (
      to.meta.userGroups !== undefined &&
      (to.meta.userGroups === '*' ||
        to.meta.userGroups.indexOf(
          auth._userGroupBezeichnung
        ) !== -1)
    ) {
      next();
    } else {
      next(startPage);
    }
  } else {
    if (routesWithOutLogIn.indexOf(to.fullPath) !== -1) {
      next();
    } else {
      next(loginPage);
    }
  }
});
