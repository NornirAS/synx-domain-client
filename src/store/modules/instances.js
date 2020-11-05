const state = {
  instances: [],
  dialog: false,
  selectedInstance: null,
  newOwnerUsername: null,
  dialogTitle: null
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  },
  toggleDialog(state) {
    state.dialog = !state.dialog;
  },
  selectInstance(state, payload) {
    state.selectedInstance = payload;
  },
  newOwnerUsername(state, payload) {
    state.selectedInstance = payload;
  },
  dialogTitle(state, payload) {
    state.dialogTitle = payload;
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    const instances = [];
    data.forEach(item => {
      const object = JSON.parse(item);
      instances.push(object);
    });
    commit("allInstances", instances);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
