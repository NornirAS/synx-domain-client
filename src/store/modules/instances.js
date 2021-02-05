const state = {
  instances: [],
  dialog: false,
  selectedGhost: {},
  ghostStatus: {},
  dialogTitle: ""
};

const mutations = {
  allInstances(state, payload) {
    state.instances = payload;
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
    state.ghostStatus["Linked To"] = Object.assign(
      {},
      state.ghostStatus["Linked To"],
      updatedExternalLinkingObject
    );
  },
  addReadAccessToGhostStatus(state, payload) {
    state.ghostStatus["Read Access"] = Object.assign(
      {},
      state.ghostStatus["Read Access"],
      payload
    );
  },
  addSecondaryServiceToGhostStatus(state, payload) {
    const updatedSecondaryServiceObject = payload.map(service => {
      const beforeSlash = /(.*?)(?=\/)/;
      const refDomain = service.name.match(beforeSlash);
      service.refDomain = refDomain[0];
      const betweenSlashes = /(?<=\/)(.*?)(?=\/)/;
      const refService = service.name.match(betweenSlashes);
      service.refService = refService[0];
      const afterSlash = /(?<=\/)\d+/;
      const refObjectID = service.name.match(afterSlash);
      service.refObjectID = refObjectID[0];
      service.uri = `${refDomain[0]}.cioty.com/${refService[0]}#${refObjectID[0]}`.toLowerCase();
      return service;
    });
    state.ghostStatus["Secondary Service"] = Object.assign(
      {},
      state.ghostStatus["Secondary Service"],
      updatedSecondaryServiceObject
    );
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    commit("allInstances", data);
  },
  SOCKET_ghost_status({ commit }, data) {
    commit("addExternalLinkingToGhostStatus", data["Linked To"]);
    commit("addReadAccessToGhostStatus", data["Read Access"]);
    commit("addSecondaryServiceToGhostStatus", data["Secondary Service"]);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
