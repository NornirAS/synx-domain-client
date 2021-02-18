const state = {
  serviceDescription: "",
  schemaDescription: "",
  imageUrl: ""
};

const mutations = {
  addServiceDescription(state, payload) {
    state.serviceDescription = payload;
  },
  addSchemaDescription(state, payload) {
    state.schemaDescription = payload;
  },
  addImageUrl(state, payload) {
    state.imageUrl = payload;
  }
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  SOCKET_micropage_data({ commit }, data) {
    const parser = new DOMParser();
    const textToHtml = parser.parseFromString(data, "text/html");
    console.log(textToHtml);
  }
};

const getters = {
  updateMicropageParams(state, getters, rootState) {
    const { idToken } = rootState.authModule;
    const { domain, name } = rootState.serviceFormModule;
    const parameters = state;
    parameters.domain = domain;
    parameters.name = name;
    parameters.token = idToken;
    return parameters;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
