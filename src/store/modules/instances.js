const state = {
  instances: [],
  dialog: false,
  selectedDomain: null,
  selectedService: null,
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
  selectDomain(state, payload) {
    state.selectedDomain = payload;
  },
  selectService(state, payload) {
    state.selectedService = payload;
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
  SOCKET_action_success({ commit }, data) {
    commit("successMessage", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
