import _ from "lodash";

const state = {
  services: []
};

const mutations = {
  addServices(state, payload) {
    state.services = payload;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    sessionStorage.setItem("services", JSON.stringify(data));
    commit("addServices", data);
  },
  SOCKET_show_active_channels_success({ commit }, { channels, index }) {
    commit("activeChannelsSuccess", { channels, index });
  },
  addServicesFromStorage({ commit, getters }) {
    const services = getters.servicesFromStorage;
    commit("addServices", services);
  }
};

const getters = {
  servicesFromStorage() {
    const services = sessionStorage.getItem("services");
    return JSON.parse(services);
  },
  noServices({ services }) {
    return _.isEmpty(services);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
