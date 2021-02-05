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
  addStatus(state, payload) {
    state.ghostStatus = Object.assign({}, state.ghostStatus, payload);
  }
};

const actions = {
  SOCKET_all_instances({ commit }, data) {
    commit("allInstances", data);
  },
  SOCKET_ghost_status({ commit }, data) {
    const updatedSecondaryService = data["Secondary Service"].map(service => {
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
    data["Secondary Service"] = updatedSecondaryService;
    commit("addStatus", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
