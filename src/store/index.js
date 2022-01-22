import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isShowError: false,
    userId: null,
  },
  mutations: {
    updateUserId(state, payload) {
      state.userId = payload;
    },
    updateShowError(state, payload) {
      state.isShowError = payload;
    },
  },
  actions: {},
  modules: {},
});
