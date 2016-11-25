import * as types from '../types'

const state = {
  count: 0,
  items: [],
  offset: 0,
  limit: 10
}

const mutations = {
  [types.SET_MESSAGES] (state, { action, items }) {
    state.count = items.count
    switch (action) {
      case 'concat':
        state.items = state.items.concat(items.items)
        break
      case 'splice':
        state.items.splice(state.offset, state.limit, ...items.items)
        break
    }
  },
  [types.DEL_MESSAGES] (state) {
    state.items = []
    state.offset = 0
  },
  [types.NEXT_PAGE] (state) {
    state.offset += state.limit
  }
}

export default {
  state,
  mutations
}
