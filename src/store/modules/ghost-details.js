import { rootDomain } from "../../core/config";

const state = {
  selectedGhost: {},
  ghostLinkedTo: [],
  ghostReadAccess: [],
  ghostSecondaryService: []
};

const mutations = {
  selectGhost(state, payload) {
    state.selectedGhost = Object.assign({}, state.selectedGhost, payload);
  },
  addExternalLinkingToGhostStatus(state, payload) {
    state.ghostLinkedTo = payload;
  },
  addReadAccessToGhostStatus(state, payload) {
    state.ghostReadAccess = payload;
  },
  addSecondaryServiceToGhostStatus(state, payload) {
    state.ghostSecondaryService = payload;
  }
};

const actions = {
  SOCKET_ghost_status({ commit, dispatch }, data) {
    dispatch("addExternalLinkingToGhostStatus", data["Linked To"]);
    commit("addReadAccessToGhostStatus", data["Read Access"]);
    dispatch("addSecondaryServiceToGhostStatus", data["Secondary Service"]);
  },
  addExternalLinkingToGhostStatus({ commit }, data) {
    const linkedTo = data.map(link => {
      link.uri = link.name.replace(/\//g, `${rootDomain}`).toLowerCase();
      return link;
    });
    commit("addExternalLinkingToGhostStatus", linkedTo);
  },
  addSecondaryServiceToGhostStatus({ commit }, data) {
    const secondaryService = data.map(service => {
      const array = service.name.split("/");
      service.refDomain = array[0];
      service.refService = array[1];
      service.refObjectID = array[2];
      service.uri = `${array[0]}${rootDomain}${array[1]}##${array[2]}`.toLowerCase();
      return service;
    });
    commit("addSecondaryServiceToGhostStatus", secondaryService);
  }
};

const getters = {
  domainURI({ selectedGhost }) {
    const { domain } = selectedGhost;
    return `${domain}${rootDomain}`.toLowerCase();
  },
  ghostID({ selectedGhost }) {
    const { service, instance } = selectedGhost;
    return `${service}##${instance}`.toLowerCase();
  },
  ghostURI(state, { domainURI, ghostID }) {
    return `${domainURI}${ghostID}`;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
