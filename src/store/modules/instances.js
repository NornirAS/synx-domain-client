const _ = require("underscore");

const state = {
  instances: [],
  dialog: false,
  selectedDomain: null,
  selectedService: null,
  selectedInstance: null,
  dialogTitle: null,
  instancesToAprove: []
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
  },
  instancesToAprove(state, payload) {
    state.instancesToAprove = payload;
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    const instances = [];
    if (_.isEmpty(data)) {
      commit("allInstances", instances);
    } else {
      data.forEach(item => {
        const object = JSON.parse(item);
        object.domain = object.domain.toLowerCase();
        object.service = object.service.toLowerCase();
        instances.push(object);
      });
      commit("allInstances", instances);
    }
  },
  SOCKET_new_instances({ commit }, data) {
    const instances = [];
    if (_.isEmpty(data)) {
      commit("instancesToAprove", instances);
    } else {
      data.forEach(item => {
        const object = JSON.parse(item);
        object.domain = object.domain.toLowerCase();
        object.service = object.service.toLowerCase();
        instances.push(object);
      });
      commit("instancesToAprove", instances);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
