const state = {
  instances: [],
  dialog: false,
  selectedDomain: "",
  selectedService: "",
  selectedInstance: "",
  dialogTitle: ""
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  },
  toggleDialog(state) {
    state.dialog = !state.dialog;
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
