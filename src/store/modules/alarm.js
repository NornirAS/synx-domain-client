const state = {
  alerts: [],
  registerServiceSuccess: {},
  addGhostSuccess: {},
  addMapIdSuccess: {},
  acceptGhostSuccess: {},
  declineGhostSuccess: {},
  tranferOwnershipSuccess: {},
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
  registerServiceSuccess(state, payload) {
    state.registerServiceSuccess = payload;
    state.alerts.push(payload);
  },
  addGhostSuccess(state, payload) {
    state.addGhostSuccess = payload;
    state.alerts.push(payload);
  },
  addMapIdSuccess(state, payload) {
    state.addMapIdSuccess = payload;
    state.alerts.push(payload);
  },
  acceptGhostSuccess(state, payload) {
    state.acceptGhostSuccess = payload;
    state.alerts.push(payload);
  },
  declineGhostSuccess(state, payload) {
    state.declineGhostSuccess = payload;
    state.alerts.push(payload);
  },
  tranferOwnershipSuccess(state, payload) {
    state.tranferOwnershipSuccess = payload;
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
    state.addGhostSuccess = {};
    state.giveReadAccessSuccess = {};
    state.removeReadAccessSuccess = {};
  },
  removeAlert(state, payload) {
    state.alerts.splice(payload, 1);
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
  SOCKET_add_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("addGhostSuccess", object);
  },
  SOCKET_add_mapid_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("addMapIdSuccess", object);
  },
  SOCKET_accept_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("acceptGhostSuccess", object);
  },
  SOCKET_decline_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("declineGhostSuccess", object);
  },
  SOCKET_transfer_ownership_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("tranferOwnershipSuccess", object);
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
