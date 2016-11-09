import * as types from '../types'

const state = {
  items: []
}

const mutations = {
  [types.SET_MESSAGES] (state, data) {
    state.items = data
  },
  [types.DEL_MESSAGES] (state) {
    state.items = []
  }
}

export default {
  state,
  mutations
}
