import { rootDomain } from "../../core/config.js";

const state = {
  domain: "",
  name: "",
  description: "",
  keywords: [],
  schema: "<RTW>\n</RTW>",
  inlinePreScript: "",
  inlinePostScript: "",
  command: "<CMD>\n</CMD>",
  webJS: "",
  timeout: "30"
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
  editService(state, service) {
    state.domain = service.domain;
    state.name = service.serviceName;
    state.description = service.description;
    state.keywords = service.searchTerms.split(" ");
    state.schema = service.schema;
    state.command = service.cmdXML;
    state.inlinePreScript = service.preMasterScript;
    state.inlinePostScript = service.masterScript;
    state.webJS = service.webjs;
    state.timeout = service.timeout;
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
  },
  // eslint-disable-next-line no-unused-vars
  registerServiceParams(state, getters, rootState) {
    const { username, token } = rootState.authModule;
    const parameters = state;
    parameters.keywords = state.keywords.join(" ");
    parameters.username = username;
    parameters.token = token;
    return parameters;
  },
  // eslint-disable-next-line no-unused-vars
  updateServiceParams(state, getters, rootState) {
    const { token } = rootState.authModule;
    const parameters = state;
    parameters.token = token;
    return parameters;
  },
  deleteServiceParams(state, getters, rootState) {
    const { token } = rootState.authModule;
    const { domain, name } = state;
    const instance = "0";
    return {
      token: token,
      domain,
      name,
      instance
    };
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
