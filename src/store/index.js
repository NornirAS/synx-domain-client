import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      serviceName: "Valera",
      description: "description",
      keywords: ["hi", "there"],
      serviceSchema: [
        {
          tagName: "test",
          linkTo: {
            domain: "home",
            service: "sun",
            variable: "light"
          }
        }
      ],
      commandSchema: [],
      instances: 300,
      timeOut: "30",
      masterScript: "YWFhYWFhYWFhYQo=",
      webJS: "Hello"
    },
    services: [],
    username: null,
    idToken: null,
    authError: null,
    serviceCreated: false,
    serviceRegistrationError: null,
    selectAll: false
  },
  mutations: {
    serviceSchemaAddLink(state, { tagName, linkTo }) {
      const schema = state.serviceForm.serviceSchema.find(
        s => s.tagName === tagName
      );
      schema.linkTo = linkTo;
    },
    serviceSchemaRemoveLink(state, { tagName, linkTo }) {
      const schema = state.serviceFormserviceSchema.find(
        s => s.tagName === tagName
      );
      schema.linkTo = linkTo;
    },
    removeServiceSchema(state, index) {
      state.serviceForm.serviceSchema.splice(index, 1);
    },
    removeCommandSchema(state, index) {
      state.serviceForm.commandSchema.splice(index, 1);
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
      state.selectAll = !state.selectAll;
      if (!state.selectAll) {
        state.services.forEach(service => {
          service.isSelected = true;
        });
      } else {
        state.services.forEach(service => {
          service.isSelected = false;
        });
      }
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
    selectService({ commit }, index) {
      commit("selectService", index);
    },
    selectAllServices({ commit }) {
      commit("selectAllServices");
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
