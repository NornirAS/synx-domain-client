const state = {
  services: [],
  selectAll: false
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
};

const actions = {
  SOCKET_all_services({ commit }, data) {
    const services = [];
    data.forEach(item => {
      const object = JSON.parse(item);
      const isSelected = object => {
        object.isSelected = false;
        return object;
      };
      const newObject = isSelected(object);
      services.push(newObject);
    });
    commit("allServices", services);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
