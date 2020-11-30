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
    state.schemaDescription = schemaDescription;
  },
  addImageUrl(state, imageUrl) {
    state.imageUrl = imageUrl;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
