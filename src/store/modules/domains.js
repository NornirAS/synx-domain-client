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
  addDomainsFromStorage({ commit }) {
    const domains = sessionStorage.getItem("domains");
    commit("allDomains", JSON.parse(domains));
  }
};

const getters = {
  noDomains({ domains }) {
    return domains.length === 0;
  },
  hasInactiveDomain({ domains }) {
    return domains.some(domain => domain.active === true);
  },
  hasSingleDomain({ domains }) {
    return domains.length === 1;
  },
  hasTrial(state, { hasSingleDomain, hasInactiveDomain }) {
    return hasSingleDomain === hasInactiveDomain;
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
