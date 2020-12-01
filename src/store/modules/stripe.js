const state = {
  period: "",
  price: "",
  session: {}
};

const mutations = {
  addPlan(state, { period, price }) {
    console.log(period)
    state.period = period;
    state.price = price + "00";
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
