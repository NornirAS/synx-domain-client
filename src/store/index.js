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
    },
    serviceXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveSchema: (state, index) => {
      state.serviceXML.splice(index, 1);
    },
    commandXMLRemoveSchema: (state, index) => {
      state.commandXML.splice(index, 1);
    }
  },
  actions: {},
  modules: {}
});
