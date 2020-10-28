import Vue from "vue";
import Vuex from "vuex";
import servicesModule from "./modules/services";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      serviceName: null,
      description: null,
      keywords: [],
      serviceSchema: [],
      commandSchema: [],
      instances: null,
      timeOut: "30",
      masterScript: "YWFhYWFhYWFhYQo=",
      webJS: "Hello"
    },
    serviceInstances: null,
    ownedDomains: [],
    domain: null,
    username: null,
    idToken: null,
    authError: null,
    formSubmited: false,
    formError: null,
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
      state.formSubmited = true;
    },
    serviceRegistrationError(state) {
      state.formSubmited = false;
      state.formError =
        "Registration Error. Something went wrong. Try one more time";
    },
    serviceUpdateSuccess(state) {
      state.formSubmited = true;
    },
    serviceUpdatedError(state) {
      state.formSubmited = false;
      state.formError = "Update Error. Something went wrong. Try one more time";
    },
    editService(state, service) {
      const form = state.serviceForm;
      form.serviceName = service.serviceName;
      form.description = service.description;
      form.keywords = service.searchTerms;
      form.serviceSchema = service.schema;
      form.commandSchema = service.cmdXML;
      form.instances = parseInt(service.instances);
      state.serviceInstances = parseInt(service.instances);
    },
    resetServiceForm(state) {
      state.serviceForm.serviceName = null;
      state.serviceForm.description = null;
      state.serviceForm.keywords = [];
      state.serviceForm.serviceSchema = [];
      state.serviceForm.commandSchema = [];
      state.serviceForm.instances = null;
      state.serviceInstances = null;
    },
    allDomains(state, payload) {
      state.ownedDomains = payload;
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
    editService({ commit }, index) {
      const service = this.state.services[index];
      commit("editService", service);
    },
    resetServiceForm({ commit }) {
      commit("resetServiceForm");
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
    SOCKET_service_update_success({ commit }) {
      commit("serviceUpdateSuccess");
    },
    SOCKET_service_update_error({ commit }) {
      commit("serviceUpdateError");
    },
    SOCKET_all_domains({ commit }, data) {
      commit("allDomains", data);
    }
  },
  modules: {
    servicesModule
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
