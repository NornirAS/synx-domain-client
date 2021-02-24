import _ from "lodash";
import { rootDomain } from "../../core/config";

const state = {
  ghosts: [],
  ghostsToApprove: [],
  selectedGhost: {},
  ghostLinkedTo: [],
  ghostReadAccess: [],
  ghostSecondaryService: []
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
  selectGhost(state, payload) {
    state.selectedGhost = Object.assign({}, state.selectedGhost, payload);
  },
  addExternalLinkingToGhostStatus(state, payload) {
    const updatedExternalLinkingObject = payload.map(link => {
      const linkNameLowerCase = link.name.toLowerCase();
      link.uri = linkNameLowerCase.replace(/\//g, `${rootDomain}`);
      return link;
    });
    state.ghostLinkedTo = updatedExternalLinkingObject;
  },
  addReadAccessToGhostStatus(state, payload) {
    state.ghostReadAccess = payload;
  },
  addSecondaryServiceToGhostStatus(state, payload) {
    const updatedSecondaryServiceObject = payload.map(service => {
      const array = service.name.split("/");
      service.refDomain = array[0];
      service.refService = array[1];
      service.refObjectID = array[2];
      service.uri = `${array[0]}${rootDomain}${array[1]}##${array[2]}`.toLowerCase();
      return service;
    });
    state.ghostSecondaryService = updatedSecondaryServiceObject;
  },
  resetGhostStatus(state) {
    state.ghostLinkedTo = [];
    state.ghostReadAccess = [];
    state.ghostSecondaryService = [];
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
  SOCKET_ghost_status({ commit }, data) {
    commit("addExternalLinkingToGhostStatus", data["Linked To"]);
    commit("addReadAccessToGhostStatus", data["Read Access"]);
    commit("addSecondaryServiceToGhostStatus", data["Secondary Service"]);
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
