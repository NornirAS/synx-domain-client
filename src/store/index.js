import Vue from "vue";
import Vuex from "vuex";
import servicesModule from "./modules/services";
import serviceModule from "./modules/service";
import domainsModule from "./modules/domains";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: null,
    idToken: null,
    authError: null,
    sideBarTitle: null,
    showDrawerOnMobile: null,
    isMobile: null
  },
  mutations: {
    isMobile(state, payload) {
      state.isMobile = payload;
    },
    showDrawerOnMobile(state, payload) {
      state.showDrawerOnMobile = payload;
    },
    authUser(state, { token, username }) {
      state.idToken = token;
      state.username = username;
    },
    authError(state, { error }) {
      state.authError = error;
    },
    signOut(state) {
      state.idToken = null;
      state.username = null;
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("expirationDate");
    }
  },
  actions: {
    tryAutoSignIn({ commit }) {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");
      if (!token) {
        return;
      }
      const expirationDate = localStorage.getItem("expirationDate");
      const expiredIn = new Date(expirationDate);
      const now = new Date();
      if (now >= expiredIn) {
        commit("signOut");
      } else {
        commit("authUser", {
          token: token,
          username: username
        });
      }
    },
    signOut({ commit }) {
      commit("signOut");
    },
    setSignOutTimer({ commit }) {
      const expirationDate = localStorage.getItem("expirationDate");
      const expiredIn = new Date(expirationDate).getTime();
      const now = new Date().getTime();
      const expirationTime = expiredIn - now;
      setTimeout(() => {
        commit("signOut");
      }, expirationTime);
    },
    SOCKET_authentication({ commit }, data) {
      if (data.ActiveToken) {
        commit("authUser", {
          token: data.ActiveToken,
          username: localStorage.getItem("username")
        });
        const now = new Date();
        const expirationTime = 3600 * 1000 * 9;
        const expirationDate = new Date(now.getTime() + expirationTime);
        localStorage.setItem("token", data.ActiveToken);
        localStorage.setItem("expirationDate", expirationDate);
      } else {
        commit("authError", {
          error: "Wrong username or password!"
        });
      }
    }
  },
  modules: {
    servicesModule,
    serviceModule,
    domainsModule
  },
  getters: {
    isAuthenticated({ idToken }) {
      return idToken !== null;
    },
    instancesBalance({ serviceForm, serviceInstances }) {
      return serviceForm.instances - serviceInstances;
    }
  }
});
