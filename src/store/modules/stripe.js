const state = {
  subscriptionPlans: [
    {
      name: "1 Month",
      period: "1",
      price: "60$ / year",
      total: "5"
    },
    {
      name: "3 Months",
      period: "3",
      price: "60$ / year",
      total: "15"
    },
    {
      name: "6 Months",
      period: "6",
      price: "55$ / year",
      discount: "1 Month FREE!",
      total: "22.5"
    },
    {
      name: "12 Month",
      period: "12",
      price: "50$ / year",
      discount: "2 Months FREE!",
      total: "50"
    }
  ],
  selectedPlan: {},
  period: "",
  session: {},
  customerPortalUrl: ""
};

const mutations = {
  selectPlan(state, index) {
    const plan = state.subscriptionPlans[index];
    state.selectedPlan = Object.assign({}, state.selectPlan, plan);
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
