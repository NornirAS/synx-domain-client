const state = {
  instances: []
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    const instances = [];
    data.forEach(item => {
      const object = JSON.parse(item);
      instances.push(object);
    });
    commit("allInstances", instances);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
