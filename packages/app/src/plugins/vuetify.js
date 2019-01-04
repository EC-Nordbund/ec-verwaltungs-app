import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/src/stylus/app.styl";
import {theme} from "@/config/theme";
import de from "vuetify/es5/locale/de";

Vue.use(Vuetify, {
  theme,
  customProperties: true,
  iconfont: "md",
  lang: {
    locales: {de},
    current: "de"
  }
});
