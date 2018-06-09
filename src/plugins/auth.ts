import gql from 'graphql-tag';
import { getClient } from './apollo';
import router from './router/router';

class auth {
  private _authToken: string = '';
  private _mutationList: string[] = [];
  public _userGroupBezeichnung: string = '____';
  private _fieldAccess: Array<{
    table: string;
    field: string;
  }> = [];

  public personBeschreibung = '';

  public pollInterval: number = 60000;

  constructor() {}

  public get authToken(): string {
    if (this.isLogedIn()) {
      this.extend();
    }
    return this._authToken;
  }

  public extend(): void {
    // Extend
    // TODO:
  }

  public isLogedIn(): boolean {
    return this._authToken.length > 0;
  }

  public logIn(
    username: string,
    password: string
  ): Promise<boolean> {
    return getClient()
      .mutate({
        mutation: gql`
          mutation($username: String!, $password: String!) {
            logIn(username: $username, password: $password)
          }
        `,
        variables: {
          username,
          password
        }
      })
      .then(v => (v.data as any).logIn)
      .then(authToken => {
        this._authToken = authToken;
        this.getRechte();
      })
      .then(v => true)
      .catch(v => false);
  }

  private getRechte() {
    return getClient()
      .query({
        query: gql`
          query($authToken: String!) {
            getMyUserData(authToken: $authToken) {
              userName
              ablaufDatum {
                german
              }
              person {
                vorname
                nachname
              }
              userGroup {
                bezeichnung
                mutationRechte
                fieldAccess {
                  table
                  field
                }
              }
            }
          }
        `,
        variables: {
          authToken: this.authToken
        }
      })
      .then(v => (v.data as any).getMyUserData)
      .then((conf: any) => {
        this._userGroupBezeichnung =
          conf.userGroup.bezeichnung;
        this._mutationList = conf.userGroup.mutationRechte;
        this._fieldAccess = conf.userGroup.fieldAccess;
        this.personBeschreibung = `Gültig für ${
          conf.person.vorname
        } ${conf.person.nachname} bis ${
          conf.ablaufDatum.german
        }`;
      });
  }

  public logOut(): Promise<boolean> | boolean {
    // TODO:
    this._authToken = '';
    return true;
  }

  public isMutationAllowed(mutName: string) {
    return this._mutationList.indexOf(mutName) !== -1;
  }

  public isFieldsAllowed(
    fields: Array<{
      table: string;
      field: string;
    }>
  ): boolean {
    let tmp = true;
    fields.map(this.isFieldAllowed).forEach(v => {
      tmp = tmp && v;
    });
    return tmp;
  }

  private isFieldAllowed(field: {
    table: string;
    field: string;
  }): boolean {
    const allow = [
      {
        table: '*',
        field: '*'
      },
      {
        table: field.table,
        field: '*'
      },
      {
        table: '*',
        field: field.field
      },
      {
        table: field.table,
        field: field.field
      }
    ].map(v => this._fieldAccess.indexOf(v) !== -1);
    return allow[0] || allow[1] || allow[2] || allow[3];
  }
}

export default new auth();
