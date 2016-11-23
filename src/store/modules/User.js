import * as types from '../types'

const state = {
  accessToken: null
}

const mutations = {
  [types.SET_ACCOUNTS] (state, data) {
    state.items = data
  }
}

export default {
  state,
  mutations
}
