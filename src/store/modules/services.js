const state = {
  services: []
};

const mutations = {
  allServices(state, payload) {
    state.services = payload;
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

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
