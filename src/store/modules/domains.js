const state = {
  ownedDomains: [],
  currentDomain: ""
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
    const domains = data.map(domain => {
      domain.name = domain.name.toLowerCase();
      return domain;
    });
    commit("allDomains", domains);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
