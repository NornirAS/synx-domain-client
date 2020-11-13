import Vue from "vue";
import Vuex from "vuex";
import authModule from "./modules/authentication";
import servicesModule from "./modules/services";
import serviceModule from "./modules/service";
import domainsModule from "./modules/domains";
import instancesModule from "./modules/instances";
import alarmModule from "./modules/alarm";

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
    },
    sideBarTitle(state, payload) {
      state.sideBarTitle = payload;
    }
  },
  getters: {
    isEditPage({ sideBarTitle }) {
      return sideBarTitle === "Edit Service" ? true : false;
    }
  },
  modules: {
    servicesModule,
    serviceModule,
    domainsModule,
    authModule,
    instancesModule,
    alarmModule
  }
});
