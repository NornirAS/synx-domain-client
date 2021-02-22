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
  },
  resetState(state) {
    state.serviceDescription = "";
    state.schemaDescription = "";
    state.imageUrl = "";
  }
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  SOCKET_micropage_data({ commit }, data) {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");
    const serviceDescriptionElement = htmlDoc.querySelector(
      "#service-description"
    );
    const serviceDescription = serviceDescriptionElement.innerHTML.trim();
    commit("addServiceDescription", serviceDescription);
    const schemaDescriptionElement = htmlDoc.querySelector(
      "#schema-description"
    );
    const schemaDescriptionText = schemaDescriptionElement.innerHTML;
    const matchElements = schemaDescriptionText.match(/(.+?)(?=#|$)/gm);
    const removeSpacesAddNewLines = matchElements.map(str => {
      str.replace(/\s*$/, "");
      return `${str}\n`;
    });
    const schemaDescription = removeSpacesAddNewLines.join("");
    commit("addSchemaDescription", schemaDescription);
    const serviceImageElement = htmlDoc.querySelector("#service-image");
    const serviceImage = serviceImageElement.src;
    commit("addImageUrl", serviceImage);
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
