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
  },
  resetError(state) {
    state.authError = "";
  }
};

const actions = {
  tryAutoSignIn({ commit }) {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");
    if (!token) {
      return;
    } else {
      commit("authUser", {
        token: token,
        username: username
      });
    }
    // const expirationDate = localStorage.getItem("expirationDate");
    // const expiredIn = new Date(expirationDate);
    // const now = new Date();
    // if (now >= expiredIn) {
    //   commit("signOut");
    // } else {
    //   commit("authUser", {
    //     token: token,
    //     username: username
    //   });
    // }
  },
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
