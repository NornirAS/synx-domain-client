import _ from "lodash";

const state = {
  ghosts: [],
  ghostsToApprove: []
};

const mutations = {
  addGhosts(state, payload) {
    if (payload) {
      state.ghosts = payload;
    }
  },
  ghostsToApprove(state, payload) {
    if (payload) {
      state.ghostsToApprove = payload.map(item => {
        item.approve = true;
        return item;
      });
    }
  },
  resetGhosts(state) {
    state.ghosts = [];
    state.ghostsToApprove = [];
  }
};

const actions = {
  SOCKET_owned_ghosts({ commit }, data) {
    sessionStorage.setItem("ghosts", JSON.stringify(data));
    commit("addGhosts", data);
  },
  SOCKET_ghosts_to_approve({ commit }, data) {
    sessionStorage.setItem("ghostsToApprove", JSON.stringify(data));
    commit("ghostsToApprove", data);
  },
  addGhostsFromStorage({ commit }) {
    const ghosts = sessionStorage.getItem("ghosts");
    commit("addGhosts", JSON.parse(ghosts));
  }
};

const getters = {
  allGhosts({ ghosts, ghostsToApprove }) {
    if (ghostsToApprove.length >= 1) {
      return [...ghostsToApprove, ...ghosts];
    } else {
      return ghosts;
    }
  },
  noGhosts(state, { allGhosts }) {
    return _.isEmpty(allGhosts);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
