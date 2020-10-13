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
    services: [],
    username: null,
    idToken: null,
    authError: null,
    serviceCreated: false,
    serviceRegistrationError: null
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
    serviceRegistrationSuccess(state) {
      state.serviceCreated = true;
    },
    serviceRegistrationError(state) {
      state.serviceCreated = false;
      state.serviceRegistrationError =
        "Something went wrong. Try one more time";
    },
    allServices(state, payload) {
      state.services = payload;
    },
    selectService(state, index) {
      state.services[index].isSelected = !state.services[index].isSelected;
    },
    selectAllServices(state) {
      state.services.forEach(service => {
        service.isSelected = !service.isSelected;
      });
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
      const now = new Date();
      if (now >= expirationDate) {
        return;
      }
      commit("authUser", {
        token: token,
        username: username
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
    selectService({ commit }, index) {
      commit("selectService", index);
    },
    selectAllServices({ commit }) {
      commit("selectAllServices");
    },
    SOCKET_authentication({ commit, dispatch }, data) {
      if (data.ActiveToken) {
        commit("authUser", {
          token: data.ActiveToken,
          username: localStorage.getItem("username")
        });
        const now = new Date();
        const expirationTime = 3600000;
        const expirationDate = new Date(now.getTime() + expirationTime);
        localStorage.setItem("token", data.ActiveToken);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch("setSignOutTimer", expirationTime);
      } else {
        commit("authError", {
          error: "Wrong username or password!"
        });
      }
    },
    SOCKET_service_registration_success({ commit }) {
      commit("serviceRegistrationSuccess");
    },
    SOCKET_service_registration_error({ commit }) {
      commit("serviceRegistrationError");
    },
    SOCKET_all_services({ commit }, data) {
      const services = [];
      data.forEach(item => {
        const object = JSON.parse(item);
        const isSelected = object => {
          object.isSelected = false;
          return object;
        };
        const newObject = isSelected(object);
        services.push(newObject);
      });
      commit("allServices", services);
    }
  },
  modules: {},
  getters: {
    isAuthenticated({ idToken }) {
      return idToken !== null;
    }
  }
});
