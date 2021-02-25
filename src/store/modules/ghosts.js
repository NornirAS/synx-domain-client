import _ from "lodash";

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
  }
};

const actions = {
  SOCKET_owned_ghosts({ commit }, data) {
    sessionStorage.setItem("ghosts", JSON.stringify(data));
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
