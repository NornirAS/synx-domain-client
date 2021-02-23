const state = {
  username: "",
  idToken: "",
  authError: ""
};

const mutations = {
  addUsername(state, payload) {
    state.username = payload;
  },
  addToken(state, payload) {
    state.idToken = payload;
  },
  authError(state, payload) {
    state.authError = payload;
  },
  signOut(state) {
    state.idToken = "";
    state.username = "";
    sessionStorage.clear();
  },
  resetError(state) {
    state.authError = "";
  }
};

const actions = {
  // setSignOutTimer({ commit }) {
  //   const expirationDate = localStorage.getItem("expirationDate");
  //   const expiredIn = new Date(expirationDate).getTime();
  //   const now = new Date().getTime();
  //   const expirationTime = expiredIn - now;
  //   setTimeout(() => {
  //     commit("signOut");
  //   }, expirationTime);
  // },
  SOCKET_authentication({ commit }, { ActiveToken }) {
    if (ActiveToken) {
      sessionStorage.setItem("token", ActiveToken);
      commit("addToken", ActiveToken);
      // const now = new Date();
      // const expirationTime = 60 * 60 * 24 * 1000;
      // const expirationDate = new Date(now.getTime() + expirationTime);
      // localStorage.setItem("expirationDate", expirationDate);
    } else {
      commit("authError", "Wrong username or password!");
    }
  },
  addUsername({ commit }, data) {
    sessionStorage.setItem("username", data);
    commit("addUsername", data);
  }
};

const getters = {
  isAuthenticated({ idToken }) {
    return idToken !== "";
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
