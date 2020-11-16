const state = {
  username: "",
  idToken: "",
  authError: ""
};

const mutations = {
  authUser(state, { token, username }) {
    state.idToken = token;
    state.username = username;
  },
  authError(state, { error }) {
    state.authError = error;
  },
  signOut(state) {
    state.idToken = "";
    state.username = "";
    localStorage.clear();
  },
  resetError(state) {
    state.authError = "";
  }
};

const actions = {
  tryAutoSignIn({ commit }) {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
      return;
    }
    const expirationDate = localStorage.getItem("expirationDate");
    const expiredIn = new Date(expirationDate);
    const now = new Date();
    if (now >= expiredIn) {
      commit("signOut");
    } else {
      commit("authUser", {
        token: token,
        username: username
      });
    }
  },
  setSignOutTimer({ commit }) {
    const expirationDate = localStorage.getItem("expirationDate");
    const expiredIn = new Date(expirationDate).getTime();
    const now = new Date().getTime();
    const expirationTime = expiredIn - now;
    setTimeout(() => {
      commit("signOut");
    }, expirationTime);
  },
  SOCKET_authentication({ commit }, data) {
    if (data.ActiveToken) {
      commit("authUser", {
        token: data.ActiveToken,
        username: localStorage.getItem("username")
      });
      const now = new Date();
      const expirationTime = 3600 * 1000 * 9;
      const expirationDate = new Date(now.getTime() + expirationTime);
      localStorage.setItem("token", data.ActiveToken);
      localStorage.setItem("expirationDate", expirationDate);
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
