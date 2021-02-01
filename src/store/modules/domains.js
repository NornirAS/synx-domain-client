const state = {
  ownedDomains: []
};

const mutations = {
  allDomains(state, payload) {
    state.ownedDomains = payload;
  }
};

const actions = {
  SOCKET_all_domains({ commit }, data) {
    const domains = data.map(domain => {
      return domain.name;
    });
    localStorage.setItem("domains", domains);
    commit("allDomains", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
