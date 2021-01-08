const state = {
  domain: "",
  name: "",
  description: "",
  keywords: "",
  serviceSchema: [],
  commandSchema: "",
  timeout: "30",
  preInlineScript: "",
  postInlineScript: "",
  webJS: "Hello World!"
};

const mutations = {
  addDomain(state, domain) {
    state.domain = domain;
  },
  addName(state, name) {
    state.name = name;
  },
  addDescription(state, description) {
    state.description = description;
  },
  addKeywords(state, keywords) {
    state.keywords = keywords;
  },
  addServiceSchema(state, schema) {
    state.serviceSchema.push(schema);
  },
  removeSelectedServiceSchema(state, index) {
    state.serviceSchema.splice(index, 1);
  },
  removeLastServiceSchema(state) {
    state.serviceSchema.pop();
  },
  serviceSchemaAddLink(state, { tagName, linkTo }) {
    const schema = state.serviceSchema.find(s => s.tagName === tagName);
    schema.links.push(linkTo);
  },
  serviceSchemaRemoveLink(state, { tagName, index }) {
    const schema = state.serviceSchema.find(s => s.tagName === tagName);
    schema.links.splice(index, 1);
  },
  serviceSchemaUpdateLink(state, { tagName, linkTo, index }) {
    const schema = state.serviceSchema.find(s => s.tagName === tagName);
    const obj = Object.assign({}, schema.links[index], linkTo);
    schema.links.splice(index, 1, obj);
  },
  addCommand(state, command) {
    state.commandSchema = command;
  },
  setTimeout(state, timeout) {
    state.timeout = timeout;
  },
  addPreInlineScript(state, preInlineScript) {
    state.preInlineScript = preInlineScript;
  },
  addPostInlineScript(state, postInlineScript) {
    state.postInlineScript = postInlineScript;
  },
  addWebJS(state, webJS) {
    state.webJS = webJS;
  },
  editService(state, service) {
    state.domain = service.domain;
    state.name = service.serviceName;
    state.description = service.description;
    state.keywords = service.searchTerms;
    state.serviceSchema = service.schema;
    state.commandSchema = service.cmdXML;
    state.preInlineScript = service.preMasterScript;
    state.postInlineScript = service.masterScript;
    state.webJS = "Hello World!";
  },
  resetServiceForm(state) {
    state.domain = "";
    state.name = "";
    state.description = "";
    state.keywords = "";
    state.serviceSchema = [];
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
