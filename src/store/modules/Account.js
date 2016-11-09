import * as types from '../types'

const state = {
  items: []
}

const mutations = {
  [types.GET_ACCOUNT_LIST] (state, data) {
    state.items = data
  }
}

export default {
  state,
  mutations
}
