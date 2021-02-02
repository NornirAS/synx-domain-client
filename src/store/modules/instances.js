const state = {
  instances: [],
  dialog: false,
  selectedGhost: {},
  dialogTitle: ""
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  },
  toggleDialog(state) {
    state.dialog = !state.dialog;
  },
  selectGhost(state, payload) {
    state.selectedGhost = Object.assign({}, state.selectedGhost, payload);
  },
  dialogTitle(state, payload) {
    state.dialogTitle = payload;
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    commit("allInstances", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
