import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceXML: []
  },
  mutations: {
    setAge: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    }
  },
  actions: {},
  modules: {}
});
