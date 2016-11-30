import * as types from '../types'

const state = {
  items: [],
  active: null
}

const mutations = {
  [types.ADD_TAB] (state, payload) {
    state.items.push(payload)
    state.active = payload
  },
  [types.DEL_TAB] (state, item) {
    if (item) {
      let index = state.items.indexOf(item)
      state.items.splice(index, 1)
      if (item === state.active) {
        let lastIndex = state.items.length - 1
        state.active = state.items[index <= lastIndex ? index : lastIndex]
      }
    } else {
      state.items = []
      state.active = null
    }
  },
  [types.ACTIVE] (state, item) {
    state.active = item
  },
  [types.RENAME_TAB] (state, { tab, title }) {
    tab.title = title
  }
}

export default {
  state,
  mutations
}
