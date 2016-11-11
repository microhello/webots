import Vue from 'vue'
import VueResource from 'vue-resource'
import Account from './Account'
import Group from './Group'
import Message from './Message'
import store from '../store'
import * as types from '../store/types'

Vue.use(VueResource)

Vue.http.interceptors.push((request, next) => {
  store.commit(types.TOGGLE_SHOWLOADING)
  next(response => {
    store.commit(types.TOGGLE_SHOWLOADING)
    return response
  })
})

export {
  Account,
  Group,
  Message
}
