import * as types from '../types'

const state = {
  items: []
}

const mutations = {
  [types.GET_MESSAGES] (state, data) {
    state.items = data
  },
  [types.DEL_MESSAGES] (state) {
    state.items = []
    console.log('delete')
  }
}

export default {
  state,
  mutations
}
