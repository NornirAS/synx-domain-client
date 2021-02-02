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
