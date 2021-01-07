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
    const domainNames = data.map(domain => {
      return domain.name;
    });
    localStorage.setItem("domains", domainNames);
    commit("allDomains", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
