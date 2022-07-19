import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    searchForm: {},
    user: {},
    is_auth: false,
  },
  getters: {
    searchForm(state){
      return state.searchForm
    },
    authorization(state){
      return state.is_auth
    },
    user(state){
      if (state.is_auth){
        return state.user
      }else{
        return null
      }
    }
  },
  mutations: {
    setSearchForm (state, formData) {
      state.searchForm = formData
    },
    makeAuthorization(state, data){
      state.user = data.user;
      state.is_auth = true;
    },
    makeLogout(state){
      state.user = {};
      state.is_auth = false;
    }
  },
  actions: {
    setSearchForm({ commit, state }, formData){
      commit('setSearchForm', formData);
    },
    logout({commit}){
      commit('makeLogout')
    },
    login({commit, state}, data){
      commit('makeAuthorization', data)
    }
  },
});

export default store
