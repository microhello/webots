import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import user from './modules/User'
import help from './modules/Help'
import account from './modules/Account'
import group from './modules/Group'
import message from './modules/Message'
import tab from './modules/Tab'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  modules: {
    user,
    help,
    account,
    group,
    message,
    tab
  }
})
