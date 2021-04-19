import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        anchor: "#4f5f9c",
        primary: "#4f4c9c",
        secondary: "#4f5f9c",
        accent: "#4f9c3d",
        warning: "#9c4f4c",
        error: "#9c174f",
        info: "#9c4fff"
      },
      dark: {
        anchor: "#03dac6",
        primary: "#03dac6",
        secondary: "#bb86fc",
        error: "#cf6679",
        info: "#03dac6"
      }
    }
  },
  icons: {
    iconfont: "mdiSvg"
  }
});
