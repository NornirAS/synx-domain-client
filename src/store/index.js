import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import authentication from "./modules/authentication";
import services from "./modules/services";
import domains from "./modules/domains";
import ghosts from "./modules/ghosts";
import ghostDetails from "./modules/ghost-details";
import alert from "./modules/alert";
import serviceForm from "./modules/service-form";
import micropageForm from "./modules/micropage-form";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  modules: {
    services,
    domains,
    authentication,
    ghosts,
    ghostDetails,
    alert,
    serviceForm,
    micropageForm
  }
});
