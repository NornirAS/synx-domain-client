const state = {
  instances: [],
  dialog: false,
  selectedInstance: null,
  dialogTitle: null,
  successMessage: null
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  },
  openDialog(state) {
    state.dialog = true;
  },
  closeDialog(state) {
    state.dialog = false;
  },
  selectInstance(state, payload) {
    state.selectedInstance = payload;
  },
  dialogTitle(state, payload) {
    state.dialogTitle = payload;
  },
  successMessage(state, payload) {
    state.successMessage = payload;
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
  },
  SOCKET_change_instance_owner_success({ commit }, data) {
    commit("successMessage", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
