const state = {
  period: "",
  session: {}
};

const mutations = {
  addPlan(state, period) {
    state.period = period;
  },
  addSession(state, payload) {
    state.session = Object.assign({}, state.session, payload);
  }
};

const actions = {
  SOCKET_session({ commit }, payload) {
    commit("addSession", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
