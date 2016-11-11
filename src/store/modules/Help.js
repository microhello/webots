import * as types from '../types'

const state = {
  showLoading: false
}

const mutations = {
  [types.TOGGLE_SHOWLOADING] (state) {
    state.showLoading = !state.showLoading
  }
}

export default {
  state,
  mutations
}
