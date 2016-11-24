import * as types from '../types'

const state = {
  count: 0,
  items: [],
  offset: 0,
  limit: 0
}

const mutations = {
  [types.SET_GROUPS] (state, data) {
    state.count = data.count
    state.items = data.items
    state.offset = data.offset
    state.limit = data.limit
  }
}

export default {
  state,
  mutations
}
