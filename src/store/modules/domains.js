const state = {
  domains: []
};

const mutations = {
  allDomains(state, payload) {
    state.domains = payload;
  }
};

const actions = {
  SOCKET_all_domains({ commit }, data) {
    localStorage.setItem("domains", JSON.stringify(data));
    commit("allDomains", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
