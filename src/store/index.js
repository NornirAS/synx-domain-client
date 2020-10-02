import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      name: null,
      description: null,
      keywords: [],
      serviceXML: [],
      commandXML: [],
      instances: 0,
      timeout: "30"
    },
    idToken: null,
    authError: null
  },
  mutations: {
    serviceXMLAddLink(state, { name, linkTo }) {
      const schema = state.serviceForm.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLAddLink(state, { name, linkTo }) {
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveLink(state, { name, linkTo }) {
      const schema = state.serviceFormserviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLRemoveLink(state, { name, linkTo }) {
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveSchema(state, index) {
      state.serviceForm.serviceXML.splice(index, 1);
    },
    commandXMLRemoveSchema(state, index) {
      state.serviceForm.commandXML.splice(index, 1);
    },
    authUser(state, { token }) {
      state.idToken = token;
    },
    authError(state, { error }) {
      state.authError = error;
    },
    signOut(state) {
      state.idToken = null;
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
    }
  },
  actions: {
    signIn({ commit, dispatch }, { username, password }) {
      axios
        .post(
          "https://synxpass.cioty.com/token/GetToken.php",
          `username=${username}&password=${password}`
        )
        .then(res => {
          if (res.data.ActiveToken) {
            commit("authUser", {
              token: res.data.ActiveToken
            });
            const now = new Date();
            const expirationTime = 3600 * 1000;
            const expirationDate = new Date(now.getTime() + expirationTime);
            localStorage.setItem("token", res.data.ActiveToken);
            localStorage.setItem("expirationDate", expirationDate);
            dispatch("setSignOutTimer", expirationTime);
          } else {
            commit("authError", {
              error: "Wrong username or password!"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    tryAutoSignIn({ commit }) {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      commit("authUser", {
        token: token
      });
    },
    signOut({ commit }) {
      commit("signOut");
    },
    setSignOutTimer({ commit }, expirationTime) {
      setTimeout(() => {
        commit("signOut");
      }, expirationTime);
    }
    // SOCKET_GET_TOKEN: ({ commit }, payload) => {
    //   commit("getToken", payload);
    // }
  },
  modules: {},
  getters: {
    isAuthenticated({ idToken }) {
      return idToken !== null;
    }
  }
});
