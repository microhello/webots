import * as types from '../types'

const state = {
  items: []
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
