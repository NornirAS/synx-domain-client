import _ from "lodash";

const state = {
  services: []
};

const mutations = {
  allServices(state, payload) {
    state.services = payload;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  },
  addServicesFromStorage(state, payload) {
    state.services = payload;
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    localStorage.setItem("services", JSON.stringify(data));
    commit("allServices", data);
  },
  SOCKET_show_active_channels_success({ commit }, { channels, index }) {
    commit("activeChannelsSuccess", { channels, index });
  },
  addServicesFromStorage({ commit, getters }) {
    const services = getters.getServicesFromStorage;
    commit("addServicesFromStorage", services);
  }
};

const getters = {
  getServicesFromStorage() {
    const services = localStorage.getItem("services");
    return JSON.parse(services);
  },
  noServices(state, { getServicesFromStorage }) {
    return _.isEmpty(getServicesFromStorage);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
