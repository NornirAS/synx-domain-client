import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      name: null,
      description: null,
      keywords: [],
      serviceXML: [],
      commandXML: [],
      instances: null,
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
    },
    SOCKET_authentication: ({ commit, dispatch }, data) => {
      if (data.ActiveToken) {
        commit("authUser", {
          token: data.ActiveToken
        });
        const now = new Date();
        const expirationTime = 3600 * 1000;
        const expirationDate = new Date(now.getTime() + expirationTime);
        localStorage.setItem("token", data.ActiveToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch("setSignOutTimer", expirationTime);
      } else {
        commit("authError", {
          error: "Wrong username or password!"
        });
      }
    }
  },
  modules: {},
  getters: {
    isAuthenticated({ idToken }) {
      return idToken !== null;
    }
  }
});
