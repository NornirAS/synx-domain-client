const state = {
  instances: [],
  ghostsToApprove: [],
  selectedGhost: {},
  ghostLinkedTo: [],
  ghostReadAccess: [],
  ghostSecondaryService: []
};

const mutations = {
  allInstances(state, payload) {
    if (payload) {
      state.instances = payload;
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
      link.uri = linkNameLowerCase.replace(/\//g, ".cioty.com/");
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
      service.uri = `${array[0]}.cioty.com/${array[1]}#${array[2]}`.toLowerCase();
      return service;
    });
    state.ghostSecondaryService = updatedSecondaryServiceObject;
  },
  resetGhostStatus(state) {
    state.ghostLinkedTo = [];
    state.ghostReadAccess = [];
    state.ghostSecondaryService = [];
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    commit("allInstances", data);
  },
  SOCKET_ghosts_to_approve({ commit }, data) {
    commit("ghostsToApprove", data);
  },
  SOCKET_ghost_status({ commit }, data) {
    commit("addExternalLinkingToGhostStatus", data["Linked To"]);
    commit("addReadAccessToGhostStatus", data["Read Access"]);
    commit("addSecondaryServiceToGhostStatus", data["Secondary Service"]);
  }
};

const getters = {
  mergedGhostArray({ instances, ghostsToApprove }) {
    if (ghostsToApprove.length >= 1) {
      return [...ghostsToApprove, ...instances];
    } else {
      return instances;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
