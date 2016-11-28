import * as types from '../types'
import Cookies from 'js-cookie'

const state = {
}

const mutations = {
  [types.LOGIN] (state, data) {
    Cookies.set('token', data.token)
  },
  [types.LOGOUT] (state) {
    Cookies.remove('token')
  }
}

const getters = {
  token: () => Cookies.get('token')
}

export default {
  state,
  mutations,
  getters
}
