import { rootDomain } from "../../core/config.js";

const state = {
  domain: "",
  name: "",
  description: "",
  keywords: "",
  schema: "<RTW>\n</RTW>",
  inlinePreScript: "",
  inlinePostScript: "",
  command: "<CMD>\n</CMD>",
  webJS: "",
  timeout: "30",
  isValidLinks: false
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
  addIsValidLinks(state, payload) {
    state.isValidLinks = payload;
  },
  editService(state, payload) {
    state.domain = payload.domain;
    state.name = payload.serviceName;
    state.description = payload.description;
    state.keywords = payload.searchTerms;
    state.schema = payload.schema;
    state.command = payload.cmdXML;
    state.inlinePreScript = payload.preMasterScript;
    state.inlinePostScript = payload.masterScript;
    state.webJS = payload.webjs;
    state.timeout = payload.timeout;
  },
  resetServiceForm(state) {
    state.domain = "";
    state.name = "";
    state.description = "";
    state.keywords = [];
    state.schema = "<RTW>\n</RTW>";
    state.command = "<CMD>\n</CMD>";
    state.inlinePreScript = "";
    state.inlinePostScript = "";
    state.webJS = "";
    state.timeout = "30";
  }
};

const getters = {
  serviceURI({ domain, name }) {
    return `${domain}${rootDomain}${name}`;
  },
  serviceURL(state, { serviceURI }) {
    return `https://${serviceURI}/`;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
