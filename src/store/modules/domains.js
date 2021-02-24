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
    const domains = getters.domainsFromStorage;
    commit("allDomains", domains);
  }
};

const getters = {
  domainsFromStorage() {
    const domains = sessionStorage.getItem("domains");
    return JSON.parse(domains);
  },
  noDomains({ domains }) {
    return _.isEmpty(domains);
  },
  domainNames(state, { noDomains, domainsFromStorage }) {
    if (noDomains) {
      return [];
    } else {
      return domainsFromStorage.map(str => {
        return str.name;
      });
    }
  },
  domainNamesWithAllOption(state, { domainNames }) {
    return ["All"].concat(domainNames);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
