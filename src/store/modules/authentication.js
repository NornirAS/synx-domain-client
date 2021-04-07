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
    sessionStorage.clear();
  },
  resetError(state) {
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
