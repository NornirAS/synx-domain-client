const state = {
  period: "",
  session: {},
  customerPortalUrl: ""
};

const mutations = {
  addPlan(state, period) {
    state.period = period;
  },
  addSession(state, payload) {
    state.session = Object.assign({}, state.session, payload);
  },
  customerPortalUrl(state, payload) {
    state.customerPortalUrl = payload;
  }
};

const actions = {
  SOCKET_session({ commit }, payload) {
    commit("addSession", payload);
  },
  SOCKET_customer_portal_url({ commit }, payload) {
    commit("customerPortalUrl", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
