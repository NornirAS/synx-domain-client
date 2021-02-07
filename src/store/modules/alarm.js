const state = {
  successMessage: "",
  errorMessage: "",
  alertsSuccess: [],
  giveReadAccessSuccess: "",
  removeReadAccessSuccess: ""
};

const mutations = {
  successMessage(state, payload) {
    state.successMessage = payload;
  },
  errorMessage(state, payload) {
    state.errorMessage = payload;
  },
  resetSuccessMessage(state) {
    state.successMessage = "";
  },
  resetErrorMessage(state) {
    state.errorMessage = "";
  },
  giveReadAccessSuccess(state, payload) {
    state.giveReadAccessSuccess = payload;
    state.alertsSuccess.push(payload);
  },
  removeReadAccessSuccess(state, payload) {
    state.removeReadAccessSuccess = payload;
    state.alertsSuccess.push(payload);
  },
  resetAlerts(state) {
    state.giveReadAccessSuccess = "";
    state.removeReadAccessSuccess = "";
  }
};

const actions = {
  SOCKET_success_message({ commit }, data) {
    commit("successMessage", data);
  },
  SOCKET_error_message({ commit }, data) {
    commit("errorMessage", data);
  },
  SOCKET_give_read_access_success({ commit }, data) {
    commit("giveReadAccessSuccess", data);
  },
  SOCKET_remove_read_access_success({ commit }, data) {
    commit("removeReadAccessSuccess", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
