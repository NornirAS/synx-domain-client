const state = {
  subscriptionPlans: [
    {
      title: "Monthly",
      description: "Billed every 30 days",
      annualCost: "Annual cost $60",
      monthlyCost: "$5/m",
      period: "1",
      total: "5"
    },
    {
      title: "Half-yearly",
      description: "Billed twice a year",
      annualCost: "Annual cost $55",
      monthlyCost: "$4.6/m",
      period: "6",
      discount: "Save $5",
      total: "22.5"
    },
    {
      title: "Yearly",
      description: "Billed once a year",
      annualCost: "Annual cost $50",
      monthlyCost: "$4.2/m",
      period: "12",
      discount: "Save $10",
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
