const state = {
  domain: "",
  schema: "",
  inlinePreScript: "",
  inlinePostScript: "",
  name: "",
  description: "",
  keywords: "",
  command: "",
  timeout: "30",
  webJS: "",
  isValidLinks: false
};

const mutations = {
  addDomain(state, payload) {
    state.domain = payload;
  },
  addName(state, payload) {
    state.name = payload;
  },
  addInlinePreScript(state, payload) {
    state.inlinePreScript = payload;
  },
  addInlinePostScript(state, payload) {
    state.inlinePostScript = payload;
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
    state.inlinePreScript = service.preMasterScript;
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
  },
  isValidLinks(state, payload) {
    state.isValidLinks = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
