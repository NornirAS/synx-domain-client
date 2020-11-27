const state = {
  totalInstances: 1000,
  serviceInstances: 0 // instances of selected service
};

const mutations = {
  addInstance(state, instances) {
    state.serviceForm.instances += instances;
  },
  updateInstances(state, instances) {
    state.serviceForm.instances = instances;
  }
};

const getters = {
  instancesBalance({ serviceForm, serviceInstances }) {
    return serviceForm.instances - serviceInstances;
  },
  availableInstances({ serviceForm, totalInstances }) {
    return totalInstances - serviceForm.instances;
  },
  instancesLimitReached(state, { availableInstances }) {
    return availableInstances <= 0 ? true : false;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
