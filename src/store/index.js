import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      name: "",
      description: "",
      keywords: [],
      serviceXML: [],
      commandXML: [],
      instances: "",
      timeout: ""
    }
  },
  mutations: {
    serviceXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceFormserviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveSchema: (state, index) => {
      state.serviceForm.serviceXML.splice(index, 1);
    },
    commandXMLRemoveSchema: (state, index) => {
      state.serviceForm.commandXML.splice(index, 1);
    }
  },
  actions: {},
  modules: {}
});
