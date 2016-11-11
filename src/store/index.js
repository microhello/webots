import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import help from './modules/Help'
import account from './modules/Account'
import group from './modules/Group'
import message from './modules/Message'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    help,
    account,
    group,
    message
  }
})
