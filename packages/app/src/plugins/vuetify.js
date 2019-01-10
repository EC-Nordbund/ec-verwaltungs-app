import Vuetify from "vuetify";
import "vuetify/src/stylus/app.styl";
import { theme } from "@/config/theme";
import de from "vuetify/es5/locale/de";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";

export default {
  install(vue, options) {
    vue.use(Vuetify, {
      theme,
      customProperties: true,
      iconfont: "md",
      lang: {
        locales: { de },
        current: "de"
      }
    });
    options.util.niceLogging("Dependency:", "Vuetify", Vuetify.version);
  }
};
