const state = {
  services: [],
  selectAll: false,
  selectedServiceIndex: null
};

const mutations = {
  allServices(state, payload) {
    state.services = payload;
  },
  selectService(state, index) {
    state.services[index].isSelected = !state.services[index].isSelected;
  },
  selectAllServices(state) {
    state.selectAll = !state.selectAll;
    if (!state.selectAll) {
      state.services.forEach(service => {
        service.isSelected = true;
      });
    } else {
      state.services.forEach(service => {
        service.isSelected = false;
      });
    }
    state.services.forEach(service => {
      service.isSelected = !service.isSelected;
    });
  },
  serviceIndex(state, index) {
    state.selectedServiceIndex = index;
  },
  activeChannelsSuccess(state, { channels, index }) {
    state.services[index].activeChannels = channels;
  }
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    const services = [];
    data.forEach(item => {
      const object = JSON.parse(item);
      const isSelected = object => {
        object.isSelected = false;
        object.activeChannels = null;
        return object;
      };
      const newObject = isSelected(object);
      services.push(newObject);
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
    const result = services.filter(
      service => service.domain === domain.toLowerCase()
    );
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
