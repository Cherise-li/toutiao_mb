import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '../utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('token'),
    photo: getItem('photo')
  },
  mutations: {
    getPhoto (state, obj) {
      state.photo = obj
      setItem('photo', obj)
    },
    setUser (state, obj) {
      state.token = obj
      setItem('token', obj)
      console.log(obj)
    },
    delData (state) {
      state.token = null
      removeItem('token')
    },
    updateToken (state, obj) {
      state.token.token = obj
      setItem('token', state.token)
    }
  },
  actions: {},
  modules: {}
})
