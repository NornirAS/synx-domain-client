import { isJsonString, arrayUniqValues } from "../../utils";

const state = {
  serviceDescription: null,
  schemaOverview: {
    description: null,
    elements: []
  },
  commandOverview: {
    description: null,
    headers: [],
    commands: []
  },
  imageUrl: null
};

const mutations = {
  addServiceDescription(state, payload) {
    state.serviceDescription = payload;
  },
  addSchemaOverview(state, payload) {
    state.schemaOverview = Object.assign({}, state.schemaOverview, payload);
  },
  addSchemaDescription(state, payload) {
    state.schemaOverview = Object.assign({}, state.schemaOverview, {
      description: payload
    });
  },
  addElement(state, payload) {
    state.schemaOverview.elements.push(payload);
  },
  updateElement(state, { index, element }) {
    state.schemaOverview.elements.splice(index, 1, element);
  },
  removeElement(state, payload) {
    state.schemaOverview.elements.splice(payload, 1);
  },
  addCommandOverview(state, payload) {
    state.commandOverview = Object.assign({}, state.commandOverview, payload);
  },
  addCommandDescription(state, payload) {
    state.commandOverview = Object.assign({}, state.commandOverview, {
      description: payload
    });
  },
  addHeaders(state, payload) {
    state.commandOverview.headers = payload;
  },
  addCommand(state, payload) {
    state.commandOverview.commands.push(payload);
  },
  updateCommand(state, { index, command }) {
    state.commandOverview.commands.splice(index, 1, command);
  },
  removeCommand(state, payload) {
    state.commandOverview.commands.splice(payload, 1);
  },
  addImageUrl(state, payload) {
    state.imageUrl = payload;
  },
  resetState(state) {
    state.serviceDescription = null;
    state.schemaOverview = Object.assign({}, state.schemaOverview, {
      description: null,
      elements: []
    });
    state.commandOverview = Object.assign({}, state.commandOverview, {
      description: null,
      headers: [],
      commands: []
    });
    state.imageUrl = null;
  }
};

const actions = {
  SOCKET_micropage_data({ commit, dispatch }, data) {
    /**
     * Parse micropage and update state with received data.
     * For schemaOverview and commandOverview we check if data is JSON string.
     * We get JSON string when micropage is updated from GUI, because it has more
     * complex structure. Micropage can be simply updated with curl and it can
     * be just a regular string in this case we will use it as description inside
     * schemaOverview and commandOverview.
     */
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(data, "text/html");

    // Get serviceDescription
    const serviceDescriptionElement = htmlDoc.querySelector(
      "#service-description"
    );
    const serviceDescription = serviceDescriptionElement.innerHTML.trim();
    commit("addServiceDescription", serviceDescription);

    // Get schemaOverview
    const schemaDescriptionElement = htmlDoc.querySelector(
      "#schema-description"
    );
    const schemaDescriptionString = schemaDescriptionElement.innerHTML;
    dispatch("schemaDescription", schemaDescriptionString);

    // Get commandOverview
    const commandDescriptionElement = htmlDoc.querySelector(
      "#command-description"
    );
    const commandDescriptionString = commandDescriptionElement.innerHTML;
    dispatch("commandDescription", commandDescriptionString);

    // Get imageUrl
    const imageElement = htmlDoc.querySelector(".bg-image");
    const imageUrl = imageElement.style.backgroundImage;
    const reg = new RegExp(/url\("(.*)"\)/gim);
    const url = reg.exec(imageUrl);
    if (url) commit("addImageUrl", url[1]);
  },

  schemaDescription({ commit }, data) {
    const isJson = isJsonString(data);

    if (isJson) {
      const json = JSON.parse(data);
      commit("addSchemaOverview", json);
    } else {
      commit("addSchemaDescription", data);
    }
  },

  commandDescription({ commit }, data) {
    const isJson = isJsonString(data);

    if (isJson) {
      const json = JSON.parse(data);
      commit("addCommandOverview", json);
    } else {
      commit("addCommandDescription", data);
    }
  }
};

const getters = {
  // Displayed on Micropage
  publicElements({ schemaOverview }) {
    return schemaOverview.elements.map(item => {
      return item.name;
    });
  },

  // Not displayed on Micropage
  privateElements(state, { publicElements }, rootState, rootGetters) {
    const schemaElements = rootGetters["serviceForm/schemaElements"];
    return arrayUniqValues(schemaElements, publicElements);
  },

  // Displayed on Micropage but not in service schema
  publicElementsNotInSchema(state, { publicElements }, rootState, rootGetters) {
    const schemaElements = rootGetters["serviceForm/schemaElements"];
    return arrayUniqValues(publicElements, schemaElements);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
