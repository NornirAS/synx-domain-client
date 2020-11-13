const state = {
  successMessage: "",
  errorMessage: ""
};

const mutations = {
  successMessage(state, payload) {
    state.successMessage = payload;
  },
  errorMessage(state, payload) {
    state.errorMessage = payload;
  }
};

const actions = {
  SOCKET_success_message({ commit }, data) {
    commit("successMessage", data);
  },
  SOCKET_error_message({ commit }, data) {
    commit("errorMessage", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
