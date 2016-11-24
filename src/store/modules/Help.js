import * as types from '../types'

const state = {
  showLoading: 0,
  messages: []
}

const mutations = {
  [types.TOGGLE_SHOWLOADING] (state, newRequest) {
    // 每次发起新请求 showLoading + 1 ,请求完成 showLoading - 1
    // 当showLoading > 0 时，有请求未完成，所以显示loading组件
    // 当showLoading === 0 时，所有请求完成，所以隐藏loading组件
    if (newRequest) {
      state.showLoading++
    } else {
      state.showLoading--
    }
  },
  [types.ADD_ALERT_MESSAGE] ({ messages }, message) {
    messages.push(message)
    setTimeout(() => {
      messages.splice(messages.indexOf(message), 1)
    }, 3000)
  }
}

export default {
  state,
  mutations
}
