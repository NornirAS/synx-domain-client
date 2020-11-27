const state = {
  services: [],
  selectAll: false,
  selectedServiceIndex: ""
};

const mutations = {
  allServices(state, payload) {
    state.services = payload;
  },
  // selectService(state, index) {
  //   state.services[index].isSelected = !state.services[index].isSelected;
  // },
  // selectAllServices(state) {
  //   state.selectAll = !state.selectAll;
  //   if (!state.selectAll) {
  //     state.services.forEach(service => {
  //       service.isSelected = true;
  //     });
  //   } else {
  //     state.services.forEach(service => {
  //       service.isSelected = false;
  //     });
  //   }
  //   state.services.forEach(service => {
  //     service.isSelected = !service.isSelected;
  //   });
  // },
  serviceIndex(state, index) {
    state.selectedServiceIndex = index;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    const services = data.map(service => {
      service = JSON.parse(service);
      service.activeChannels = "";
      return service;
    });
    commit("allServices", services);
  },
  SOCKET_show_active_channels_success({ commit }, { channels, index }) {
    commit("activeChannelsSuccess", { channels, index });
  }
};

const getters = {
  serviceToEdit({ services, selectedServiceIndex }) {
    return services[selectedServiceIndex];
  },
  // eslint-disable-next-line no-unused-vars
  servicesForDomain({ services }, getters, rootState, rootGetters) {
    const domain = rootState.domainsModule.currentDomain;
    const result = services.filter(service => service.domain === domain);
    return result;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
