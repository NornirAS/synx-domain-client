const state = {
  username: "",
  idToken: "",
  authError: ""
};

const mutations = {
  // authUser(state, { token, username }) {
  //   state.idToken = token;
  //   state.username = username;
  // },
  addUsename(state, payload) {
    state.username = payload;
  },
  addToken(state, payload) {
    state.token = payload;
  },
  authError(state, { error }) {
    state.authError = error;
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
  SOCKET_authentication({ commit }, data) {
    if (data.ActiveToken) {
      commit("authUser", {
        token: data.ActiveToken,
        username: sessionStorage.getItem("username")
      });
      // const now = new Date();
      // const expirationTime = 60 * 60 * 24 * 1000;
      // const expirationDate = new Date(now.getTime() + expirationTime);
      sessionStorage.setItem("token", data.ActiveToken);
      // localStorage.setItem("expirationDate", expirationDate);
    } else {
      commit("authError", {
        error: "Wrong username or password!"
      });
    }
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
