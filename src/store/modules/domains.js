const state = {
  domains: []
};

const mutations = {
  allDomains(state, payload) {
    state.domains = payload;
  },
  resetState(state) {
    state.domains = [];
  }
};

const actions = {
  SOCKET_all_domains({ commit }, data) {
    commit("allDomains", data);
  }
};

const getters = {
  noDomains({ domains }) {
    return domains.length === 0;
  },
  isDomainLimit({ domains }) {
    return domains.length >= 2;
  },
  domainNames({ domains }, { noDomains }) {
    if (noDomains) {
      return [];
    } else {
      return domains.map(str => {
        return str.name;
      });
    }
  },
  domainNamesWithAllOption(state, { domainNames }) {
    return ["All"].concat(domainNames);
  },
  activeDomains({ domains }) {
    return domains.filter(domain => domain.active === true);
  },
  hasActiveDomains(state, { activeDomains }) {
    return activeDomains.length > 0;
  },
  activeDomainNames(state, { activeDomains }) {
    return activeDomains.map(domain => domain.name);
  },
  firstDomain(state, { hasActiveDomains, activeDomains }) {
    if (hasActiveDomains) {
      return activeDomains[0].name;
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
