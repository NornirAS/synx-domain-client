import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/authentication";
import servicesModule from "./modules/services";
import domainsModule from "./modules/domains";
import ghosts from "./modules/ghosts";
import alarmModule from "./modules/alarm";
import serviceFormModule from "./modules/service-form";
import micropageFormModule from "./modules/micropage-form";
import stripeModule from "./modules/stripe";

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
    domainsModule,
    authModule,
    ghosts,
    alarmModule,
    serviceFormModule,
    micropageFormModule,
    stripeModule
  }
});
