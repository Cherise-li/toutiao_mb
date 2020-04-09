import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('token')
  },
  mutations: {
    setUser (state, obj) {
      state.token = obj
      setItem('token', obj)
      // console.log(obj)
    }
  },
  actions: {},
  modules: {}
})
