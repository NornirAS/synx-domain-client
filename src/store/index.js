import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    serviceForm: {
      name: "",
      description: "",
      keywords: [],
      serviceXML: [],
      commandXML: [],
      instances: 0,
      timeout: "30"
    },
    idToken: null
  },
  mutations: {
    serviceXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.serviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLAddLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceFormserviceXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    commandXMLRemoveLink: (state, payload) => {
      const { name, linkTo } = payload;
      const schema = state.serviceForm.commandXML.find(s => s.name === name);
      schema.linkTo = linkTo;
    },
    serviceXMLRemoveSchema: (state, index) => {
      state.serviceForm.serviceXML.splice(index, 1);
    },
    commandXMLRemoveSchema: (state, index) => {
      state.serviceForm.commandXML.splice(index, 1);
    },
    authUser(state, userData) {
      state.idToken = userData.token;
    }
  },
  actions: {
    signin({ commit }, authData) {
      axios
        .post(
          "https://synxpass.cioty.com/token/GetToken.php",
          `username=${authData.username}&password=${authData.password}`
        )
        .then(res => {
          console.log(res);
          commit("authUser", {
            token: res.data.ActiveToken
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    // SOCKET_GET_TOKEN: ({ commit }, payload) => {
    //   commit("getToken", payload);
    // }
  },
  modules: {}
});
