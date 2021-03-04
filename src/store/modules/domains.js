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
  addDomainsFromStorage({ commit }) {
    const domains = sessionStorage.getItem("domains");
    commit("allDomains", JSON.parse(domains));
  }
};

const getters = {
  noDomains({ domains }) {
    return _.isEmpty(domains);
  },
  hasInactiveDomain({ domains }) {
    return _.some(domains, ["active", false]);
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
  firstDomain({ domains }, { noDomains }) {
    if (!noDomains) {
      return domains[0];
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
