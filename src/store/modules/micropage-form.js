const state = {
  serviceDescription: "",
  schemaDescription: "",
  imageUrl: "",
  isMicropageFormValid: false
};

const mutations = {
  addDescription(state, description) {
    state.description = description;
  },
  addSchemaDescription(state, schemaDescription) {
    state.schemaDescription = schemaDescription;
  },
  addImageUrl(state, imageUrl) {
    state.imageUrl = imageUrl;
  },
  isMicropageFormValid(state, payload) {
    state.isMicropageFormValid = payload;
  }
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  async fetchDataFromMicropage({ dispatch, commit, getters, rootGetters }) {
    try {
      const serviceUrl = rootGetters["serviceFormModule/serviceUrl"];
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
  makeXmlSchemaVisibleInHtml({ schemaDescription }) {
    return `<xmp>${schemaDescription}</xmp>`;
  },
  // eslint-disable-next-line no-unused-vars
  mergeSchemas(state, getters, { serviceFormModule }, rootGetters) {
    const serviceSchema = serviceFormModule.schema;
    const commandSchema = serviceFormModule.command;
    return `Service Schema\n${serviceSchema}\nCommand Schema\n${commandSchema}`;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
