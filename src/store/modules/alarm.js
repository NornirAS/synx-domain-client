const state = {
  alerts: [],
  registerServiceSuccess: {},
  updateServiceSuccess: {},
  deleteServiceSuccess: {},
  updateMicropageSuccess: {},
  addGhostSuccess: {},
  addMapIdSuccess: {},
  acceptGhostSuccess: {},
  declineGhostSuccess: {},
  tranferOwnershipSuccess: {},
  deleteDomainSuccess: {},
  giveReadAccessSuccess: {},
  removeReadAccessSuccess: {},
  addPrimaryGhostSuccess: {},
  removePrimaryGhostSuccess: {},
  removeGhostSuccess: {}
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
  updateServiceSuccess(state, payload) {
    state.updateServiceSuccess = payload;
    state.alerts.push(payload);
  },
  deleteServiceSuccess(state, payload) {
    state.deleteServiceSuccess = payload;
    state.alerts.push(payload);
  },
  updateMicropageSuccess(state, payload) {
    state.updateMicropageSuccess = payload;
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
  deleteDomainSuccess(state, payload) {
    state.deleteDomainSuccess = payload;
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
  addPrimaryGhostSuccess(state, payload) {
    state.addPrimaryGhostSuccess = payload;
    state.alerts.push(payload);
  },
  removePrimaryGhostSuccess(state, payload) {
    state.removePrimaryGhostSuccess = payload;
    state.alerts.push(payload);
  },
  removeGhostSuccess(state, payload) {
    state.removeGhostSuccess = payload;
    state.alerts.push(payload);
  },
  removeAlert(state) {
    state.alerts.shift();
  }
};

const actions = {
  removeAlert({ commit }) {
    setTimeout(() => commit("removeAlert"), 5000);
  },
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
  SOCKET_update_service_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("updateServiceSuccess", object);
  },
  SOCKET_delete_service_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("deleteServiceSuccess", object);
  },
  SOCKET_update_micropage_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("updateMicropageSuccess", object);
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
  SOCKET_delete_domain_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("deleteDomainSuccess", object);
  },
  SOCKET_give_read_access_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("giveReadAccessSuccess", object);
  },
  SOCKET_remove_read_access_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("removeReadAccessSuccess", object);
  },
  SOCKET_add_primary_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("addPrimaryGhostSuccess", object);
  },
  SOCKET_remove_primary_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("removePrimaryGhostSuccess", object);
  },
  SOCKET_remove_ghost_success({ commit }, data) {
    const object = {
      message: data,
      success: true
    };
    commit("removeGhostSuccess", object);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
