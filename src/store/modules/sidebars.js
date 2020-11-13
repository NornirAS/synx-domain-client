const state = {
  lightSideBarTitle: ""
};

const mutations = {
  lightSideBarTitle(state, payload) {
    state.lightSideBarTitle = payload;
  }
};

const getters = {
  isUpdatePage({ lightSideBarTitle }) {
    return lightSideBarTitle === "Update Service" ? true : false;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  getters
};
