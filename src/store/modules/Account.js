import * as types from '../types'

const state = {
  items: [],
  current: null
}

const mutations = {
  [types.GET_ACCOUNT_LIST] (state, data) {
    state.items = data
  },
  [types.SET_CURRENT_ACCOUNT] (state, item) {
    state.current = item
    console.log(state.current)
  }
}

export default {
  state,
  mutations
}
