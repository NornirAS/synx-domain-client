const state = {
  services: [],
  selectedServiceIndex: ""
};

const mutations = {
  allServices(state, payload) {
    state.services = payload;
  },
  serviceIndex(state, payload) {
    state.selectedServiceIndex = payload;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    commit("allServices", data);
  },
  SOCKET_show_active_channels_success({ commit }, { channels, index }) {
    commit("activeChannelsSuccess", { channels, index });
  }
};

const getters = {
  serviceToEdit({ services, selectedServiceIndex }) {
    return services[selectedServiceIndex];
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
