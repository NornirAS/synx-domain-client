const state = {
  ghosts: [],
  ghostsToApprove: []
};

const mutations = {
  addGhosts(state, payload) {
    state.ghosts = payload;
  },
  ghostsToApprove(state, payload) {
    state.ghostsToApprove = payload;
  },
  resetState(state) {
    state.ghosts = [];
    state.ghostsToApprove = [];
  }
};

const actions = {
  SOCKET_owned_ghosts({ commit }, data) {
    commit("addGhosts", data);
  },
  SOCKET_ghosts_to_approve({ commit }, data) {
    if (data) {
      const ghostsToApprove = data.map(ghost => {
        ghost.approve = true;
        return ghost;
      });
      commit("ghostsToApprove", ghostsToApprove);
    } else {
      commit("ghostsToApprove", []);
    }
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
    return allGhosts.length === 0;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
