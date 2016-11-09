import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import account from './modules/Account'
import group from './modules/Group'
import message from './modules/Message'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    account,
    group,
    message
  }
})
