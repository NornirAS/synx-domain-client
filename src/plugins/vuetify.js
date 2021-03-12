import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        anchor: "#27aae1",
        primary: "#404b5f",
        secondary: "#ebeff4",
        accent: "#71b663",
        error: "#ff6666",
        info: "#27aae1"
      }
    }
  },
  icons: {
    iconfont: "mdiSvg"
  }
});
