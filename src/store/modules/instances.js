const state = {
  instances: [],
  dialog: false,
  selectedGhost: {},
  ghostStatus: {},
  dialogTitle: ""
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  },
  selectGhost(state, payload) {
    state.selectedGhost = Object.assign({}, state.selectedGhost, payload);
  },
  addStatus(state, payload) {
    state.ghostStatus = Object.assign({}, state.ghostStatus, payload);
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    commit("allInstances", data);
  },
  SOCKET_ghost_status({ commit }, data) {
    commit("addStatus", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
