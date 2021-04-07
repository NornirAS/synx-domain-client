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
      sessionStorage.setItem("token", ActiveToken);
      commit("addToken", ActiveToken);
    } else {
      commit("authError", "Wrong username or password!");
    }
  },
  addUsername({ dispatch }, data) {
    sessionStorage.setItem("username", data);
    dispatch("addUsernameFromStorage", data);
  },
  addTokenFromStorage({ commit }) {
    const token = sessionStorage.getItem("token");
    commit("addToken", token);
  },
  addUsernameFromStorage({ commit }) {
    const username = sessionStorage.getItem("username");
    commit("addUsername", username);
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
