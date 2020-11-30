const state = {
  description: "",
  schemaDescription: "",
  imageUrl: ""
};

const mutations = {
  addDescription(state, description) {
    state.description = description;
  },
  addSchemaDescription(state, schemaDescription) {
    state.description = schemaDescription;
  },
  addImageUrl(state, imageUrl) {
    state.description = imageUrl;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
