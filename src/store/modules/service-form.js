const state = {
  domain: "",
  name: "",
  description: "",
  keywords: "",
  schema: "",
  command: "",
  timeout: "30",
  preInlineScript: "",
  postInlineScript: "",
  webJS: ""
};

const mutations = {
  addDomain(state, payload) {
    state.domain = payload;
  },
  addName(state, payload) {
    state.name = payload;
  },
  addDescription(state, payload) {
    state.description = payload;
  },
  addKeywords(state, payload) {
    state.keywords = payload;
  },
  addSchema(state, payload) {
    state.schema = payload;
  },
  addCommand(state, payload) {
    state.command = payload;
  },
  setTimeout(state, payload) {
    state.timeout = payload;
  },
  addPreInlineScript(state, payload) {
    state.preInlineScript = payload;
  },
  addPostInlineScript(state, payload) {
    state.postInlineScript = payload;
  },
  addWebJS(state, payload) {
    state.webJS = payload;
  },
  editService(state, service) {
    state.domain = service.domain;
    state.name = service.serviceName;
    state.description = service.description;
    state.keywords = service.searchTerms;
    state.schema = service.schema;
    state.command = service.cmdXML;
    state.preInlineScript = service.preMasterScript;
    state.postInlineScript = service.masterScript;
    state.webJS = "Hello World!";
  },
  resetServiceForm(state) {
    state.domain = "";
    state.name = "";
    state.description = "";
    state.keywords = "";
    state.serviceSchema = "";
    state.commandSchema = "";
    state.preInlineScript = "";
    state.postInlineScript = "";
    state.webJS = "";
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
