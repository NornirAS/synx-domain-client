import Vue from "vue";
import store from "../store";
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: io("https://synx-domain-server.herokuapp.com:8080"),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);
