const state = {
  // service
  domain: "",
  name: "",
  schema: "<rtw>\n</rtw>",
  inlinePreScript: "",
  inlinePostScript: "",
  command: "<cmd>\n</cmd>",
  webJS: "",
  timeout: "30",
  // micropage
  description: "",
  schemaDescription: "",
  imageUrl: "",
  keywords: [],
  // other
  isValidLinks: false,
  isServiceFormValid: false,
  isMicropageFormValid: false
};

const mutations = {
  addDomain(state, payload) {
    state.domain = payload;
  },
  addName(state, payload) {
    state.name = payload;
  },
  addSchema(state, payload) {
    state.schema = payload;
  },
  addInlinePreScript(state, payload) {
    state.inlinePreScript = payload;
  },
  addInlinePostScript(state, payload) {
    state.inlinePostScript = payload;
  },
  addCommand(state, payload) {
    state.command = payload;
  },
  addWebJS(state, payload) {
    state.webJS = payload;
  },
  setTimeout(state, payload) {
    state.timeout = payload;
  },
  addDescription(state, payload) {
    state.description = payload;
  },
  addSchemaDescription(state, payload) {
    state.schemaDescription = payload;
  },
  addImageUrl(state, payload) {
    state.imageUrl = payload;
  },
  addKeywords(state, payload) {
    state.keywords = payload;
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
    state.webJS = service.webjs;
    state.timeout = service.timeout;
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
  },
  isServiceFormValid(state, payload) {
    state.isServiceFormValid = payload;
  },
  isMicropageFormValid(state, payload) {
    state.isMicropageFormValid = payload;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
