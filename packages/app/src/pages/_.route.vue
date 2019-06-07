<template lang="pug">
  v-app(app :dark="dark")
    v-toolbar(fixed app clipped-left color="primary")
      v-toolbar-side-icon(v-white @click="drawer=!drawer")
      //- v-btn(v-white icon @click="$router.back()")
      //-   v-icon undo
      //- v-btn(v-white icon @click="$router.forward()")
      //-   v-icon redo
      v-spacer
      v-avatar(size="60px" style="margin-right: 10px")
        img(src="@/assets/ec-logo-without-bg-64.png")
      span(v-white v-font style="font-size: 26px; padding-top: 5px; margin-right: 8px;") Nordbund – Verwaltung
      v-spacer
      ec-lesezeichen-show
      div(style="padding-right: 20px") 
      v-btn(icon v-white @click="toggleDark")
        v-icon invert_colors
      v-btn(icon v-white @click="logout")
        v-icon exit_to_app
    
    v-navigation-drawer(clipped app v-model="drawer")
      v-toolbar(flat class="transparent")
        v-list
          v-list-tile(avatar to="/sonstiges/profil")
            v-list-tile-avatar
              div(style="border-radius: 50%;width: 40px;height: 40px;padding: 8px 0;" v-primary-bg v-black)
                | {{data.person.vorname[0]}}{{data.person.nachname[0]}}
              //- img(src="https://randomuser.me/api/portraits/men/85.jpg")
            v-list-tile-content
              v-list-tile-title {{data.person.vorname}} {{data.person.nachname}} ({{data.ablaufDatum.german}})
      v-list
        v-list-tile(to="/home")
          v-list-tile-action
            v-icon home
          v-list-tile-title Home
        v-divider
        v-subheader Personen
        v-list-tile(to="/personen")
          v-list-tile-action
            v-icon person
          v-list-tile-title Personen
        v-list-tile(to="/ak")
          v-list-tile-action
            v-icon group
          v-list-tile-title Arbeitskreise
        v-divider
        v-subheader Veranstaltungen
        v-list-tile(to="/anmeldungen")
          v-list-tile-action
            v-icon assignment_ind
          v-list-tile-title Anmeldungen
        v-list-tile(to="/veranstaltungen")
          v-list-tile-action
            v-icon event
          v-list-tile-title Veranstaltungen
        v-list-tile(to="/veranstaltungsort")
          v-list-tile-action
            v-icon home
          v-list-tile-title Veranstaltungsorte
        v-list-tile(to="/organisationen")
          v-list-tile-action
            v-icon library_books
          v-list-tile-title Organisationen
        v-divider
        v-subheader Dublikate
        v-list-tile(to="/dublikate/personen")
          v-list-tile-action
            v-icon person
          v-list-tile-title Personen
        v-list-tile(to="/dublikate/adressen")
          v-list-tile-action
            v-icon home
          v-list-tile-title Adressen
        v-divider
        v-subheader Sonstiges
        v-list-tile(to="/sonstiges/admin")
          v-list-tile-action
            v-icon settings
          v-list-tile-title Administration
        v-list-tile(to="/sonstiges/datenschutz")
          v-list-tile-action
            v-icon security
          v-list-tile-title Datenschutz
        //- v-list-tile(to="/sonstiges/impressum")
        //-   v-list-tile-action
        //-     v-icon menu
        //-   v-list-tile-title Impressum
    
    v-content
      router-view(:key="$route.path" style="margin: 5px; width: calc(100% - 10px);")
    
    v-footer(app style="padding: 0 10px;" fixed color="secondary")
      v-breadcrumbs(:items="breadcrumbsRouter")
        v-icon(slot="divider" v-white) keyboard_arrow_right
        template(slot="item" slot-scope="props")
          span.disabled(v-white) {{props.item.text}}
      v-spacer
      span(v-white) Version: {{version}}
      v-spacer
      v-breadcrumbs(:items="breadcrumbs")
        v-icon(slot="divider" v-white) keyboard_arrow_right
        template(slot="item" slot-scope="props")
          span.disabled(v-white) {{props.item.text}}
    formular-selector(name="inactive" ref="inactive")
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import pack from '@/plugins/package';
import gql from 'graphql-tag';
import * as save from 'js-cookie';
// ()
@Component({})
export default class EcRootIndex extends Vue {

  private get breadcrumbsRouter(): any[] {
    return this.breadMap(
      this.$route.path
        .split('/')
        .slice(1)
        .map((v) => v[0].toUpperCase() + v.slice(1))
    );
  }
  public static meta = {};

  public inactive: boolean = false;

  private dark = (save.get('dark') === 'x');
  private drawer = null;
  private version = pack.version || 'Fehler';
  private breadcrumbs = this.breadMap([
    `© 2017 - ${new Date().getFullYear()}`,
    'EC-Nordbund',
    'T. Krause + S. Krüger'
  ]);

  private data: any = {person: {vorname: {}, nachname: {}}, userGroup: {}, ablaufDatum: {}};

  private toggleDark() {
    this.dark = !this.dark;
    save.set('dark', this.dark ? 'x' : '');
  }

  private breadMap(arr: string[]) {
    return arr.map((el) => ({ text: el, disabled: true }));
  }

  private logout() {
    this.$apolloClient.mutate({
      mutation: gql`
        mutation($authToken: String!) {
          logOut(authToken: $authToken)
        }
      `,
      variables: {
        authToken: this.$authToken()
      }
    }).then(() => {
      this.$setAuthToken('');
      this.$router.push({path: '/login', query: {next: this.$route.fullPath}});
      save.set('logoutTime', '0');
    });
  }

  private created() {
    if (!this.$authToken()) {
      this.$router.push({path: '/login', query: {next: this.$route.fullPath}});
    } else {
      this.$apolloClient.query({
        query: gql`
          query($authToken: String!) {
            getMyUserData(authToken: $authToken) {
              userName
              userGroup {
                bezeichnung
              }
              person {
                vorname
                nachname
              }
              ablaufDatum {
                german
              }
            }
          }`,
        variables: {
          authToken: this.$authToken()
        }
      }).then((res) => {
        this.data = res.data.getMyUserData;
      });
      this.$setInactiveHandler(() => {
        if (!this.inactive) {
          this.inactive = true;
          (this.$refs.inactive as any).show().then((data: {pin: string}) => {
            this.$apolloClient.mutate({
              mutation: gql`
                mutation($authToken: String!, $pin: String!) {
                  reActivate(authToken: $authToken, pin: $pin)
                }
              `,
              variables: {
                authToken: this.$authToken(),
                pin: data.pin
              }
            }).then(() => {
              this.inactive = false;
            }).catch(() => {
              this.$dialog.error({
                text: 'Du wirst automatisch abgemeldet!',
                title: 'Reaktivieren fehlgeschlagen!'
              });
              setTimeout(() => {
                this.logout();
              }, 5000);
            });
          }).catch(() => {
            this.$dialog.error({
              text: 'Du wirst automatisch abgemeldet!',
              title: 'Reaktivieren fehlgeschlagen!'
            });
            setTimeout(() => {
              this.logout();
            }, 5000);
          });
        }
      });
    }
  }
}
</script>