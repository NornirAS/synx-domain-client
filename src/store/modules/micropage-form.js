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

export default {
  namespaced: true,
  state,
  mutations
};
