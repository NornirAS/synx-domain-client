const state = {
  ownedDomains: [],
  currentDomain: null
};

const mutations = {
  allDomains(state, payload) {
    state.ownedDomains = payload;
  },
  currentDomain(state, payload) {
    state.currentDomain = payload;
  }
};

const actions = {
  SOCKET_all_domains({ commit }, data) {
    data.forEach(domain => {
      domain.name = domain.name.toLowerCase();
    });
    commit("allDomains", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
