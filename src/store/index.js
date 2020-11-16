import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/authentication";
import servicesModule from "./modules/services";
import serviceModule from "./modules/service";
import domainsModule from "./modules/domains";
import instancesModule from "./modules/instances";
import alarmModule from "./modules/alarm";
import sidebarsModule from "./modules/sidebars";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    showDrawerOnMobile: false,
    isMobile: false
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
    authModule,
    instancesModule,
    alarmModule,
    sidebarsModule
  }
});
