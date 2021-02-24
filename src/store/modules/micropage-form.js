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
    const matchedElementsArray = schemaDescriptionText.match(/(.+?)(?=#|$)/gm);
    const updatedElementsArray = matchedElementsArray.map(str => {
      const stringWithNoSpacesAtTheEnd = str.replace(/\s*$/, "");
      return `${stringWithNoSpacesAtTheEnd}\n`;
    });
    const schemaDescription = updatedElementsArray.join("");
    commit("addSchemaDescription", schemaDescription);
    const serviceImageElement = htmlDoc.querySelector("#service-image");
    const serviceImageUrl = serviceImageElement.src;
    commit("addImageUrl", serviceImageUrl);
  }
};

const getters = {
  updateMicropageParams(state, getters, { authModule, serviceFormModule }) {
    state.domain = serviceFormModule.domain;
    state.name = serviceFormModule.name;
    state.token = authModule.token;
    return state;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
