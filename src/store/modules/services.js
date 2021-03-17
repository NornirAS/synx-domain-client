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
  addServicesFromStorage({ commit }) {
    const services = sessionStorage.getItem("services");
    commit("addServices", JSON.parse(services));
  }
};

const getters = {
  noServices({ services }) {
    return services.length === 0;
  },
  servicesUnderActiveDomain({ services }, getters, rootState, rootGetters) {
    const test = services.filter(service =>
      rootGetters["domainsModule/activeDomainNames"].includes(service.domain)
    );
    return test;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
