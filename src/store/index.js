import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import actions from './actions.js'
import book from './modules/book'
import store from './modules/store'

Vue.use(Vuex)

export default new Vuex.Store(
  {
    modules: {
      book,
      store
    },
    getters,
    actions
  })
