import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        primary: "#27aae1",
        secondary: "#404b5f",
        accent: "#71b663",
        error: "#ff6666"
      }
    }
  },
  icons: {
    iconfont: "mdiSvg"
  }
});
