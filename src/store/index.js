import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/authentication";
import servicesModule from "./modules/services";
import domains from "./modules/domains";
import ghosts from "./modules/ghosts";
import ghostDetails from "./modules/ghost-details";
import alarmModule from "./modules/alarm";
import serviceFormModule from "./modules/service-form";
import micropageFormModule from "./modules/micropage-form";

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
    domains,
    authModule,
    ghosts,
    ghostDetails,
    alarmModule,
    serviceFormModule,
    micropageFormModule
  }
});
