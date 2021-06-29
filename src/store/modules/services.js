const state = {
  services: []
};

const mutations = {
  addServices(state, payload) {
    state.services = payload;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  },
  resetState(state) {
    state.services = [];
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    commit("addServices", data);
  },
  SOCKET_show_active_channels_success({ commit }, { channels, index }) {
    commit("activeChannelsSuccess", { channels, index });
  }
};

const getters = {
  noServices({ services }) {
    return services.length === 0;
  },
  isServiceLimit({ services }) {
    return services.length >= 10;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
