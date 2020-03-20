import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    searchForm: {}
  },
  getters: {
    searchForm(state){
      return state.searchForm
    }
  },
  mutations: {
    setSearchForm (state, formData) {
      state.searchForm = formData
    }
  },
  actions: {
    setSearchForm({ commit, state }, formData){
      commit('setSearchForm', formData);
    }
  },
});

export default store
