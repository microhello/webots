import * as types from '../types'

const state = {
  token: ''
}

const mutations = {
  [types.LOGIN] (state, data) {
    state.token = data.token
  }
}

export default {
  state,
  mutations
}
