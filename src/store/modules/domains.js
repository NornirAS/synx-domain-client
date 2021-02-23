import _ from "lodash";

const state = {
  domains: []
};

const mutations = {
  allDomains(state, payload) {
    state.domains = payload;
  }
};

const actions = {
  SOCKET_all_domains({ commit }, data) {
    sessionStorage.setItem("domains", JSON.stringify(data));
    commit("allDomains", data);
  },
  addDomainsFromStorage({ commit, getters }) {
    const domains = getters.getDomainsFromStorage;
    commit("allDomains", domains);
  }
};

const getters = {
  domainsFromStorage() {
    const domains = sessionStorage.getItem("domains");
    return JSON.parse(domains);
  },
  noDomains(state, { domainsFromStorage }) {
    return _.isEmpty(domainsFromStorage);
  },
  domainNames(state, { noDomains, domainsFromStorage }) {
    if (noDomains) {
      return [];
    } else {
      const domainNames = domainsFromStorage.map(str => {
        return str.name;
      });
      domainNames.unshift("All");
      return domainNames;
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
