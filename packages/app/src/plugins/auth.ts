import Vue from 'vue';
import * as save from 'js-cookie';
import gql from 'graphql-tag';


export default (router: any, createVue: any) => {
  const auth = {
    authToken: '',
    logout: new Date()
  };

  let handler = () => {};

  Vue.prototype.$setInactiveHandler = (cb: () => void) => {
    handler = cb;
  };

  setInterval(() => {
    const cookiedate = parseInt(save.get('logoutTime') || '0', 10);

    if (auth.logout.getTime() !== cookiedate) {
      auth.logout = new Date(cookiedate);
    }
    if (auth.logout.getTime() < (new Date()).getTime() || cookiedate === 0) {
      handler();
    }
  }, 10000);

  Vue.prototype.$authToken = () => {
    auth.logout = new Date(new Date().getTime() + 30 * 60000);
    save.set('logoutTime', auth.logout.getTime().toString());
    return auth.authToken;
  };

  Vue.prototype.$setAuthToken = (authToken: string) => {
    auth.logout = new Date(new Date().getTime() + 30 * 60000);
    auth.authToken = authToken;
    save.set('authToken', authToken, {expires: 1});
    save.set('logoutTime', auth.logout.getTime().toString());
  };


  const at = save.get('authToken');

  if (at) {
    Vue.prototype.$apolloClient.query({
      query: gql`
        query($at:String!) {
          person(personID: 0, authToken: $at) {
            personID
          }
        }
      `,
      variables: {
        at
      }
    }).then(() => {
      Vue.prototype.$setAuthToken(at);
    }).catch(() => {
      save.remove('authToken');
    }).then(() => {
      createVue();
    });
  } else {
    createVue();
  }
};
