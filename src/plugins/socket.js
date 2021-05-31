import Vue from "vue";
import store from "../store";
import VueSocketIO from "vue-socket.io";

export default Vue.use(
  new VueSocketIO({
    debug: process.env.NODE_ENV === "production" ? false : true,
    connection:
      process.env.NODE_ENV === "production"
        ? process.env.VUE_APP_RTW_PROXY
        : "http://localhost:3000",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
