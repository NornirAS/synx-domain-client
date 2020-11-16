const state = {
  serviceForm: {
    serviceName: "",
    description: "",
    schemaDescription: "",
    pictureURL: "",
    keywords: [],
    serviceSchema: [],
    commandSchema: [],
    instances: 0, // instances to add
    timeOut: "30",
    premasterscript: "YWFhYWFhYWFhYQo=",
    masterScript: "YWFhYWFhYWFhYQo=",
    webJS: "Hello"
  },
  totalInstances: 1000,
  serviceInstances: 0, // instances of selected service
  formSuccess: false,
  formError: ""
};

const mutations = {
  addServiceName(state, name) {
    state.serviceForm.serviceName = name;
  },
  addDescription(state, description) {
    state.serviceForm.description = description;
  },
  addSchemaDescription(state, description) {
    state.serviceForm.schemaDescription = description;
  },
  addPictureURL(state, payload) {
    state.serviceForm.pictureURL = payload;
  },
  addKeyword(state, keyword) {
    state.serviceForm.keywords.push(keyword);
  },
  removeKeyword(state, index) {
    state.serviceForm.keywords.splice(index, 1);
  },
  serviceSchemaUpdateLink(state, { tagName, linkTo }) {
    const schema = state.serviceForm.serviceSchema.find(
      s => s.tagName === tagName
    );
    schema.linkTo = Object.assign({}, schema.linkTo, linkTo);
  },
  addServiceSchema(state, schema) {
    state.serviceForm.serviceSchema.push(schema);
  },
  addCommandSchema(state, schema) {
    state.serviceForm.commandSchema.push(schema);
  },
  removeServiceSchema(state, index) {
    state.serviceForm.serviceSchema.splice(index, 1);
  },
  removeCommandSchema(state, index) {
    state.serviceForm.commandSchema.splice(index, 1);
  },
  addInstance(state, instances) {
    state.serviceForm.instances += instances;
  },
  updateInstances(state, instances) {
    state.serviceForm.instances = instances;
  },
  setTimeout(state, newTimeout) {
    state.serviceForm.timeOut = newTimeout;
  },
  serviceRegistrationSuccess(state) {
    state.formSuccess = true;
  },
  serviceRegistrationError(state) {
    state.formSuccess = false;
    state.formError =
      "Registration Error. Something went wrong. Try one more time";
  },
  serviceUpdateSuccess(state) {
    state.formSuccess = true;
  },
  serviceUpdatedError(state) {
    state.formSuccess = false;
    state.formError = "Update Error. Something went wrong. Try one more time";
  },
  editService(state, service) {
    const form = state.serviceForm;
    form.serviceName = service.serviceName;
    form.description = service.description;
    form.keywords = service.searchTerms;
    form.serviceSchema = service.schema;
    form.commandSchema = service.cmdXML;
    form.instances = parseInt(service.instances);
    state.serviceInstances = parseInt(service.instances);
  },
  resetServiceForm(state) {
    state.serviceForm.serviceName = "";
    state.serviceForm.description = "";
    state.serviceForm.schemaDescription = "";
    state.serviceForm.pictureURL = "";
    state.serviceForm.keywords = [];
    state.serviceForm.serviceSchema = [];
    state.serviceForm.commandSchema = [];
    state.serviceForm.instances = 0;
    state.serviceInstances = 0;
  },
  resetServiceFormStatus(state) {
    state.formSuccess = false;
    state.formError = "";
  },
  removeInstanceOnCreate(state) {
    state.serviceForm.instances = state.serviceForm.instances - 1;
  }
};

const actions = {
  SOCKET_service_registration_success({ commit }) {
    commit("serviceRegistrationSuccess");
  },
  SOCKET_service_registration_error({ commit }) {
    commit("serviceRegistrationError");
  },
  SOCKET_service_update_success({ commit }) {
    commit("serviceUpdateSuccess");
  },
  SOCKET_service_update_error({ commit }) {
    commit("serviceUpdateError");
  }
};

const getters = {
  instancesBalance({ serviceForm, serviceInstances }) {
    return serviceForm.instances - serviceInstances;
  },
  availableInstances({ serviceForm, totalInstances }) {
    return totalInstances - serviceForm.instances;
  },
  instancesLimitReached(state, { availableInstances }) {
    return availableInstances <= 0 ? true : false;
  },
  isServiceSchema({ serviceForm }) {
    return serviceForm.serviceSchema.length > 0;
  },
  isCommandSchema({ serviceForm }) {
    return serviceForm.commandSchema.length > 0;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
