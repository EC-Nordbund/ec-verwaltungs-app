import Vue from 'vue';

export class Auth {
  public static install(vue: typeof Vue) {
    vue.prototype.$auth = () => {
      return Auth.instance;
    };
    vue.prototype.$login = (username: string, password: string) => {
      return new Auth(username, password).logedIn();
    };
    vue.prototype.$logout = () => {
      Auth.instance.logout();
    };
  }
  private static instance: Auth;

  public logedInOnlyOnce = false;

  private logInFinished = {
    ok: (bol: boolean) => {
      this.status = bol ? 1 : 2;
    },
    err: () => {
      this.status = -1;
    }
  };

  private status = 0;
  constructor(username: string, password: string) {
    Auth.instance = this;
  }

  public logout() {
    alert('SOON');
  }

  public get footerInfo(): string {
    return 'Comming soon';
  }

  private logedIn(): Promise<boolean> {
    if (this.logedInOnlyOnce) {
      throw new Error('Logedin darf nur einmal aufgerufen werden');
    }
    this.logedInOnlyOnce = true;
    return new Promise((res, rej) => {
      if (this.status === 0) {
        this.logInFinished = {
          ok: res,
          err: rej
        };
      } else if (this.status > 0) {
        res(this.status === 1);
      } else {
        rej('Unbekannter Fehler');
      }
    });
  }
}
