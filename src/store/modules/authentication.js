const state = {
  username: null,
  token: null,
  authError: null
};

const mutations = {
  addUsername(state, payload) {
    state.username = payload;
  },
  addToken(state, payload) {
    state.token = payload;
  },
  authError(state, payload) {
    state.authError = payload;
  },
  signOut(state) {
    state.token = null;
    state.username = null;
  },
  resetError(state) {
    state.authError = null;
  },
  resetState(state) {
    state.username = null;
    state.token = null;
    state.authError = null;
  }
};

const actions = {
  SOCKET_authentication({ commit }, { ActiveToken }) {
    if (ActiveToken) {
      commit("addToken", ActiveToken);
    } else {
      commit("authError", "Wrong username or password!");
    }
  },
  addUsername({ commit }, data) {
    commit("addUsername", data);
  },
  signOut({ commit }) {
    commit("resetState");
    commit("alert/resetState", null, { root: true });
    commit("domains/resetState", null, { root: true });
    commit("ghostDetails/resetState", null, { root: true });
    commit("ghosts/resetState", null, { root: true });
    commit("micropageForm/resetState", null, { root: true });
    commit("serviceForm/resetState", null, { root: true });
    commit("services/resetState", null, { root: true });
  }
};

const getters = {
  isAuthenticated({ token }) {
    return token !== null;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
