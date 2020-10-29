const state = {
  serviceForm: {
    serviceName: null,
    description: null,
    keywords: [],
    serviceSchema: [],
    commandSchema: [],
    instances: null, // instances to add
    timeOut: "30",
    masterScript: "YWFhYWFhYWFhYQo=",
    webJS: "Hello"
  },
  serviceInstances: null, // instances of selected service
  formSuccess: false,
  formError: null
};

const mutations = {
  serviceSchemaUpdateLink(state, { tagName, linkTo }) {
    const schema = state.serviceForm.serviceSchema.find(
      s => s.tagName === tagName
    );
    schema.linkTo = Object.assign({}, schema.linkTo, linkTo);
  },
  removeServiceSchema(state, index) {
    state.serviceForm.serviceSchema.splice(index, 1);
  },
  removeCommandSchema(state, index) {
    state.serviceForm.commandSchema.splice(index, 1);
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
    state.serviceForm.serviceName = null;
    state.serviceForm.description = null;
    state.serviceForm.keywords = [];
    state.serviceForm.serviceSchema = [];
    state.serviceForm.commandSchema = [];
    state.serviceForm.instances = null;
    state.serviceInstances = null;
  },
  resetServiceFormStatus(state) {
    state.formSuccess = false;
    state.formError = null;
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
