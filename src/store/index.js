import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/authentication";
import servicesModule from "./modules/services";
import serviceModule from "./modules/service";
import domainsModule from "./modules/domains";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
    }
  },
  modules: {
    servicesModule,
    serviceModule,
    domainsModule,
    authModule
  }
});
