const state = {
  alerts: [],
  registerServiceSuccess: {},
  giveReadAccessSuccess: {},
  removeReadAccessSuccess: {}
};

const mutations = {
  successMessage(state, payload) {
    state.alerts.push(payload);
  },
  errorMessage(state, payload) {
    state.alerts.push(payload);
  },
  resetSuccessMessage(state) {
    state.successMessage = {};
  },
  resetErrorMessage(state) {
    state.errorMessage = {};
  },
  registerServiceSuccess(state, payload) {
    state.registerServiceSuccess = payload;
    state.alerts.push(payload);
  },
  giveReadAccessSuccess(state, payload) {
    state.giveReadAccessSuccess = payload;
    state.alerts.push(payload);
  },
  removeReadAccessSuccess(state, payload) {
    state.removeReadAccessSuccess = payload;
    state.alerts.push(payload);
  },
  resetAlerts(state) {
    state.registerServiceSuccess = {};
    state.giveReadAccessSuccess = {};
    state.removeReadAccessSuccess = {};
  }
};

const actions = {
  SOCKET_success_message({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("successMessage", object);
  },
  SOCKET_error_message({ commit }, data) {
    const object = {
      message: data,
      success: false
    };
    commit("errorMessage", object);
  },
  SOCKET_register_service_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("registerServiceSuccess", object);
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
