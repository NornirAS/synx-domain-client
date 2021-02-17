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
  async fetchDataFromMicropage({ dispatch, commit, getters, rootGetters }) {
    try {
      const serviceUrl = rootGetters["serviceFormModule/serviceURL"];
      console.log(serviceUrl);
      const fetchMicropage = await fetch(serviceUrl);
      console.log(fetchMicropage);
      const microPageAsText = await fetchMicropage.text();
      const parser = new DOMParser();
      const textToHtml = parser.parseFromString(microPageAsText, "text/html");
      console.log(textToHtml);
    } catch (e) {
      console.error(e);
    }
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
