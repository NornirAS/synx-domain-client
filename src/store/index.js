import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceXML: [],
    commandXML: []
  },
  mutations: {
    serviceXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    }
  },
  actions: {},
  modules: {}
});
