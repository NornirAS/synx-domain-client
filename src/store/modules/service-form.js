import { rootDomain } from "../../core/config.js";
import { xmlElementNames } from "../../utils";

const state = {
  domain: "",
  name: "example",
  description:
    "This service is an example of how to easily set up communication with the Hive Collective 'Cioty'. Replace this text with your own description of what you offer of data and intelligence to the Collective.",
  keywords: "",
  schema: "<RTW>\n<TXT></TXT>\n</RTW>",
  inlinePreScript: "",
  inlinePostScript: "",
  command: "",
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
    state.name = "example";
    state.description =
      "This service is an example of how to easily set up communication with the Hive Collective 'Cioty'. Replace this text with your own description of what you offer of data and intelligence to the Collective.";
    state.keywords = "";
    state.schema = "<RTW>\n<TXT></TXT>\n</RTW>";
    state.command = "";
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
  schemaElements({ schema }) {
    return xmlElementNames(schema);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
