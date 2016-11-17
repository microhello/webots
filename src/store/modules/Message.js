import * as types from '../types'

const state = {
  items: [],
  pageIndex: 0,
  pageSize: 10
}

const mutations = {
  [types.SET_MESSAGES] (state, { action, items }) {
    switch (action) {
      case 'concat':
        state.items = state.items.concat(items)
        break
      case 'splice':
        state.items.splice(state.pageIndex * state.pageSize, state.pageSize, ...items)
        break
    }
  },
  [types.DEL_MESSAGES] (state) {
    state.items = []
    state.pageIndex = 0
  },
  [types.NEXT_PAGE] (state) {
    state.pageIndex++
  }
}

export default {
  state,
  mutations
}
