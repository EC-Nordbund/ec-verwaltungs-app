<template lang="pug">
  v-app(app :dark="dark")
    v-toolbar(fixed app clipped-left color="primary")
      v-toolbar-side-icon(v-white @click="drawer=!drawer")
      v-btn(v-white icon @click="$router.back()")
        v-icon navigate_before
      v-btn(v-white icon @click="$router.forward()")
        v-icon navigate_next
      v-spacer
      v-avatar(size="60px" style="margin-right: 10px")
        img(src="../../public/ec-logo-without-bg-64.png")
      span.ec_title_text(v-white v-font) Nordbund – Verwaltung
      v-spacer
      ec-lesezeichen-show
      div.ecPaddingRight
      v-btn(icon v-white @click="dark=!dark")
        v-icon invert_colors
      v-btn(icon v-white @click="logout")
        v-icon exit_to_app
    v-navigation-drawer(clipped app v-model="drawer")
      v-toolbar(flat class="transparent")
        v-list
          v-list-tile(avatar to="/sonstiges/profil")
            v-list-tile-avatar
              img(src="https://randomuser.me/api/portraits/men/85.jpg")
            v-list-tile-content
              v-list-tile-title Thomas Seeger
      v-list
        v-list-tile(to="/home")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Home
        v-divider
        v-subheader Personen
        v-list-tile(to="/personen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Personen
        v-list-tile(to="/ak")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Arbeitskreise
        v-divider
        v-subheader Veranstaltungen
        v-list-tile(to="/anmeldungen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Anmeldungen
        v-list-tile(to="/veranstaltungen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Veranstaltungen
        v-list-tile(to="/veranstaltungsort")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Veranstaltungsorte
        v-list-tile(to="/organisationen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Organisationen
        v-divider
        v-subheader Dublikate
        v-list-tile(to="/dublikate/personen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Personen
        v-list-tile(to="/dublikate/adressen")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Adressen
        v-divider
        v-subheader Sonstiges
        v-list-tile(to="/sonstiges/admin")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Administration
        v-list-tile(to="/sonstiges/datenschutz")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Datenschutz
        v-list-tile(to="/sonstiges/impressum")
          v-list-tile-action
            v-icon menu
          v-list-tile-title Impressum
    v-content
      router-view.ec_content(:key="$route.path")
    v-footer.ec_footer(app fixed color="secondary")
      v-breadcrumbs.content(:items="breadcrumbsRouter")
        v-icon(slot="divider" v-white) keyboard_arrow_right
        template(slot="item" slot-scope="props")
          span.disabled(v-white) {{props.item.text}}
      v-spacer
      span.content(v-white) Version: {{version}}
      v-spacer
      v-breadcrumbs.content(:items="breadcrumbs")
        v-icon(slot="divider" v-white) keyboard_arrow_right
        template(slot="item" slot-scope="props")
          span.disabled(v-white) {{props.item.text}}
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { version } from '../../package.json';
// ()
@Component({})
export default class EcRootIndex extends Vue {
  public static meta = {};

  public dark = false;
  public drawer = null;
  public version = version;
  public breadcrumbs = [
    `© 2017 - ${new Date().getFullYear()}`,
    'EC-Nordbund',
    'T. Krause + S. Krüger'
  ].map((v) => ({ text: v, disabled: true }));

  get breadcrumbsRouter():Array<any>{
    return this.$route.path.split('/').slice(1).map(v=>v[0].toUpperCase() + v.slice(1)).map((v) => ({ text: v, disabled: true }));
  }

  public logout() {
    this.$auth().logout();
  }

  
  public get footerInfo() : string {
    return (this.$auth() || {}).footerInfo;
  }
}
</script>

<style lang="scss" scoped>
.ec_title_text {
  font-size: 26px; 
  padding-top: 5px; 
  margin-right: 8px;
}
.ecPaddingRight {
  padding-right: 20px
}
.ec_content {
  margin: 5px; 
  width: calc(100% - 10px);
}
.ec_footer {
  z-index: 9999; 
  padding: 0 10px;
  > .content {
    width: 30%;
    text-align: center;
  }
}
</style>